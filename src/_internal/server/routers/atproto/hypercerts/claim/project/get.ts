import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";

export const getProjectFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        did: z.string(),
        rkey: z.string(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .query(async ({ input }) => {
      const agent = getReadAgent(input.pdsDomain);
      const nsid: OrgHypercertsClaimProject.Record["$type"] =
        "org.hypercerts.claim.project";
      const response = await agent.com.atproto.repo.getRecord({
        collection: nsid,
        repo: input.did,
        rkey: input.rkey,
      });
      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get the project",
        });
      }
      const validatedRecord =
        validateRecordOrThrow<OrgHypercertsClaimProject.Record>(
          response.data.value,
          OrgHypercertsClaimProject
        );

      response.data = {
        ...response.data,
        value: validatedRecord,
      };

      return response.data as GetRecordResponse<OrgHypercertsClaimProject.Record>;
    });
};
