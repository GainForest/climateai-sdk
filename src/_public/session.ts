/**
 * Session utilities for ATProto OAuth authentication.
 *
 * This module provides iron-session based helpers for managing
 * user identity in cookies. The actual OAuth tokens are stored
 * in Supabase via the session/state stores.
 *
 * @example
 * ```typescript
 * import { getAppSession, saveAppSession, clearAppSession } from "@climateai/sdk/session";
 *
 * // Check if user is logged in
 * const session = await getAppSession();
 * if (session.isLoggedIn && session.did) {
 *   // User is authenticated
 * }
 *
 * // Save session after OAuth callback
 * await saveAppSession({ did: "did:plc:...", handle: "user.climateai.org", isLoggedIn: true });
 *
 * // Clear session on logout
 * await clearAppSession();
 * ```
 */

export {
  getAppSession,
  saveAppSession,
  clearAppSession,
} from "../_internal/oauth/iron-session/helpers";

export type { AppSessionData } from "../_internal/oauth/iron-session/config";
