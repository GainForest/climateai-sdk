import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent, getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { filterProjectByOwnership } from "../project/utils";

export const removeSitesFromProjectFactory = <T extends SupportedPDSDomain>(
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

      // Remove site URIs
      const sitesToRemove = new Set(input.siteUris);
      const updatedSites = validatedProject.sites.filter(
        (uri) => !sitesToRemove.has(uri)
      );

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
          message: "Failed to remove sites from project",
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
