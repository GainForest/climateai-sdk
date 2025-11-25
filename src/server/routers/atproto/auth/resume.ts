import { type SupportedPDSDomain } from "@/index";
import { getSessionFromRequest } from "@/server/session";
import { publicProcedure } from "@/server/trpc";
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
        context: session,
        service: input.service,
      };
    });
};
