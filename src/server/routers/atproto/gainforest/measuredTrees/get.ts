import { publicProcedure } from "@/server/trpc";
import z from "zod";
import type { GetRecordResponse } from "@/server/utils/response-types";
import { AppGainforestOrganizationObservationsMeasuredTreesCluster as MeasuredTreesCluster } from "@/../lex-api";
import { getReadAgent } from "@/server/utils/agent";
import type { SupportedPDSDomain } from "@/index";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";

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
        throw new Error("Failed to get measured trees");
      }
      validateRecordOrThrow(response.data.value, MeasuredTreesCluster);
      return response.data as GetRecordResponse<MeasuredTreesCluster.Record>;
    });
};
