import { Agent } from "@atproto/api";
import { TRPCError } from "@trpc/server";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { ATProtoSDK } from "@hypercerts-org/sdk-core";
import { getAppSession } from "@/_internal/oauth/iron-session/helpers";

/**
 * Creates a read-only Agent for public/unauthenticated requests.
 * Use this for operations that don't require authentication.
 *
 * @param pdsDomain - The PDS domain to connect to
 * @returns An unauthenticated Agent instance
 */
export const getReadAgent = <T extends SupportedPDSDomain>(pdsDomain: T) => {
  return new Agent({
    service: new URL(`https://${pdsDomain}`),
  });
};

/**
 * Creates an authenticated Agent for write operations.
 * Retrieves the user's DID from the iron-session cookie, then restores
 * the full OAuth session from the Supabase store via the SDK.
 *
 * @param sdk - The ATProto SDK instance (configured with session/state stores)
 * @param _pdsDomain - The PDS domain (optional, for future use)
 * @returns An authenticated Agent instance
 * @throws TRPCError with code "UNAUTHORIZED" if not authenticated
 *
 * @example
 * ```typescript
 * // In a tRPC router
 * const agent = await getWriteAgent(ctx.sdk);
 * await agent.com.atproto.repo.createRecord({...});
 * ```
 */
export const getWriteAgent = async <T extends SupportedPDSDomain>(
  sdk: ATProtoSDK,
  _pdsDomain?: T
) => {
  // Get user identity from iron-session cookie
  const appSession = await getAppSession();

  if (!appSession.isLoggedIn || !appSession.did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized. Please log in.",
    });
  }

  // Restore full OAuth session from Supabase via SDK
  const oauthSession = await sdk.restoreSession(appSession.did);

  if (!oauthSession) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session expired or not found. Please log in again.",
    });
  }

  // Create and return authenticated Agent
  return new Agent(oauthSession);
};
