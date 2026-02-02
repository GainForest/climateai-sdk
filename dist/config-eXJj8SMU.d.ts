import { SessionOptions } from 'iron-session';

/**
 * Session data stored in the iron-session cookie.
 * This contains minimal user identification data - full OAuth tokens
 * are stored in the Supabase session store.
 */
type AppSessionData = {
    /** User's DID (Decentralized Identifier) */
    did?: string;
    /** User's handle (e.g., "user.climateai.org") */
    handle?: string;
    /** Whether the user is currently logged in */
    isLoggedIn: boolean;
};
/**
 * Gets the iron-session configuration options.
 * Reads from environment variables:
 * - COOKIE_SECRET: Required, minimum 32 characters
 * - COOKIE_NAME: Optional, defaults to "climateai_session"
 *
 * @throws Error if COOKIE_SECRET is not set
 *
 * @example
 * ```typescript
 * // Set in .env
 * COOKIE_SECRET=your-secret-key-at-least-32-characters-long
 * COOKIE_NAME=greenglobe_session
 * ```
 */
declare function getSessionOptions(): SessionOptions;

export { type AppSessionData as A, getSessionOptions as g };
