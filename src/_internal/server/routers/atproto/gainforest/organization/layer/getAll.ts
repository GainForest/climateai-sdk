import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationLayer } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { TRPCError } from "@trpc/server";

export const getAllLayersFactory = <T extends SupportedPDSDomain>(
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
      const nsid: AppGainforestOrganizationLayer.Record["$type"] =
        "app.gainforest.organization.layer";
      const response = await agent.com.atproto.repo.listRecords({
        collection: nsid,
        repo: input.did,
      });
      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get the layers",
        });
      }

      const validatedRecords = response.data.records
        .map((record) => {
          let validatedRecord;
          try {
            validatedRecord =
              validateRecordOrThrow<AppGainforestOrganizationLayer.Record>(
                record.value,
                AppGainforestOrganizationLayer
              );
          } catch (error) {
            return null;
          }
          return {
            ...record,
            value: validatedRecord,
          };
        })
        .filter((record) => record !== null);

      return validatedRecords.map((record) => ({
        uri: record.uri,
        cid: record.cid,
        value: record.value,
      })) satisfies GetRecordResponse<AppGainforestOrganizationLayer.Record>[];
    });
};
