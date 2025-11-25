import { protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import { getWriteAgent } from "@/server/utils/agent";
import { AppGainforestOrganizationSite } from "@/../lex-api";
import { BlobRefGeneratorSchema, toBlobRef } from "@/zod-schemas/blobref";
import { FileGeneratorSchema, toFile } from "@/zod-schemas/file";
import { TRPCError } from "@trpc/server";
import { computeGeojsonFile, fetchGeojsonFromUrl } from "./utils";
import type { SupportedPDSDomain } from "@/index";
import {
  type SmallBlob,
  type Uri,
} from "@/../lex-api/types/app/gainforest/common/defs";
import type { $Typed } from "@/../lex-api/util";

export const updateSiteFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        rkey: z.string(),
        site: z.object({
          name: z.string().min(1),
          shapefile: z
            .union([
              z.object({
                $type: z.literal("app.gainforest.common.defs#smallBlob"),
                blob: BlobRefGeneratorSchema,
              }),
              z.object({
                $type: z.literal("app.gainforest.common.defs#uri"),
                uri: z.string(),
              }),
            ])
            .optional(),
          lat: z.string(),
          lon: z.string(),
          area: z.string(),
        }),
        uploads: z
          .object({
            shapefile: z.union([z.url(), FileGeneratorSchema]).optional(),
          })
          .optional(),
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

      let file: File | null = null;
      // Upload the shapefile if provided
      if (input.uploads) {
        if (input.uploads.shapefile === undefined) {
          file = null;
        } else if (typeof input.uploads.shapefile === "string") {
          file = await fetchGeojsonFromUrl(input.uploads.shapefile);
        } else {
          file = await toFile(input.uploads.shapefile);
        }
      }

      // Compute the lat, lon, and area from the shapefile
      let lat: string;
      let lon: string;
      let area: string;
      let shapefile: $Typed<Uri> | $Typed<SmallBlob> | undefined;
      if (file !== null) {
        const computed = await computeGeojsonFile(file);
        const geojsonUploadResponse = await agent.uploadBlob(file);
        shapefile = {
          $type: "app.gainforest.common.defs#smallBlob",
          blob: geojsonUploadResponse.data.blob,
        };
        lat = computed.lat;
        lon = computed.lon;
        area = computed.area;
      } else if (input.site.shapefile) {
        shapefile =
          (
            input.site.shapefile.$type ===
            "app.gainforest.common.defs#smallBlob"
          ) ?
            {
              $type: "app.gainforest.common.defs#smallBlob",
              blob: toBlobRef(input.site.shapefile.blob),
            }
          : input.site.shapefile;
        lat = input.site.lat;
        lon = input.site.lon;
        area = input.site.area;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No shapefile provided",
        });
      }

      const nsid: AppGainforestOrganizationSite.Record["$type"] =
        "app.gainforest.organization.site";
      const site: AppGainforestOrganizationSite.Record = {
        $type: nsid,
        name: input.site.name,
        lat: lat,
        lon: lon,
        area: area,
        shapefile,
      };

      const validationResult =
        AppGainforestOrganizationSite.validateRecord(site);
      if (!validationResult.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validationResult.error.message,
        });
      }

      const updateResponse = await agent.com.atproto.repo.putRecord({
        collection: nsid,
        repo: agent.did,
        record: site,
        rkey: input.rkey,
      });

      if (updateResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update site",
        });
      }

      return updateResponse.data;
    });
};
