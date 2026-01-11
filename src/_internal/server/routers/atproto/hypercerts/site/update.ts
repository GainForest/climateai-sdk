import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { AppCertifiedLocation } from "@/../lex-api";
import {
  BlobRefGeneratorSchema,
  toBlobRef,
} from "@/_internal/zod-schemas/blobref";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { TRPCError } from "@trpc/server";
import { processGeojsonFileOrThrow, fetchGeojsonFromUrl } from "./utils";
import type { SupportedPDSDomain } from "@/_internal/index";
import {
  type SmallBlob,
  type Uri,
} from "@/../lex-api/types/app/gainforest/common/defs";
import type { $Typed } from "@/../lex-api/util";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";

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
            .object({
              $type: z.literal("app.gainforest.common.defs#smallBlob"),
              blob: BlobRefGeneratorSchema,
            })
            .optional(),
        }),
        uploads: z
          .object({
            shapefile: FileGeneratorSchema.optional(),
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
        } else {
          file = await toFile(input.uploads.shapefile);
        }
      }

      // Compute the lat, lon, and area from the shapefile
      let lat: string;
      let lon: string;
      let area: string;
      let shapefile: SmallBlob;
      if (file !== null) {
        await processGeojsonFileOrThrow(file);
        const geojsonUploadResponse = await agent.uploadBlob(file);
        shapefile = {
          $type: "app.gainforest.common.defs#smallBlob",
          blob: geojsonUploadResponse.data.blob,
        };
      } else if (input.site.shapefile) {
        shapefile = {
          $type: "app.gainforest.common.defs#smallBlob",
          blob: toBlobRef(input.site.shapefile.blob),
        };
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No shapefile provided",
        });
      }

      const nsid: AppCertifiedLocation.Record["$type"] =
        "app.certified.location";
      const site: AppCertifiedLocation.Record = {
        $type: nsid,
        name: input.site.name,
        lpVersion: "1.0.0",
        srs: "https://epsg.io/3857",
        locationType: "geojson-point",
        location: {
          $type: "org.hypercerts.defs#smallBlob",
          blob: shapefile.blob,
        },
        createdAt: new Date().toISOString(),
      };

      validateRecordOrThrow(site, AppCertifiedLocation);

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
