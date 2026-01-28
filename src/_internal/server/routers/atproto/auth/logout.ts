import { type SupportedPDSDomain } from "@/_internal/index";
import { clearSession } from "@/_internal/server/session";
import { publicProcedure } from "@/_internal/server/trpc";
import z from "zod";

/**
 * Result of a successful logout
 */
export type LogoutResult = {
  success: true;
};

/**
 * Pure function to perform logout.
 * Can be reused outside of tRPC context.
 */
export const logoutPure = async <T extends SupportedPDSDomain>(
  service: T
): Promise<LogoutResult> => {
  await clearSession(service);
  return { success: true };
};

/**
 * Factory to create the tRPC procedure for logout.
 */
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
      return logoutPure(input.service);
    });
};
