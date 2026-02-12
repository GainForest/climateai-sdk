import { z } from "zod";
import { AtpAgent } from "@atproto/api";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "@/_internal/server/trpc";
import {
  createOrUpdateOrganizationInfoPure,
  OrganizationInfoInputSchema,
  OrganizationInfoUploadsSchema,
} from "../gainforest/organization/info/createOrUpdate";
import type { SupportedPDSDomain } from "@/_internal/index";

/**
 * Schema for JWT-based authentication credentials.
 * These are returned by the createAccount function.
 */
export const JwtCredentialsSchema = z.object({
  did: z.string().startsWith("did:"),
  handle: z.string(),
  accessJwt: z.string(),
  refreshJwt: z.string(),
});

export type JwtCredentials = z.infer<typeof JwtCredentialsSchema>;

/**
 * Creates an authenticated Agent using JWT credentials directly.
 * Use this for operations where OAuth flow hasn't been completed yet
 * (e.g., during account creation/onboarding).
 *
 * @param credentials - JWT credentials from createAccount
 * @param pdsDomain - The PDS domain to connect to
 * @returns An authenticated Agent instance
 * @throws TRPCError if session resumption fails
 */
export const createAgentFromJwt = async (
  credentials: JwtCredentials,
  pdsDomain: SupportedPDSDomain
): Promise<AtpAgent> => {
  let agent: AtpAgent;

  try {
    agent = new AtpAgent({
      service: new URL(`https://${pdsDomain}`),
    });
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Invalid PDS domain: ${pdsDomain}`,
      cause: error,
    });
  }

  try {
    await agent.resumeSession({
      did: credentials.did,
      handle: credentials.handle,
      accessJwt: credentials.accessJwt,
      refreshJwt: credentials.refreshJwt,
      active: true,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown session error";
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Failed to authenticate with provided credentials: ${message}`,
      cause: error,
    });
  }

  if (!agent.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session was not established after resumeSession",
    });
  }

  return agent;
};

/**
 * Factory to create the tRPC procedure for onboarding a user.
 *
 * This procedure allows creating an organization info record using JWT credentials
 * directly (bypassing OAuth). Use this during account creation flow when the user
 * has just created an account and you have the JWT tokens but haven't gone through
 * the OAuth flow yet.
 *
 * @example
 * ```typescript
 * // After createAccount returns credentials
 * const result = await trpc.miscellaneous.onboard.mutate({
 *   credentials: {
 *     did: "did:plc:xxx",
 *     handle: "user.bsky.social",
 *     accessJwt: "eyJ...",
 *     refreshJwt: "eyJ...",
 *   },
 *   pdsDomain: "pds.example.com",
 *   info: {
 *     displayName: "My Organization",
 *     shortDescription: "A great org",
 *     longDescription: "A really great organization...",
 *     objectives: ["Conservation"],
 *     country: "US",
 *     visibility: "Public",
 *   },
 * });
 * ```
 */
export const onboardFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) =>
  publicProcedure
    .input(
      z.object({
        credentials: JwtCredentialsSchema,
        pdsDomain: allowedPDSDomainSchema,
        info: OrganizationInfoInputSchema,
        uploads: OrganizationInfoUploadsSchema.optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Validate credentials are not empty
      if (!input.credentials.accessJwt || !input.credentials.refreshJwt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Access JWT and refresh JWT are required",
        });
      }

      if (!input.credentials.did || !input.credentials.handle) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "DID and handle are required",
        });
      }

      // Create an agent using the provided JWT credentials
      const agent = await createAgentFromJwt(input.credentials, input.pdsDomain);

      // Use the pure function to create the organization info record
      // The pure function already throws TRPCErrors on failure via putRecord
      return createOrUpdateOrganizationInfoPure(
        agent,
        input.credentials.did,
        input.info,
        input.uploads
      );
    });
