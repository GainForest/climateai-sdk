import { type SupportedPDSDomain } from "@/_internal/index";
import { clearSession } from "@/_internal/server/session";
import { publicProcedure } from "@/_internal/server/trpc";
import z from "zod";

export const logoutFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        service: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      await clearSession(input.service);
      return {
        success: true,
      };
    });
};
