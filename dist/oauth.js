import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
export { createATProtoSDK } from '@hypercerts-org/sdk-core';
export { Agent } from '@atproto/api';

// src/_internal/oauth/stores/session-store.ts
function createSupabaseSessionStore(supabase, appId) {
  const TABLE_NAME = "atproto_oauth_session";
  return {
    async get(did) {
      const compositeKey = `${appId}:${did}`;
      const { data, error } = await supabase.from(TABLE_NAME).select("value").eq("id", compositeKey).single();
      if (error?.code === "PGRST116") {
        return void 0;
      }
      if (error) {
        throw new Error(`Failed to get session: ${error.message}`);
      }
      if (!data) {
        return void 0;
      }
      return data.value;
    },
    async set(did, session) {
      const compositeKey = `${appId}:${did}`;
      const { error } = await supabase.from(TABLE_NAME).upsert(
        {
          id: compositeKey,
          app_id: appId,
          did,
          value: session,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          onConflict: "id"
        }
      );
      if (error) {
        throw new Error(`Failed to save session: ${error.message}`);
      }
    },
    async del(did) {
      const compositeKey = `${appId}:${did}`;
      const { error } = await supabase.from(TABLE_NAME).delete().eq("id", compositeKey);
      if (error) {
        throw new Error(`Failed to delete session: ${error.message}`);
      }
    }
  };
}

// src/_internal/oauth/stores/state-store.ts
function createSupabaseStateStore(supabase, appId) {
  const TABLE_NAME = "atproto_oauth_state";
  const TTL_HOURS = 1;
  return {
    async get(key) {
      const compositeKey = `${appId}:${key}`;
      const { data, error } = await supabase.from(TABLE_NAME).select("value, expires_at").eq("id", compositeKey).single();
      if (error?.code === "PGRST116") {
        return void 0;
      }
      if (error) {
        throw new Error(`Failed to get state: ${error.message}`);
      }
      if (!data) {
        return void 0;
      }
      if (new Date(data.expires_at) < /* @__PURE__ */ new Date()) {
        await supabase.from(TABLE_NAME).delete().eq("id", compositeKey);
        throw new Error("OAuth state has expired");
      }
      return data.value;
    },
    async set(key, state) {
      const compositeKey = `${appId}:${key}`;
      const expiresAt = new Date(Date.now() + TTL_HOURS * 60 * 60 * 1e3);
      const { error } = await supabase.from(TABLE_NAME).upsert(
        {
          id: compositeKey,
          app_id: appId,
          value: state,
          expires_at: expiresAt.toISOString()
        },
        {
          onConflict: "id"
        }
      );
      if (error) {
        throw new Error(`Failed to save state: ${error.message}`);
      }
    },
    async del(key) {
      const compositeKey = `${appId}:${key}`;
      const { error } = await supabase.from(TABLE_NAME).delete().eq("id", compositeKey);
      if (error) {
        throw new Error(`Failed to delete state: ${error.message}`);
      }
    }
  };
}
async function cleanupExpiredStates(supabase) {
  const TABLE_NAME = "atproto_oauth_state";
  const { data, error } = await supabase.from(TABLE_NAME).delete().lt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).select("id");
  if (error) {
    throw new Error(`Failed to cleanup expired states: ${error.message}`);
  }
  return data?.length ?? 0;
}

// src/_internal/oauth/iron-session/config.ts
var DEFAULT_MAX_AGE = 60 * 60 * 24 * 30;
var DEFAULT_COOKIE_NAME = "climateai_session";
function getSessionOptions() {
  const cookieSecret = process.env.COOKIE_SECRET;
  if (!cookieSecret) {
    throw new Error(
      "COOKIE_SECRET environment variable is required for iron-session"
    );
  }
  if (cookieSecret.length < 32) {
    throw new Error("COOKIE_SECRET must be at least 32 characters long");
  }
  return {
    password: cookieSecret,
    cookieName: process.env.COOKIE_NAME || DEFAULT_COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: DEFAULT_MAX_AGE,
      path: "/"
    }
  };
}

// src/_internal/oauth/iron-session/helpers.ts
async function getAppSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(
    cookieStore,
    getSessionOptions()
  );
  return {
    did: session.did,
    handle: session.handle,
    isLoggedIn: session.isLoggedIn ?? false
  };
}
async function saveAppSession(data) {
  const cookieStore = await cookies();
  const session = await getIronSession(
    cookieStore,
    getSessionOptions()
  );
  if (data.did !== void 0) {
    session.did = data.did;
  }
  if (data.handle !== void 0) {
    session.handle = data.handle;
  }
  if (data.isLoggedIn !== void 0) {
    session.isLoggedIn = data.isLoggedIn;
  }
  await session.save();
}
async function clearAppSession() {
  const cookieStore = await cookies();
  const session = await getIronSession(
    cookieStore,
    getSessionOptions()
  );
  session.destroy();
}

export { cleanupExpiredStates, clearAppSession, createSupabaseSessionStore, createSupabaseStateStore, getAppSession, getSessionOptions, saveAppSession };
//# sourceMappingURL=oauth.js.map
//# sourceMappingURL=oauth.js.map