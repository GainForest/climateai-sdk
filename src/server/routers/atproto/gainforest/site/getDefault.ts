import { publicProcedure } from "@/server/trpc";
import z from "zod";
import type { GetRecordResponse } from "@/server/utils/response-types";
import { AppGainforestOrganizationDefaultSite } from "@/../lex-api";
import { getReadAgent } from "@/server/utils/agent";
import type { SupportedPDSDomain } from "@/index";

export const getDefaultProjectSiteFactory = <T extends SupportedPDSDomain>(
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
      const response = await agent.com.atproto.repo.getRecord({
        collection: "app.gainforest.organization.defaultSite",
        repo: input.did,
        rkey: "self",
      });
      if (response.success !== true) {
        throw new Error("Failed to get default project site");
      }
      return response.data as GetRecordResponse<AppGainforestOrganizationDefaultSite.Record>;
    });
};
