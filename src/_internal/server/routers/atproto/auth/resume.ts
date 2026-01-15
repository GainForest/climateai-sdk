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
      const session = await getSessionFromRequest(input.service);
      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "No session found",
        });
      }
      const credentialSession = new CredentialSession(
        new URL(`https://${input.service}`)
      );
      const resumeSessionPromise = credentialSession.resumeSession({
        accessJwt: session.accessJwt,
        refreshJwt: session.refreshJwt,
        handle: session.handle,
        did: session.did,
        active: true,
      });
      const [resumeSessionResult, resumeSessionError] =
        await tryCatch(resumeSessionPromise);
      if (resumeSessionError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to resume session",
          cause: resumeSessionError,
        });
      }
      if (!resumeSessionResult.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to resume session",
          cause: "Session could not be resumed successfully",
        });
      }
      return {
        did: resumeSessionResult.data.did,
        handle: resumeSessionResult.data.handle,
        service: input.service,
      };
    });
};
