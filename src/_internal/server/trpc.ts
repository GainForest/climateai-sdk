import { initTRPC, TRPCError } from "@trpc/server";
import { customTransformer } from "../utilities/transform";
import { getAppSession } from "../oauth/iron-session/helpers";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { ATProtoSDK as HypercertsATProtoSDK } from "@hypercerts-org/sdk-core";
import type { AppSessionData } from "../oauth/iron-session/config";

/**
 * Creates the tRPC context for each request.
 * Apps must provide the ATProto SDK instance configured with their stores.
 *
 * @param opts.sdk - The ATProto SDK instance (required for authenticated operations)
 * @param opts.req - Optional request object
 * @param opts.allowedPDSDomains - List of allowed PDS domains
 */
export async function createContext<T extends SupportedPDSDomain>(opts: {
  sdk: HypercertsATProtoSDK;
  req?: Request;
  allowedPDSDomains: T[];
}) {
  // Get session from iron-session cookie
  const session = await getAppSession();

  return {
    session,
    sdk: opts.sdk,
  };
}

export type TrpcContext = {
  session: AppSessionData;
  sdk: HypercertsATProtoSDK;
};

const t = initTRPC.context<TrpcContext>().create({
  transformer: customTransformer,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure that requires authentication.
 * Throws UNAUTHORIZED if the user is not logged in.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session.isLoggedIn || !ctx.session.did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in",
    });
  }
  return next({
    ctx: {
      ...ctx,
      // Narrow the session type to guarantee did is defined
      session: ctx.session as AppSessionData & { did: string; isLoggedIn: true },
    },
  });
});
