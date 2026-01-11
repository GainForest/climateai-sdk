import { protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { AppCertifiedLocation } from "@/../lex-api";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { TRPCError } from "@trpc/server";
import { processGeojsonFileOrThrow, fetchGeojsonFromUrl } from "./utils";
import type { SupportedPDSDomain } from "@/_internal/index";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";

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

      // Check if the file is > 1MB
      const tenMBs = 10 * 1024 * 1024;
      if (file.size > tenMBs) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The GeoJSON file is too large. It must be less than 10MB.",
        });
      }

      // Process the GeoJSON file, and throw TRPCError if the file is invalid
      await processGeojsonFileOrThrow(file);

      const geojsonUploadResponse = await agent.uploadBlob(file);
      const geojsonBlobRef = geojsonUploadResponse.data.blob;

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
          blob: geojsonBlobRef,
        },
        createdAt: new Date().toISOString(),
      };

      validateRecordOrThrow(site, AppCertifiedLocation);

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
