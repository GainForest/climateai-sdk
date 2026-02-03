import { SupabaseClient } from '@supabase/supabase-js';
import { SessionStore, StateStore } from '@hypercerts-org/sdk-core';
export { ATProtoSDKConfig, ATProtoSDK as HypercertsATProtoSDK, SessionStore, StateStore, createATProtoSDK } from '@hypercerts-org/sdk-core';
export { clearAppSession, getAppSession, saveAppSession } from './session.cjs';
export { A as AppSessionData, g as getSessionOptions } from './config-eXJj8SMU.cjs';
export { Agent } from '@atproto/api';
import 'iron-session';

/**
 * Creates a Supabase-backed session store for ATProto OAuth.
 * Sessions are keyed by app_id + DID to support multiple apps sharing the same database.
 *
 * @param supabase - Supabase client instance
 * @param appId - Unique identifier for the app (e.g., "greenglobe", "bumicerts")
 * @returns SessionStore implementation
 *
 * @example
 * ```typescript
 * import { createClient } from "@supabase/supabase-js";
 * import { createSupabaseSessionStore } from "@climateai/sdk/oauth";
 *
 * const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
 * const sessionStore = createSupabaseSessionStore(supabase, "greenglobe");
 * ```
 *
 * Required Supabase table schema:
 * ```sql
 * CREATE TABLE atproto_oauth_session (
 *     id TEXT PRIMARY KEY,
 *     app_id TEXT NOT NULL,
 *     did TEXT NOT NULL,
 *     value JSONB NOT NULL,
 *     created_at TIMESTAMPTZ DEFAULT NOW(),
 *     updated_at TIMESTAMPTZ DEFAULT NOW(),
 *     UNIQUE(app_id, did)
 * );
 * CREATE INDEX idx_oauth_session_app_did ON atproto_oauth_session(app_id, did);
 * ```
 */
declare function createSupabaseSessionStore(supabase: SupabaseClient, appId: string): SessionStore;

/**
 * Creates a Supabase-backed state store for ATProto OAuth authorization flow.
 * States are short-lived (1 hour TTL) and used during the OAuth authorization process.
 *
 * @param supabase - Supabase client instance
 * @param appId - Unique identifier for the app (e.g., "greenglobe", "bumicerts")
 * @returns StateStore implementation
 *
 * @example
 * ```typescript
 * import { createClient } from "@supabase/supabase-js";
 * import { createSupabaseStateStore } from "@climateai/sdk/oauth";
 *
 * const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
 * const stateStore = createSupabaseStateStore(supabase, "greenglobe");
 * ```
 *
 * Required Supabase table schema:
 * ```sql
 * CREATE TABLE atproto_oauth_state (
 *     id TEXT PRIMARY KEY,
 *     app_id TEXT NOT NULL,
 *     value JSONB NOT NULL,
 *     created_at TIMESTAMPTZ DEFAULT NOW(),
 *     expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 hour')
 * );
 * CREATE INDEX idx_oauth_state_app_expires ON atproto_oauth_state(app_id, expires_at);
 * ```
 */
declare function createSupabaseStateStore(supabase: SupabaseClient, appId: string): StateStore;
/**
 * Cleans up expired OAuth states from the database.
 *
 * @param supabase - Supabase client instance
 * @returns Number of deleted records
 *
 * @example
 * ```typescript
 * // In a scheduled function or cron job
 * const deleted = await cleanupExpiredStates(supabase);
 * console.log(`Cleaned up ${deleted} expired OAuth states`);
 * ```
 */
declare function cleanupExpiredStates(supabase: SupabaseClient): Promise<number>;

export { cleanupExpiredStates, createSupabaseSessionStore, createSupabaseStateStore };
