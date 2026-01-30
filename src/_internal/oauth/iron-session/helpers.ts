import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSessionOptions, type AppSessionData } from "./config";

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
export async function getAppSession(): Promise<AppSessionData> {
  const cookieStore = await cookies();
  const session = await getIronSession<AppSessionData>(
    cookieStore,
    getSessionOptions()
  );

  return {
    did: session.did,
    handle: session.handle,
    isLoggedIn: session.isLoggedIn ?? false,
  };
}

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
export async function saveAppSession(
  data: Partial<AppSessionData>
): Promise<void> {
  const cookieStore = await cookies();
  const session = await getIronSession<AppSessionData>(
    cookieStore,
    getSessionOptions()
  );

  if (data.did !== undefined) {
    session.did = data.did;
  }
  if (data.handle !== undefined) {
    session.handle = data.handle;
  }
  if (data.isLoggedIn !== undefined) {
    session.isLoggedIn = data.isLoggedIn;
  }

  await session.save();
}

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
export async function clearAppSession(): Promise<void> {
  const cookieStore = await cookies();
  const session = await getIronSession<AppSessionData>(
    cookieStore,
    getSessionOptions()
  );

  session.destroy();
}

export type { AppSessionData };
