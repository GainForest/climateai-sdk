import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent, getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimCollection } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { parseAtUri } from "@/_internal/utilities/atproto";
import { tryCatch } from "@/_internal/lib/tryCatch";

export const addMeasuredTreesClusterToProjectFactory = <
  T extends SupportedPDSDomain,
>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        projectRkey: z.string(),
        measuredTreesClusterUris: z.array(z.string()).min(1),
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

      // Check if the measured trees clusters are owned by the user
      const ownedClusterUris = input.measuredTreesClusterUris.filter((uri) =>
        checkOwnershipByAtUri(uri, input.did)
      );
      if (ownedClusterUris.length !== input.measuredTreesClusterUris.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            ownedClusterUris.length === 1 ?
              "The measured trees cluster you are trying to add is not owned by you"
            : "The measured trees clusters you are trying to add are not owned by you",
        });
      }

      // Check if the measured trees clusters exist
      const clusterExistencePromise = Promise.all(
        input.measuredTreesClusterUris.map(async (uri) => {
          const { did, collection, rkey } = parseAtUri(uri);
          const response = await readAgent.com.atproto.repo.getRecord({
            collection: collection,
            repo: did,
            rkey: rkey,
          });
          return response.success === true;
        })
      );
      const [clusterExistence, clusterExistenceCheckError] = await tryCatch(
        clusterExistencePromise
      );
      if (clusterExistenceCheckError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Failed to check the existence of the measured trees clusters",
        });
      }

      if (!clusterExistence.every(Boolean)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            clusterExistence.length === 1 ?
              "The measured trees cluster you are trying to add does not exist"
            : "The measured trees clusters you are trying to add do not exist",
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

      //   const validatedProject =
      //     validateRecordOrThrow<OrgHypercertsClaimProject.Record>(
      //       getResponse.data.value,
      //       OrgHypercertsClaimProject
      //     );

      //   // Add new measuredTreesCluster URIs, avoiding duplicates
      //   const existingClusters = new Set(validatedProject.measuredTreesClusters);
      //   const newClusters = input.measuredTreesClusterUris.filter(
      //     (uri) => !existingClusters.has(uri)
      //   );
      //   const updatedClusters = [
      //     ...validatedProject.measuredTreesClusters,
      //     ...newClusters,
      //   ];

      //   // Create updated project record
      //   const updatedProject: OrgHypercertsClaimProject.Record = {
      //     ...validatedProject,
      //     measuredTreesClusters: updatedClusters,
      //   };

      //   const ownershipCheckedProject = filterProjectByOwnership(
      //     updatedProject,
      //     input.did
      //   );

      //   validateRecordOrThrow(
      //     ownershipCheckedProject,
      //     OrgHypercertsClaimProject
      //   );

      //   // Update the project
      //   const putResponse = await writeAgent.com.atproto.repo.putRecord({
      //     repo: input.did,
      //     collection: "app.gainforest.organization.project",
      //     record: ownershipCheckedProject,
      //     rkey: input.projectRkey,
      //   });

      //   if (putResponse.success !== true) {
      //     throw new TRPCError({
      //       code: "INTERNAL_SERVER_ERROR",
      //       message: "Failed to add measured trees clusters to project",
      //     });
      //   }

      //   return {
      //     uri: putResponse.data.uri,
      //     cid: putResponse.data.cid,
      //     validationStatus: putResponse.data.validationStatus,
      //     value: ownershipCheckedProject,
      //   } satisfies PutRecordResponse<OrgHypercertsClaimProject.Record>;
    });
};
