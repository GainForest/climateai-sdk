import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationProject } from "@/../lex-api";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { TRPCError } from "@trpc/server";
import { filterProjectByOwnership } from "./utils";

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
      const nsid: AppGainforestOrganizationProject.Record["$type"] =
        "app.gainforest.organization.project";
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
        validateRecordOrThrow<AppGainforestOrganizationProject.Record>(
          response.data.value,
          AppGainforestOrganizationProject
        );

      const ownershipCheckedRecord = filterProjectByOwnership(
        validatedRecord,
        input.did
      );

      response.data = {
        ...response.data,
        value: ownershipCheckedRecord,
      };

      return response.data as GetRecordResponse<AppGainforestOrganizationProject.Record>;
    });
};
