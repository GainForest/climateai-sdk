/**
 * OAuth utilities for ATProto authentication with Supabase storage.
 *
 * This module provides:
 * - Supabase-backed session and state stores for OAuth
 * - iron-session helpers for cookie-based identity
 * - Re-exports from the Hypercerts SDK for ATProto OAuth
 *
 * @example
 * ```typescript
 * import {
 *   createATProtoSDK,
 *   createSupabaseSessionStore,
 *   createSupabaseStateStore,
 *   getAppSession,
 *   saveAppSession,
 * } from "@climateai/sdk/oauth";
 * import { GainForestSDK } from "@climateai/sdk";
 * import { createClient } from "@supabase/supabase-js";
 *
 * const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
 *
 * // Create the HypercertsATProtoSDK with Supabase stores
 * const sdk = createATProtoSDK({
 *   oauth: {
 *     clientId: "https://your-app.com/client-metadata.json",
 *     redirectUri: "https://your-app.com/api/oauth/callback",
 *     jwksUri: "https://your-app.com/jwks.json",
 *     jwkPrivate: process.env.OAUTH_PRIVATE_KEY!,
 *     scope: "atproto",
 *   },
 *   servers: { pds: "https://climateai.org" },
 *   sessionStore: createSupabaseSessionStore(supabase, "myapp"),
 *   stateStore: createSupabaseStateStore(supabase, "myapp"),
 * });
 *
 * // Pass the SDK once at construction time
 * const gainforest = new GainForestSDK(["climateai.org", "gainforest.id"], sdk);
 *
 * // In your OAuth callback route
 * const session = await sdk.callback(params);
 * await saveAppSession({ did: session.sub, handle: session.handle, isLoggedIn: true });
 *
 * // In authenticated routes
 * const appSession = await getAppSession();
 * if (appSession.isLoggedIn) {
 *   const oauthSession = await sdk.restoreSession(appSession.did);
 * }
 * ```
 */

// Supabase stores
export { createSupabaseSessionStore } from "../_internal/oauth/stores/session-store";
export {
  createSupabaseStateStore,
  cleanupExpiredStates,
} from "../_internal/oauth/stores/state-store";

// iron-session helpers
export {
  getAppSession,
  saveAppSession,
  clearAppSession,
} from "../_internal/oauth/iron-session/helpers";
export { getSessionOptions } from "../_internal/oauth/iron-session/config";
export type { AppSessionData } from "../_internal/oauth/iron-session/config";

// Re-export from hypercerts SDK
export { createATProtoSDK } from "@hypercerts-org/sdk-core";
export type {
  SessionStore,
  StateStore,
  ATProtoSDK as HypercertsATProtoSDK,
  ATProtoSDKConfig,
} from "@hypercerts-org/sdk-core";

// Re-export Agent from atproto for convenience
export { Agent } from "@atproto/api";
