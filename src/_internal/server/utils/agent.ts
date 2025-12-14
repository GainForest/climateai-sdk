import { Agent, CredentialSession } from "@atproto/api";
import { getSessionFromRequest } from "../session";
import { TRPCError } from "@trpc/server";
import type { SupportedPDSDomain } from "@/_internal/index";

export const getReadAgent = <T extends SupportedPDSDomain>(pdsDomain: T) => {
  return new Agent({
    service: new URL(`https://${pdsDomain}`),
  });
};

export const getWriteAgent = async <T extends SupportedPDSDomain>(
  pdsDomain: T
) => {
  const session = await getSessionFromRequest(pdsDomain);
  if (!session)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized.",
    });
  const credentialSession = new CredentialSession(
    new URL(`https://${pdsDomain}`)
  );
  const result = await credentialSession.resumeSession({
    accessJwt: session.accessJwt,
    refreshJwt: session.refreshJwt,
    handle: session.handle,
    did: session.did,
    active: true,
  });
  if (!result.success)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session.",
    });
  return new Agent(credentialSession);
};
