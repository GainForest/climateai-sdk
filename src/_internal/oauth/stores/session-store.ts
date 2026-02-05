import type { SupabaseClient } from "@supabase/supabase-js";
import type { SessionStore } from "@hypercerts-org/sdk-core";
import type { NodeSavedSession } from "@atproto/oauth-client-node";

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
export function createSupabaseSessionStore(
  supabase: SupabaseClient,
  appId: string
): SessionStore {
  const TABLE_NAME = "atproto_oauth_session";

  return {
    async get(did: string): Promise<NodeSavedSession | undefined> {
      const compositeKey = `${appId}:${did}`;

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("value")
        .eq("id", compositeKey)
        .single();

      // "Not found" case - PGRST116 means no rows returned for .single()
      if (error?.code === "PGRST116") {
        return undefined;
      }

      if (error) {
        throw new Error(`Failed to get session: ${error.message}`);
      }

      if (!data) {
        return undefined;
      }

      return data.value as NodeSavedSession;
    },

    async set(did: string, session: NodeSavedSession): Promise<void> {
      const compositeKey = `${appId}:${did}`;

      const { error } = await supabase.from(TABLE_NAME).upsert(
        {
          id: compositeKey,
          app_id: appId,
          did: did,
          value: session,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
        }
      );

      if (error) {
        throw new Error(`Failed to save session: ${error.message}`);
      }
    },

    async del(did: string): Promise<void> {
      const compositeKey = `${appId}:${did}`;

      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq("id", compositeKey);

      if (error) {
        throw new Error(`Failed to delete session: ${error.message}`);
      }
    },
  };
}
