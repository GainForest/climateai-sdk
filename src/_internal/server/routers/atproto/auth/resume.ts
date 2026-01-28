import { type SupportedPDSDomain } from "@/_internal/index";
import { tryCatch } from "@/_internal/lib/tryCatch";
import {
  getSessionFromRequest,
  StoredSession,
} from "@/_internal/server/session";
import { publicProcedure } from "@/_internal/server/trpc";
import { CredentialSession } from "@atproto/api";
import { TRPCError } from "@trpc/server";
import z from "zod";

/**
 * Result of a successful session resume
 */
export type ResumeResult = {
  did: string;
  handle: string;
  service: SupportedPDSDomain;
};

/**
 * Helper to create a credential session from stored session data.
 */
export const resumeCredentialSession = (
  service: SupportedPDSDomain,
  sessionData: StoredSession
) => {
  const credentialSession = new CredentialSession(
    new URL(`https://${service}`)
  );

  return credentialSession.resumeSession({
    accessJwt: sessionData.accessJwt,
    refreshJwt: sessionData.refreshJwt,
    handle: sessionData.handle,
    did: sessionData.did,
    active: true,
  });
};

/**
 * Pure function to resume a session.
 * Can be reused outside of tRPC context.
 */
export const resumePure = async <T extends SupportedPDSDomain>(
  service: T
): Promise<ResumeResult> => {
  const session = await getSessionFromRequest(service);

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No active session found. Please log in.",
    });
  }

  const credentialSession = new CredentialSession(
    new URL(`https://${service}`)
  );

  const [resumeSessionResult, resumeSessionError] = await tryCatch(
    credentialSession.resumeSession({
      accessJwt: session.accessJwt,
      refreshJwt: session.refreshJwt,
      handle: session.handle,
      did: session.did,
      active: true,
    })
  );

  if (resumeSessionError !== null) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session. Please log in again.",
      cause: resumeSessionError,
    });
  }

  if (resumeSessionResult === null || !resumeSessionResult.success) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session. Please log in again.",
    });
  }

  return {
    did: resumeSessionResult.data.did,
    handle: resumeSessionResult.data.handle,
    service: service,
  };
};

/**
 * Factory to create the tRPC procedure for resuming a session.
 */
export const resumeFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        service: allowedPDSDomainSchema,
      })
    )
    .query(async ({ input }) => {
      return resumePure(input.service);
    });
};
