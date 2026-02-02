# OAuth Setup Guide for ClimateAI SDK

This guide walks you through setting up ATProto OAuth authentication in your app using the ClimateAI SDK.

## Prerequisites

- A Next.js app (App Router recommended)
- A Supabase project
- An ATProto PDS account (climateai.org or gainforest.id)

## Overview

The OAuth flow works as follows:

```text
1. User enters handle → App redirects to ATProto authorization server
2. User authenticates at ATProto → Redirected back with auth code
3. App exchanges code for tokens → Stored in Supabase
4. User identity (DID) stored in encrypted cookie → Used for subsequent requests
```

---

## Step 1: Install Dependencies

```bash
npm install @climateai/sdk @supabase/supabase-js
# or
bun add @climateai/sdk @supabase/supabase-js
```

---

## Step 2: Create Supabase Tables

Run this SQL in your Supabase SQL editor:

```sql
-- OAuth Sessions (long-lived, stores tokens)
CREATE TABLE atproto_oauth_session (
    id TEXT PRIMARY KEY,
    app_id TEXT NOT NULL,
    did TEXT NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(app_id, did)
);

CREATE INDEX idx_oauth_session_app_did ON atproto_oauth_session(app_id, did);

-- OAuth State (temporary, for auth flow)
CREATE TABLE atproto_oauth_state (
    id TEXT PRIMARY KEY,
    app_id TEXT NOT NULL,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 hour')
);

CREATE INDEX idx_oauth_state_app_expires ON atproto_oauth_state(app_id, expires_at);
```

---

## Step 3: Generate OAuth Private Key

You need an ES256 private key for OAuth client authentication. Generate one using Node.js:

```javascript
// scripts/generate-oauth-key.js
const { generateKeyPairSync } = require('crypto');
const { exportJWK } = require('jose');

async function generateKey() {
  const { privateKey } = generateKeyPairSync('ec', {
    namedCurve: 'P-256',
  });
  
  const jwk = await exportJWK(privateKey);
  jwk.kid = 'key-1';
  jwk.use = 'sig';
  jwk.alg = 'ES256';
  
  console.log('Add this to your .env.local:');
  console.log(`OAUTH_PRIVATE_KEY='${JSON.stringify(jwk)}'`);
}

generateKey();
```

Or use OpenSSL:

```bash
# Generate private key
openssl ecparam -name prime256v1 -genkey -noout -out private-key.pem

# Convert to JWK format (use an online tool or jose library)
```

---

## Step 4: Configure Environment Variables

Create/update your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth Client Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
OAUTH_PRIVATE_KEY='{"kty":"EC","crv":"P-256","x":"...","y":"...","d":"...","kid":"key-1","use":"sig","alg":"ES256"}'

# Session Cookie
COOKIE_SECRET=your-secret-key-at-least-32-characters-long
COOKIE_NAME=your_app_session
```

**Important:**
- `COOKIE_SECRET` must be at least 32 characters
- `COOKIE_NAME` should be unique per app (e.g., `greenglobe_session`, `bumicerts_session`)
- Never commit `OAUTH_PRIVATE_KEY` or `COOKIE_SECRET` to version control

---

## Step 5: Create ATProto SDK Instance

Create `lib/atproto.ts`:

```typescript
import {
  createATProtoSDK,
  createSupabaseSessionStore,
  createSupabaseStateStore,
} from "@climateai/sdk/oauth";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client with service role key (server-side only!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Unique identifier for your app
const APP_ID = "your-app-name"; // e.g., "greenglobe", "bumicerts"

// Public URL of your app
const PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL!;

// Create the SDK instance
export const atprotoSDK = createATProtoSDK({
  oauth: {
    clientId: `${PUBLIC_URL}/client-metadata.json`,
    redirectUri: `${PUBLIC_URL}/api/oauth/callback`,
    jwksUri: `${PUBLIC_URL}/.well-known/jwks.json`,
    jwkPrivate: process.env.OAUTH_PRIVATE_KEY!,
    scope: "atproto",
  },
  servers: {
    pds: "https://climateai.org", // or "https://gainforest.id"
  },
  sessionStore: createSupabaseSessionStore(supabase, APP_ID),
  stateStore: createSupabaseStateStore(supabase, APP_ID),
});
```

---

## Step 6: Create OAuth Metadata Routes

### 6a. Client Metadata (`app/client-metadata.json/route.ts`)

```typescript
import { NextResponse } from "next/server";

const PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET() {
  const metadata = {
    client_id: `${PUBLIC_URL}/client-metadata.json`,
    client_name: "Your App Name",
    client_uri: PUBLIC_URL,
    logo_uri: `${PUBLIC_URL}/logo.png`, // Optional
    tos_uri: `${PUBLIC_URL}/terms`, // Optional
    policy_uri: `${PUBLIC_URL}/privacy`, // Optional
    redirect_uris: [`${PUBLIC_URL}/api/oauth/callback`],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    scope: "atproto",
    token_endpoint_auth_method: "private_key_jwt",
    token_endpoint_auth_signing_alg: "ES256",
    application_type: "web",
    dpop_bound_access_tokens: true,
    jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
  };

  return NextResponse.json(metadata, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
```

### 6b. JWKS Endpoint (`app/.well-known/jwks.json/route.ts`)

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const privateKey = JSON.parse(process.env.OAUTH_PRIVATE_KEY!);

  // Remove private key component, expose only public key
  const { d, ...publicKey } = privateKey;

  const jwks = {
    keys: [publicKey],
  };

  return NextResponse.json(jwks, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
```

---

## Step 7: Create OAuth Routes

### 7a. Authorization Route (`app/api/oauth/authorize/route.ts`)

If youre using nextjs this can also just be a simple server action instead of a full api route

```typescript
import { NextRequest, NextResponse } from "next/server";
import { atprotoSDK } from "@/lib/atproto";

export async function POST(request: NextRequest) {
  try {
    const { handle } = await request.json();

    if (!handle) {
      return NextResponse.json(
        { error: "Handle is required" },
        { status: 400 }
      );
    }

    // Generate authorization URL
    const authUrl = await atprotoSDK.authorize(handle);

    return NextResponse.json({ authorizationUrl: authUrl.toString() });
  } catch (error) {
    console.error("Authorization error:", error);
    return NextResponse.json(
      { error: "Failed to initiate authorization" },
      { status: 500 }
    );
  }
}
```

### 7b. Callback Route (`app/api/oauth/callback/route.ts`)

```typescript
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { atprotoSDK } from "@/lib/atproto";
import { saveAppSession } from "@climateai/sdk/oauth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Exchange authorization code for session
    const session = await atprotoSDK.callback(searchParams);

    // Save user identity to encrypted cookie
    await saveAppSession({
      did: session.sub,
      handle: session.handle,
      isLoggedIn: true,
    });

    // Redirect to dashboard or home
    redirect("/dashboard");
  } catch (error) {
    console.error("OAuth callback error:", error);
    redirect("/login?error=auth_failed");
  }
}
```

### 7c. Logout Route (`app/api/oauth/logout/route.ts`)

Same with this — this could also just be a simple server action.

```typescript
import { NextResponse } from "next/server";
import { clearAppSession } from "@climateai/sdk/oauth";

export async function POST() {
  try {
    await clearAppSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
```

### 7d. Session Check Route (`app/api/oauth/session/route.ts`)

```typescript
import { NextResponse } from "next/server";
import { getAppSession } from "@climateai/sdk/oauth";
import { atprotoSDK } from "@/lib/atproto";

export async function GET() {
  try {
    const appSession = await getAppSession();

    if (!appSession.isLoggedIn || !appSession.did) {
      return NextResponse.json({ authenticated: false });
    }

    // Optionally verify the OAuth session is still valid
    const oauthSession = await atprotoSDK.restoreSession(appSession.did);

    if (!oauthSession) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      did: appSession.did,
      handle: appSession.handle,
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
```

---

## Step 8: Create Login UI

Example login component (`components/login-form.tsx`):

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/oauth/authorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authorization failed");
      }

      // Redirect to ATProto authorization server
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="handle">Your Handle</label>
        <input
          id="handle"
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="username.climateai.org"
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Redirecting..." : "Sign in with ATProto"}
      </button>
    </form>
  );
}
```

---

## Step 9: Using the SDK with tRPC (Optional)

If you're using the ClimateAI SDK's tRPC routers, you need to pass the SDK instance to the context:

```typescript
// lib/trpc.ts
import { GainforestSDK } from "@climateai/sdk";
import { atprotoSDK } from "@/lib/atproto";

const gainforestSDK = new GainforestSDK(["climateai.org", "gainforest.id"]);

// Create server caller with your ATProto SDK instance
export const serverCaller = gainforestSDK.getServerCaller(atprotoSDK);
```

For tRPC API routes:

```typescript
// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { GainforestSDK, createContext } from "@climateai/sdk";
import { atprotoSDK } from "@/lib/atproto";

const gainforestSDK = new GainforestSDK(["climateai.org", "gainforest.id"]);

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: gainforestSDK.appRouter,
    createContext: () =>
      createContext({
        sdk: atprotoSDK,
        allowedPDSDomains: ["climateai.org", "gainforest.id"],
      }),
  });

export { handler as GET, handler as POST };
```

---

## Step 10: Making Authenticated API Calls

### Using the SDK's Repository (Recommended)

```typescript
import { atprotoSDK } from "@/lib/atproto";
import { getAppSession } from "@climateai/sdk/oauth";

export async function createHypercert(data: HypercertData) {
  const appSession = await getAppSession();
  
  if (!appSession.isLoggedIn || !appSession.did) {
    throw new Error("Not authenticated");
  }

  // Restore OAuth session
  const oauthSession = await atprotoSDK.restoreSession(appSession.did);
  
  if (!oauthSession) {
    throw new Error("Session expired");
  }

  // Use the repository
  const repo = atprotoSDK.repository(oauthSession);
  
  const result = await repo.hypercerts.create({
    title: data.title,
    description: data.description,
    // ... other fields
  });

  return result;
}
```

### Using the Agent Directly

```typescript
import { atprotoSDK } from "@/lib/atproto";
import { getAppSession, Agent } from "@climateai/sdk/oauth";

export async function getAuthenticatedAgent(): Promise<Agent> {
  const appSession = await getAppSession();
  
  if (!appSession.isLoggedIn || !appSession.did) {
    throw new Error("Not authenticated");
  }

  const oauthSession = await atprotoSDK.restoreSession(appSession.did);
  
  if (!oauthSession) {
    throw new Error("Session expired");
  }

  return new Agent(oauthSession);
}

// Usage
const agent = await getAuthenticatedAgent();
const response = await agent.com.atproto.repo.createRecord({
  repo: agent.did!,
  collection: "org.hypercerts.claim.activity",
  record: { /* ... */ },
});
```

---

## Local Development

For local development, you can use loopback URLs:

```typescript
// lib/atproto.ts (development version)
export const atprotoSDK = createATProtoSDK({
  oauth: {
    clientId: "http://localhost/", // Loopback client
    redirectUri: "http://127.0.0.1:3000/api/oauth/callback",
    jwksUri: "http://127.0.0.1:3000/.well-known/jwks.json",
    jwkPrivate: process.env.OAUTH_PRIVATE_KEY!,
    scope: "atproto",
    developmentMode: true, // Suppress warnings
  },
  servers: {
    pds: "https://climateai.org",
  },
  sessionStore: createSupabaseSessionStore(supabase, APP_ID),
  stateStore: createSupabaseStateStore(supabase, APP_ID),
});
```

Update your `.env.local` for development:

```env
NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
```

---

## Cleanup: Expired States

OAuth states expire after 1 hour. To clean up expired records, run this periodically (e.g., via cron):

```typescript
import { cleanupExpiredStates } from "@climateai/sdk/oauth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const deletedCount = await cleanupExpiredStates(supabase);
console.log(`Cleaned up ${deletedCount} expired OAuth states`);
```

Or set up a Supabase Edge Function or database function to run on a schedule.

---

## Security Checklist

- [ ] `COOKIE_SECRET` is at least 32 characters and kept secret
- [ ] `OAUTH_PRIVATE_KEY` is never committed to version control
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is only used server-side
- [ ] Production URLs use HTTPS
- [ ] `COOKIE_NAME` is unique per app to avoid conflicts
- [ ] Database tables have appropriate RLS policies (if needed)

---

## Troubleshooting

### "COOKIE_SECRET environment variable is required"

Make sure `COOKIE_SECRET` is set in your environment and is at least 32 characters.

### "Session expired or not found"

The OAuth session in Supabase may have been deleted or the tokens expired. The user needs to re-authenticate.

### "Failed to initiate authorization"

Check that:
1. Your `client-metadata.json` route is accessible
2. Your `jwks.json` route is serving the public key
3. The PDS URL is correct

### Callback redirects to error page

Check the server logs for the specific error. Common issues:
- State mismatch (user took too long to authenticate)
- Invalid authorization code
- PKCE verifier mismatch

---

## File Structure Summary

```text
your-app/
├── .env.local                           # Environment variables
├── lib/
│   └── atproto.ts                       # SDK configuration
├── app/
│   ├── client-metadata.json/
│   │   └── route.ts                     # OAuth client metadata
│   ├── .well-known/
│   │   └── jwks.json/
│   │       └── route.ts                 # Public key endpoint
│   ├── api/
│   │   ├── oauth/
│   │   │   ├── authorize/
│   │   │   │   └── route.ts             # Initiate OAuth flow
│   │   │   ├── callback/
│   │   │   │   └── route.ts             # Handle OAuth callback
│   │   │   ├── logout/
│   │   │   │   └── route.ts             # Clear session
│   │   │   └── session/
│   │   │       └── route.ts             # Check session status
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts             # tRPC handler (optional)
│   └── login/
│       └── page.tsx                     # Login page
└── components/
    └── login-form.tsx                   # Login form component
```
