import { publicProcedure } from "@/_internal/server/trpc";
import z from "zod";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { AppGainforestOrganizationObservationsMeasuredTreesCluster as MeasuredTreesCluster } from "@/../lex-api";
import { getReadAgent } from "@/_internal/server/utils/agent";
import type { SupportedPDSDomain } from "@/_internal/index";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import { TRPCError } from "@trpc/server";

export const getMeasuredTreesFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        did: z.string(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .query(async ({ input }) => {
      const agent = getReadAgent(input.pdsDomain);
      const nsid: MeasuredTreesCluster.Record["$type"] =
        "app.gainforest.organization.observations.measuredTreesCluster";
      const response = await agent.com.atproto.repo.getRecord({
        collection: nsid,
        repo: input.did,
        rkey: "self",
      });
      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get measured trees",
        });
      }
      validateRecordOrThrow(response.data.value, MeasuredTreesCluster);
      return response.data as GetRecordResponse<MeasuredTreesCluster.Record>;
    });
};
