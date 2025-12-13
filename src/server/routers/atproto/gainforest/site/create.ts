import { protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import { getWriteAgent } from "@/server/utils/agent";
import { AppGainforestOrganizationSite } from "@/../lex-api";
import { FileGeneratorSchema, toFile } from "@/zod-schemas/file";
import { TRPCError } from "@trpc/server";
import { computeGeojsonFile, fetchGeojsonFromUrl } from "./utils";
import type { SupportedPDSDomain } from "@/index";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";

export const createSiteFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        rkey: z.string().optional(),
        site: z.object({
          name: z.string().min(1),
        }),
        uploads: z.object({
          shapefile: z.union([z.url(), FileGeneratorSchema]),
        }),
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

      // If the site is a string, it is a URI, so fetch the file from the URI
      const file =
        typeof input.uploads.shapefile === "string" ?
          await fetchGeojsonFromUrl(input.uploads.shapefile)
        : await toFile(input.uploads.shapefile);

      const { lat, lon, area } = await computeGeojsonFile(file);

      const geojsonUploadResponse = await agent.uploadBlob(file);
      const geojsonBlobRef = geojsonUploadResponse.data.blob;

      const nsid: AppGainforestOrganizationSite.Record["$type"] =
        "app.gainforest.organization.site";
      const site: AppGainforestOrganizationSite.Record = {
        $type: nsid,
        name: input.site.name,
        lat: lat,
        lon: lon,
        area: area,
        shapefile: {
          $type: "app.gainforest.common.defs#smallBlob",
          blob: geojsonBlobRef,
        },
        createdAt: new Date().toISOString(),
      };

      validateRecordOrThrow(site, AppGainforestOrganizationSite);

      const creationResponse = await agent.com.atproto.repo.createRecord({
        collection: nsid,
        repo: agent.did,
        record: site,
        rkey: input.rkey,
      });

      if (creationResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add new site",
        });
      }

      return creationResponse.data;
    });
};
