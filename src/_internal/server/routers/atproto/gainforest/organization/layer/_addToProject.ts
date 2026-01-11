import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent, getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { parseAtUri } from "@/_internal/utilities/atproto";
import { tryCatch } from "@/_internal/lib/tryCatch";

export const addLayersToProjectFactory = <T extends SupportedPDSDomain>(
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

      // Check if the layers are owned by the user
      const ownedLayerUris = input.layerUris.filter((uri) =>
        checkOwnershipByAtUri(uri, input.did)
      );
      if (ownedLayerUris.length !== input.layerUris.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            ownedLayerUris.length === 1 ?
              "The layer you are trying to add is not owned by you"
            : "The layers you are trying to add are not owned by you",
        });
      }

      // Check if the layers exist
      const layerExistencePromise = Promise.all(
        input.layerUris.map(async (uri) => {
          const { did, collection, rkey } = parseAtUri(uri);
          const response = await readAgent.com.atproto.repo.getRecord({
            collection: collection,
            repo: did,
            rkey: rkey,
          });
          return response.success === true;
        })
      );
      const [layerExistence, layerExistenceCheckError] = await tryCatch(
        layerExistencePromise
      );
      if (layerExistenceCheckError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to check the existence of the layers",
        });
      }

      if (!layerExistence.every(Boolean)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            layerExistence.length === 1 ?
              "The layer you are trying to add does not exist"
            : "The layers you are trying to add do not exist",
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

      console.log("⚠️⚠️⚠️ THIS ENDPOINT IS NOT IMPLEMENTED YET ⚠️⚠️⚠️");
      return true;

      // const validatedProject =
      //     validateRecordOrThrow<OrgHypercertsClaimProject.Record>(
      //     getResponse.data.value,
      //     OrgHypercertsClaimProject
      //   );

      // Add new layer URIs, avoiding duplicates
      // const existingLayers = new Set(validatedProject.layers);
      // const newLayers = input.layerUris.filter(
      //   (uri) => !existingLayers.has(uri)
      // );
      // const updatedLayers = [...validatedProject.layers, ...newLayers];

      // // Create updated project record
      // const updatedProject: AppGainforestOrganizationProject.Record = {
      //   ...validatedProject,
      //   layers: updatedLayers,
      // };

      // const ownershipCheckedProject = filterProjectByOwnership(
      //   updatedProject,
      //   input.did
      // );

      // validateRecordOrThrow(
      //   ownershipCheckedProject,
      //   AppGainforestOrganizationProject
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
      //     message: "Failed to add layers to project",
      //   });
      // }

      // return {
      //   uri: putResponse.data.uri,
      //   cid: putResponse.data.cid,
      //   validationStatus: putResponse.data.validationStatus,
      //   value: ownershipCheckedProject,
      // } satisfies PutRecordResponse<AppGainforestOrganizationProject.Record>;
    });
};
