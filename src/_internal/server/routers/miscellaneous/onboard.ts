import z from "zod";
import { AtpAgent } from "@atproto/api";
import { publicProcedure } from "@/_internal/server/trpc";
import {
  OrganizationInfoInputSchema,
  OrganizationInfoUploadsSchema,
  createOrUpdateOrganizationInfoPure,
} from "@/_internal/server/routers/atproto/gainforest/organization/info/createOrUpdate";
import type { SupportedPDSDomain } from "@/_internal/index";

/**
 * Zod schema for raw ATProto credentials.
 * Used to build a write agent on the spot without an OAuth session.
 */
const CredentialsSchema = z.object({
  did: z.string(),
  handle: z.string(),
  accessJwt: z.string(),
  refreshJwt: z.string(),
});

/**
 * Builds an authenticated ATProto agent directly from raw credentials,
 * bypassing the OAuth session store.
 */
const buildAgentFromCredentials = async (
  credentials: z.infer<typeof CredentialsSchema>,
  pdsDomain: SupportedPDSDomain
) => {
  const agent = new AtpAgent({ service: `https://${pdsDomain}` });

  await agent.resumeSession({
    did: credentials.did,
    handle: credentials.handle,
    accessJwt: credentials.accessJwt,
    refreshJwt: credentials.refreshJwt,
    active: true,
  });

  return agent;
};

/**
 * Factory to create the tRPC procedure for onboarding an organization.
 *
 * Unlike the standard `createOrUpdate` route (which relies on an OAuth
 * session cookie), this procedure accepts raw ATProto credentials in the
 * request body and builds the write agent on the spot. This is intended
 * for server-to-server calls or bootstrapping flows where the caller
 * already holds valid JWT tokens.
 *
 * @example
 * ```ts
 * await apiCaller.miscellaneous.onboard({
 *   credentials: { did, handle, accessJwt, refreshJwt },
 *   pdsDomain: "gainforest.id",
 *   info: { displayName: "Acme", shortDescription: "...", ... },
 *   uploads: { logo: logoFile },
 * });
 * ```
 */
export const onboardFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) =>
  publicProcedure
    .input(
      z.object({
        credentials: CredentialsSchema,
        pdsDomain: allowedPDSDomainSchema,
        info: OrganizationInfoInputSchema,
        uploads: OrganizationInfoUploadsSchema.optional(),
      })
    )
    .mutation(async ({ input }) => {
      const typedInput = input as {
        credentials: z.infer<typeof CredentialsSchema>;
        pdsDomain: SupportedPDSDomain;
        info: z.infer<typeof OrganizationInfoInputSchema>;
        uploads?: z.infer<typeof OrganizationInfoUploadsSchema>;
      };

      const agent = await buildAgentFromCredentials(
        typedInput.credentials,
        typedInput.pdsDomain
      );

      return createOrUpdateOrganizationInfoPure(
        agent,
        typedInput.credentials.did,
        typedInput.info,
        typedInput.uploads
      );
    });
