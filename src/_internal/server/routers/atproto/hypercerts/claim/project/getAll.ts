import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";

export const getAllProjectsFactory = <T extends SupportedPDSDomain>(
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
      const nsid: OrgHypercertsClaimProject.Record["$type"] =
        "org.hypercerts.claim.project";
      const response = await agent.com.atproto.repo.listRecords({
        collection: nsid,
        repo: input.did,
      });
      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get the projects",
        });
      }

      const ownershipCheckedRecords = response.data.records
        .map((record) => {
          let validatedRecord;
          try {
            validatedRecord =
              validateRecordOrThrow<OrgHypercertsClaimProject.Record>(
                record.value,
                OrgHypercertsClaimProject
              );
          } catch (error) {
            return null;
          }
          return {
            uri: record.uri,
            cid: record.cid,
            value: validatedRecord,
          };
        })
        .filter((record) => record !== null);

      return ownershipCheckedRecords satisfies GetRecordResponse<OrgHypercertsClaimProject.Record>[];
    });
};
