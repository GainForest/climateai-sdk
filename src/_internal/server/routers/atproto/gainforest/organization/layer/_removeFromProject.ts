import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent, getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimCollection } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";

export const removeLayersFromProjectFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        projectRkey: z.string(),
        layerUris: z.array(z.string()).min(1),
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

      const validatedCollection =
        validateRecordOrThrow<OrgHypercertsClaimCollection.Record>(
          getResponse.data.value,
          OrgHypercertsClaimCollection
        );

      console.log("⚠️⚠️⚠️ THIS ENDPOINT IS NOT IMPLEMENTED YET ⚠️⚠️⚠️");
      return true;

      // // Remove layer URIs
      // const layersToRemove = new Set(input.layerUris);
      // const updatedLayers = validatedProject.layers.filter(
      //   (uri) => !layersToRemove.has(uri)
      // );

      // // Create updated project record
      // const updatedProject: OrgHypercertsClaimProject.Record = {
      //   ...validatedProject,
      //   layers: updatedLayers,
      // };

      // const ownershipCheckedProject = filterProjectByOwnership(
      //   updatedProject,
      //   input.did
      // );

      // validateRecordOrThrow(
      //   ownershipCheckedProject,
      //   OrgHypercertsClaimProject
      // );

      // // Update the project
      // const putResponse = await writeAgent.com.atproto.repo.putRecord({
      //   repo: input.did,
      //   collection: "app.gainforest.organization.project",
      //   record: ownershipCheckedProject,
      //   rkey: input.projectRkey,
      // });

      // if (putResponse.success !== true) {
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to remove layers from project",
      //   });
      // }

      // return {
      //   uri: putResponse.data.uri,
      //   cid: putResponse.data.cid,
      //   validationStatus: putResponse.data.validationStatus,
      //   value: ownershipCheckedProject,
      // } satisfies PutRecordResponse<OrgHypercertsClaimProject.Record>;
    });
};
