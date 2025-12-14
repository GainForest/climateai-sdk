import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent, getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { filterProjectByOwnership } from "../project/utils";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { parseAtUri } from "@/_internal/utilities/atproto";
import { tryCatch } from "@/_internal/lib/tryCatch";

export const addSitesToProjectFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        projectRkey: z.string(),
        siteUris: z.array(z.string()).min(1),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const readAgent = getReadAgent(input.pdsDomain);
      const writeAgent = await getWriteAgent(input.pdsDomain);

      if (!writeAgent.did) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authenticated",
        });
      }

      // Check if the sites are owned by the user
      const ownedSiteUris = input.siteUris.filter((uri) =>
        checkOwnershipByAtUri(uri, input.did)
      );
      if (ownedSiteUris.length !== input.siteUris.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            ownedSiteUris.length === 1 ?
              "The site you are trying to add is not owned by you"
            : "The sites you are trying to add are not owned by you",
        });
      }

      // Check if the sites exist
      const siteExistencePromise = Promise.all(
        input.siteUris.map(async (uri) => {
          const { did, collection, rkey } = parseAtUri(uri);
          const response = await readAgent.com.atproto.repo.getRecord({
            collection: collection,
            repo: did,
            rkey: rkey,
          });
          return response.success === true;
        })
      );
      const [siteExistence, siteExistenceCheckError] =
        await tryCatch(siteExistencePromise);
      if (siteExistenceCheckError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to check the existence of the sites",
        });
      }

      if (!siteExistence.every(Boolean)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            siteExistence.length === 1 ?
              "The site you are trying to add does not exist"
            : "The sites you are trying to add do not exist",
        });
      }

      // Get the current project
      const getResponse = await readAgent.com.atproto.repo.getRecord({
        collection: "app.gainforest.organization.project",
        repo: input.did,
        rkey: input.projectRkey,
      });

      if (getResponse.success !== true) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const validatedProject =
        validateRecordOrThrow<AppGainforestOrganizationProject.Record>(
          getResponse.data.value,
          AppGainforestOrganizationProject
        );

      // Add new site URIs, avoiding duplicates
      const existingSites = new Set(validatedProject.sites);
      const newSites = input.siteUris.filter((uri) => !existingSites.has(uri));
      const updatedSites = [...validatedProject.sites, ...newSites];

      // Create updated project record
      const updatedProject: AppGainforestOrganizationProject.Record = {
        ...validatedProject,
        sites: updatedSites,
      };

      const ownershipCheckedProject = filterProjectByOwnership(
        updatedProject,
        input.did
      );

      validateRecordOrThrow(
        ownershipCheckedProject,
        AppGainforestOrganizationProject
      );

      // Update the project
      const putResponse = await writeAgent.com.atproto.repo.putRecord({
        repo: input.did,
        collection: "app.gainforest.organization.project",
        record: ownershipCheckedProject,
        rkey: input.projectRkey,
      });

      if (putResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add sites to project",
        });
      }

      return {
        uri: putResponse.data.uri,
        cid: putResponse.data.cid,
        validationStatus: putResponse.data.validationStatus,
        value: ownershipCheckedProject,
      } satisfies PutRecordResponse<AppGainforestOrganizationProject.Record>;
    });
};
