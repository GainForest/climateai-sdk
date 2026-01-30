import { A as AppSessionData } from './config-eXJj8SMU.cjs';
import 'iron-session';

/**
 * Gets the current app session from the iron-session cookie.
 * Returns the session data if a valid session exists, or a default empty session.
 *
 * @returns The current session data
 *
 * @example
 * ```typescript
 * const session = await getAppSession();
 * if (session.isLoggedIn && session.did) {
 *   // User is authenticated
 *   const oauthSession = await sdk.restoreSession(session.did);
 * }
 * ```
 */
declare function getAppSession(): Promise<AppSessionData>;
/**
 * Saves user data to the iron-session cookie.
 * Call this after successful OAuth callback to persist the user's identity.
 *
 * @param data - The session data to save (did, handle, isLoggedIn)
 *
 * @example
 * ```typescript
 * // After OAuth callback
 * const oauthSession = await sdk.callback(params);
 * await saveAppSession({
 *   did: oauthSession.sub,
 *   handle: oauthSession.handle,
 *   isLoggedIn: true,
 * });
 * ```
 */
declare function saveAppSession(data: Partial<AppSessionData>): Promise<void>;
/**
 * Clears the iron-session cookie, logging the user out.
 * Note: This only clears the cookie - the OAuth session in Supabase
 * should be cleared separately if needed.
 *
 * @example
 * ```typescript
 * // On logout
 * await clearAppSession();
 * // Optionally also clear the OAuth session from Supabase
 * ```
 */
declare function clearAppSession(): Promise<void>;

export { AppSessionData, clearAppSession, getAppSession, saveAppSession };
