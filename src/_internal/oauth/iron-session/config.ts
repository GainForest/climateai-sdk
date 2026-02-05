import type { SessionOptions } from "iron-session";

/**
 * Session data stored in the iron-session cookie.
 * This contains minimal user identification data - full OAuth tokens
 * are stored in the Supabase session store.
 */
export type AppSessionData = {
  /** User's DID (Decentralized Identifier) */
  did?: string;
  /** User's handle (e.g., "user.climateai.org") */
  handle?: string;
  /** Whether the user is currently logged in */
  isLoggedIn: boolean;
};

/**
 * Default cookie expiration time in seconds (30 days)
 */
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Default cookie name if not specified in environment
 */
const DEFAULT_COOKIE_NAME = "climateai_session";

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
export function getSessionOptions(): SessionOptions {
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
      sameSite: "lax" as const,
      maxAge: DEFAULT_MAX_AGE,
      path: "/",
    },
  };
}
