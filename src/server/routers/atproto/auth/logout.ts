import { type SupportedPDSDomain } from "@/index";
import { clearSession } from "@/server/session";
import { publicProcedure } from "@/server/trpc";
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
