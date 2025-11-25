import { publicProcedure } from "@/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/server/utils/agent";
import { AppGainforestOrganizationSite } from "@/../lex-api";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/index";
import type { GetRecordResponse } from "@/server/utils/response-types";

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
        collection: "app.gainforest.organization.site",
        repo: input.did,
        rkey: input.rkey,
      });
      if (response.success !== true) {
        throw new Error("Failed to get the site.");
      }
      validateRecordOrThrow(response.data.value, AppGainforestOrganizationSite);
      return response.data as GetRecordResponse<AppGainforestOrganizationSite.Record>;
    });
};
