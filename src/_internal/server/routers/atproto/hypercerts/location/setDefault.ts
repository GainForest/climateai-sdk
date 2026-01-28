import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import {
  AppGainforestOrganizationDefaultSite,
  AppCertifiedLocation,
} from "@/../lex-api";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { TRPCError } from "@trpc/server";
import { parseAtUri } from "@/_internal/utilities/atproto";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";

export const setDefaultLocationFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        locationAtUri: z.string(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const agent = await getWriteAgent(input.pdsDomain);
      if (!agent.did) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authenticated",
        });
      }

      const locationUri = input.locationAtUri;
      const siteNSID: AppCertifiedLocation.Record["$type"] =
        "app.certified.location";
      if (!(locationUri.startsWith(`at://`) && locationUri.includes(siteNSID))) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid location URI",
        });
      }

      const site = await agent.com.atproto.repo.getRecord({
        collection: siteNSID,
        repo: agent.did,
        rkey: parseAtUri(locationUri).rkey,
      });
      if (site.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get location",
        });
      }

      const defaultSiteNSID: AppGainforestOrganizationDefaultSite.Record["$type"] =
        "app.gainforest.organization.defaultSite";
      const defaultSite: AppGainforestOrganizationDefaultSite.Record = {
        $type: defaultSiteNSID,
        site: locationUri,
        createdAt: new Date().toISOString(),
      };
      validateRecordOrThrow(defaultSite, AppGainforestOrganizationDefaultSite);
      const updateDefaultSiteResponse = await agent.com.atproto.repo.putRecord({
        collection: defaultSiteNSID,
        repo: agent.did,
        rkey: "self",
        record: defaultSite,
      });

      if (updateDefaultSiteResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update default site",
        });
      }

      return updateDefaultSiteResponse.data;
    });
};
