import { type SupportedPDSDomain } from "@/_internal/index";
import { getSessionFromRequest } from "@/_internal/server/session";
import { publicProcedure } from "@/_internal/server/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const resumeFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        service: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const session = await getSessionFromRequest(input.service);
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No session found",
        });
      }
      return {
        did: session.did,
        handle: session.handle,
        service: input.service,
      };
    });
};
