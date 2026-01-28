import { type SupportedPDSDomain } from "@/_internal/index";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { saveSession, type StoredSession } from "@/_internal/server/session";
import { publicProcedure } from "@/_internal/server/trpc";
import { CredentialSession } from "@atproto/api";
import { TRPCError } from "@trpc/server";
import z from "zod";

/**
 * Result of a successful login
 */
export type LoginResult = {
  did: string;
  handle: string;
  service: SupportedPDSDomain;
};

/**
 * Pure function to perform login.
 * Can be reused outside of tRPC context.
 */
export const loginPure = async <T extends SupportedPDSDomain>(
  handlePrefix: string,
  password: string,
  service: T
): Promise<LoginResult> => {
  const session = new CredentialSession(new URL(`https://${service}`));

  const [result, error] = await tryCatch(
    session.login({
      identifier: `${handlePrefix}.${service}`,
      password: password,
    })
  );

  if (error !== null) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login failed. Please check your credentials.",
      cause: error,
    });
  }

  if (result === null || !result.success) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login failed. Please check your credentials.",
    });
  }

  const context: StoredSession = {
    accessJwt: result.data.accessJwt,
    refreshJwt: result.data.refreshJwt,
    did: result.data.did,
    handle: result.data.handle,
  };

  await saveSession(context, service);

  return {
    did: context.did,
    handle: context.handle,
    service: service,
  };
};

/**
 * Factory to create the tRPC procedure for login.
 */
export const loginFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        handlePrefix: z.string().regex(/^[a-zA-Z0-9-]+$/), // alphanumerics and hyphens only
        service: allowedPDSDomainSchema,
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return loginPure(input.handlePrefix, input.password, input.service);
    });
};
