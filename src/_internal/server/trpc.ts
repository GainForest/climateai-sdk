import { initTRPC, TRPCError } from "@trpc/server";
import { getSessionFromRequest } from "./session";
import { customTransformer } from "../utilities/transform";
import type { SupportedPDSDomain } from "@/_internal/index";

export async function createContext<T extends SupportedPDSDomain>(opts?: {
  req?: Request;
  allowedPDSDomains: T[];
}) {
  // Extract session from cookies/headers
  const session =
    opts?.req ? await getSessionFromRequest(opts.allowedPDSDomains[0]) : null;

  return {
    session,
  };
}

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<TrpcContext>().create({
  transformer: customTransformer,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in",
    });
  }
  return next({ ctx });
});
