import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppCertifiedLocation } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";

export const getSiteFactory = <T extends SupportedPDSDomain>(
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
      const response = await agent.com.atproto.repo.getRecord({
        collection: "app.certified.location",
        repo: input.did,
        rkey: input.rkey,
      });
      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get the site",
        });
      }
      validateRecordOrThrow(response.data.value, AppCertifiedLocation);
      return response.data as GetRecordResponse<AppCertifiedLocation.Record>;
    });
};
