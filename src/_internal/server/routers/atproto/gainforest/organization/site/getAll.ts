import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  AppGainforestOrganizationDefaultSite,
  AppGainforestOrganizationSite,
} from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { XRPCError } from "@atproto/xrpc";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { xrpcErrorToTRPCError } from "@/_internal/server/utils/classify-xrpc-error";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

export const getAllSitesFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(z.object({ did: z.string(), pdsDomain: allowedPDSDomainSchema }))
    .query(async ({ input }) => {
      const agent = getReadAgent(input.pdsDomain);
      const listSitesTryCatchPromise = tryCatch(
        agent.com.atproto.repo.listRecords({
          collection: "app.gainforest.organization.site",
          repo: input.did,
        })
      );
      const getDefaultSiteTryCatchPromise = tryCatch(
        agent.com.atproto.repo.getRecord({
          collection: "app.gainforest.organization.defaultSite",
          repo: input.did,
          rkey: "self",
        })
      );

      const [
        [listSitesResponse, errorListSites],
        [getDefaultSiteResponse, errorGetDefaultSite],
      ] = await Promise.all([
        listSitesTryCatchPromise,
        getDefaultSiteTryCatchPromise,
      ]);

      if (errorListSites) {
        if (errorListSites instanceof XRPCError) {
          const trpcError = xrpcErrorToTRPCError(errorListSites);
          throw trpcError;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred.",
        });
      } else if (listSitesResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred.",
        });
      }

      const validRecords = listSitesResponse.data.records
        .map((record) => {
          try {
            validateRecordOrThrow(record.value, AppGainforestOrganizationSite);
            return record;
          } catch {
            return null;
          }
        })
        .filter(
          (record) => record !== null
        ) as GetRecordResponse<AppGainforestOrganizationSite.Record>[];

      let defaultSite = null;
      if (getDefaultSiteResponse) {
        defaultSite =
          getDefaultSiteResponse.data as GetRecordResponse<AppGainforestOrganizationDefaultSite.Record>;
        try {
          validateRecordOrThrow(
            defaultSite.value,
            AppGainforestOrganizationDefaultSite
          );
        } catch {
          defaultSite = null;
        }
      }

      return {
        sites: validRecords,
        defaultSite,
      };
    });
};
