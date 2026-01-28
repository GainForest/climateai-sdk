import { publicProcedure } from "@/_internal/server/trpc";
import z from "zod";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { AppGainforestOrganizationDefaultSite } from "@/../lex-api";
import { getReadAgent } from "@/_internal/server/utils/agent";
import type { SupportedPDSDomain } from "@/_internal/index";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";

export const getDefaultLocationFactory = <T extends SupportedPDSDomain>(
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
        throw new Error("Failed to get default location");
      }
      validateRecordOrThrow(
        response.data.value,
        AppGainforestOrganizationDefaultSite
      );
      return response.data as GetRecordResponse<AppGainforestOrganizationDefaultSite.Record>;
    });
};
