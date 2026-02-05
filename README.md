# Gainforest SDK for Next.js

A batteries-included tRPC SDK for integrating Gainforest/Hypercerts services into a Next.js application. The SDK exposes server-only helpers, React/vanilla tRPC clients, domain-specific utilities, and zod schemas so you can share types across your entire stack.

## Install

```bash
bun add gainforest-sdk-nextjs
```

> The repo itself still uses Bun for development chores; consumers only need the published package.

## 1. Configure allowed PDS domains and instantiate the SDK

We would need two configuration files to start.

- `gainforest-sdk.ts`: defines the domains you want to allow in your app, and other artifacts related to the sdk configuration.
- `gainforest-sdk.server.ts`: instantiate the sdk using the configuration options.

### Warning

NEVER IMPORT ANYTHING FROM `gainforest-sdk.server.ts` INTO A CLIENT COMPONENT OR A FILE THAT EXECUTES ON CLIENT SIDE.

**Configuring allowed domains**

```ts
// config/gainforest-sdk.ts
import { SupportedPDSDomain } from "gainforest-sdk-nextjs";

export const allowedPDSDomains = [
  "climateai.org",
  // add domains here to allow them
] satisfies SupportedPDSDomain[];
export type AllowedPDSDomain = (typeof allowedPDSDomains)[number];
```

**Instantiating sdk**

```ts
// config/gainforest-sdk.server.ts
import { GainforestSDK } from "gainforest-sdk-nextjs";
import { allowedPDSDomains } from "./gainforest-sdk";

export const gainforestSdk = new GainforestSDK(allowedPDSDomains);
```

The constructor validates the domains against `supportedPDSDomainSchema`, so initialization fails fast if a domain is not recognized.

## 2. Expose `/api/trpc`

Create `app/api/trpc/[trpc]/route.ts` (Next.js App Router) so the frontend can talk to your server router. The SDK already exports `createContext`.

```ts
// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { allowedPDSDomains } from "@/config/gainforest-sdk";
import { gainforestSdk } from "@/config/gainforest-sdk.server";
import { createContext } from "gainforest-sdk-nextjs";

export const runtime = "nodejs";

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: gainforestSdk.appRouter,
    createContext: ({ req }) =>
      createContext({
        req,
        allowedPDSDomains,
      }),
  });

export { handler as GET, handler as POST };
```

If you keep the `allowedPDSDomains` array exported from your config file, you can pass it directly into `createContext`.

## 3. Optional React provider

Use the React bindings when you need hooks (`useQuery`, `useMutation`, …). The helper `createTRPCReactApi` ensures your component tree stays type-safe.

### TRPC Provider Setup

To set up trpc provider and hooks for querying and mutating data, we need to set up a provider first.

#### Configure the Provider

```tsx
// components/providers/trpc-provider.tsx
"use client";

import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "gainforest-sdk-nextjs";
import { customTransformer } from "gainforest-sdk-nextjs/utilities/transformer";
import { AllowedPDSDomain } from "@/config/gainforest-sdk";

export const trpcApi = createTRPCReact<AppRouter<AllowedPDSDomain>>();

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.VERCEL_PROJECT_PRODUCTION_URL ?
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
}

export function TrpcProvider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const trpcClient = useMemo(
    () =>
      trpcApi.createClient({
        links: [
          loggerLink({ enabled: () => process.env.NODE_ENV === "development" }),
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            transformer: customTransformer,
          }),
        ],
      }),
    []
  );

  return (
    <trpcApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcApi.Provider>
  );
}
```

#### Wrap the children with the provider in `layout.tsx`

```tsx
import { TrpcProvider } from "@/components/providers/trpc-provider.tsx";

const RootLayout = ({ children }: { children }) => {
  return <TrpcProvider>{children}</TrpcProvider>;
};
```

### Usage:

```tsx
import { trpcApi } from "@/components/providers/trpc-provider.tsx";

const {
  data: info,
  isPending,
  error,
  isPlaceholderData,
} = trpcApi.gainforest.organization.info.get.useQuery({
  did: organizationDid ?? "",
  pdsDomain: "climateai.org",
});
```

## 4. Non-React usage on client

If you need to use the queries or mutations on the client, but out of the react scope and purely in javascript / typescript,
you can use the `trpcClient`.

```ts
import { createTRPCClient } from "gainforest-sdk-nextjs/client";
import type { AllowedPDSDomain } from "@/config/gainforest-sdk";

const trpcClient = createTRPCClient<AllowedPDSDomain>("/api/trpc");

const result = await trpcClient.hypercerts.claim.get.query({
  claimId: "bafybe...",
});
```

## 5. Usage on Server Side pages

If you need to use trpc on the server, you can use `getServerCaller` to get a server side caller.

```ts
import { gainforestSdk } from "@/config/gainforest-sdk.server";

const ServerSidePage = async () => {
  const serverCaller = gainforestSdk.getServerCaller();
  try {
    const { handle, did } = await serverCaller.auth.resume("climateai.org");
    return <div> Hello {handle}! </div>
  } catch {
    throw new Error("Unable to resume session");
  }
}
```

## 6. What gets exported?

The package ships an explicit [exports map](./package.json) so consumers can import only what they need:

| Import Path                                  | What you get                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `gainforest-sdk-nextjs`                      | `GainforestSDK`, `SupportedPDSDomain`, `supportedPDSDomainSchema`, `createContext`          |
| `gainforest-sdk-nextjs/client`               | React helpers (`createTRPCClient`).                                                         |
| `gainforest-sdk-nextjs/utilities`            | `getBlobUrl`, `parseAtUri` helpers.                                                         |
| `gainforest-sdk-nextjs/utilities/transformer`| `serialize`, `deserialize`, `customTransformer`, and the `SerializedSuperjson` helper type. |
| `gainforest-sdk-nextjs/zod-schemas`          | Blob/file schemas and converters.                                                           |
| `gainforest-sdk-nextjs/types`                | Shared domain types such as `Ecocert`.                                                      |
| `gainforest-sdk-nextjs/session`              | The session helper re-export if you need to customize context creation.                     |

Examples:

```ts
import { GainforestSDK, createContext } from "gainforest-sdk-nextjs";
import { createTRPCReactApi } from "gainforest-sdk-nextjs/client";
import { parseAtUri } from "gainforest-sdk-nextjs/utilities";
import { serialize } from "gainforest-sdk-nextjs/utilities/transformer";
import { BlobRefGeneratorSchema } from "gainforest-sdk-nextjs/zod-schemas";
import type { Ecocert } from "gainforest-sdk-nextjs/types";
```

## 7. Utilities in the box

You can cherry-pick the utilities instead of reaching deep into `src` paths:

- `getBlobUrl<T>(blobRef)`: resolves ATProto blob references into stable HTTPS URLs scoped to a PDS domain.
- `parseAtUri(uri)`: breaks an `at://` URI into `{ did, collection, rkey }`.
- `serialize(value)` / `deserialize(value)`: thin wrappers around the SDK's SuperJSON configuration, giving you deterministic serialization that matches the router's transformer.
- `customTransformer`: plug this into any tRPC link/router so client and server agree on the same serialization rules (already used internally).

```ts
import { deserialize } from "gainforest-sdk-nextjs/utilities/transformer";

const record = deserialize(serializedPayload);
```

## 8. Automatic serialization & when to handle it yourself

- All routers created via `GainforestSDK` use `customTransformer`, meaning every procedure automatically serializes/deserializes data using SuperJSON. The React provider example already passes that transformer into the `httpBatchLink`, so hooks receive rich types (Dates, Maps, etc.) without extra work.
- When you manually move data across the server/client boundary (e.g., `generateStaticParams`, RSC props), use `serialize(data)` before returning and `SerializedSuperjson<typeof data>` (from `gainforest-sdk-nextjs/utilities/transformer`) to type the value. On the client, call `deserialize(serialized)` to get back the original shapes.

```ts
import {
  serialize,
  type SerializedSuperjson,
} from "gainforest-sdk-nextjs/utilities/transformer";

const data = await serverCaller.hypercerts.claim.get({ claimId });
const serialized: SerializedSuperjson<typeof data> = serialize(data);
return <ClientComponent initialData={serialized} />;
```

## 9. Pitfalls to keep in mind

1. **Next.js API route timeout**: Vercel/Next.js Serverless functions hard-stop requests that run longer than ~10 seconds. Long-running calls should be moved to background jobs or queue workers; otherwise, `fetchRequestHandler` will fail with a 504/timeout no matter what the SDK does.
2. **Passing data to client components**: If you send the raw response from a server component to the client without serializing it first, Next.js might throw `A client component received a class instance` or similar errors. Always wrap data with `serialize(...)` and annotate the prop as `SerializedSuperjson<typeof data>` (for better type support), then deserialize inside the client component before usage.
3. **Importing server-only code into client components**:
   - The main `gainforest-sdk-nextjs` entrypoint is **server-only** because it bundles `@trpc/server` and other Node-targeted code.
   - In any `"use client"` file (or generally any browser code), you **must not** import values from your `config/gainforest-sdk.server` (or wherever you instantiate `new GainforestSDK(...)`). That means no `import { ... } from "@/server/gainforest-sdk.server";` in client components.

## 10. Running locally

```bash
bun install
bun test              # add your own tests
bun run build         # compile if you add a bundler
```

> This repository was scaffolded with `bun init` (Bun v1.2.7).
