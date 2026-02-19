import type { SupabaseClient } from "@supabase/supabase-js";
import type { StateStore } from "@hypercerts-org/sdk-core";
import type { NodeSavedState } from "@atproto/oauth-client-node";

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
export function createSupabaseStateStore(
  supabase: SupabaseClient,
  appId: string
): StateStore {
  const TABLE_NAME = "atproto_oauth_state";
  const TTL_HOURS = 1;

  return {
    async get(key: string): Promise<NodeSavedState | undefined> {
      const compositeKey = `${appId}:${key}`;

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("value, expires_at")
        .eq("id", compositeKey)
        .single();

      // "Not found" case - PGRST116 means no rows returned for .single()
      if (error?.code === "PGRST116") {
        return undefined;
      }

      if (error) {
        throw new Error(`Failed to get state: ${error.message}`);
      }

      if (!data) {
        return undefined;
      }

      if (new Date(data.expires_at) < new Date()) {
        await supabase.from(TABLE_NAME).delete().eq("id", compositeKey);
        throw new Error("OAuth state has expired");
      }

      return data.value as NodeSavedState;
    },

    async set(key: string, state: NodeSavedState): Promise<void> {
      const compositeKey = `${appId}:${key}`;
      const expiresAt = new Date(Date.now() + TTL_HOURS * 60 * 60 * 1000);

      const { error } = await supabase.from(TABLE_NAME).upsert(
        {
          id: compositeKey,
          app_id: appId,
          value: state,
          expires_at: expiresAt.toISOString(),
        },
        {
          onConflict: "id",
        }
      );

      if (error) {
        throw new Error(`Failed to save state: ${error.message}`);
      }
    },

    async del(key: string): Promise<void> {
      const compositeKey = `${appId}:${key}`;

      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", compositeKey);

      if (error) {
        throw new Error(`Failed to delete state: ${error.message}`);
      }
    },
  };
}

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
export async function cleanupExpiredStates(
  supabase: SupabaseClient
): Promise<number> {
  const TABLE_NAME = "atproto_oauth_state";

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .lt("expires_at", new Date().toISOString())
    .select("id");

  if (error) {
    throw new Error(`Failed to cleanup expired states: ${error.message}`);
  }

  return data?.length ?? 0;
}
