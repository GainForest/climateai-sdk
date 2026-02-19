import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppCertifiedLocation } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { createRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { processGeojsonFileOrThrow, fetchGeojsonFromUrl } from "./utils";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.certified.location" as const;
const RESOURCE_NAME = "location" as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Input schema for location creation
 */
export const LocationInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type LocationInput = z.infer<typeof LocationInputSchema>;

/**
 * Upload schema for location creation
 */
export const LocationUploadsSchema = z.object({
  shapefile: z.union([z.string().url(), FileGeneratorSchema]),
});

export type LocationUploads = z.infer<typeof LocationUploadsSchema>;

/**
 * Pure function to create a location.
 * Can be reused outside of tRPC context.
 */
export const createLocationPure = async (
  agent: Agent,
  locationInput: LocationInput,
  uploads: LocationUploads,
  rkey?: string
): Promise<PutRecordResponse<AppCertifiedLocation.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Fetch or convert the shapefile
  const file =
    typeof uploads.shapefile === "string"
      ? await fetchGeojsonFromUrl(uploads.shapefile)
      : await toFile(uploads.shapefile);

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The GeoJSON file is too large. It must be less than 10MB.",
    });
  }

  // Process and validate the GeoJSON file
  await processGeojsonFileOrThrow(file);

  // Upload the blob
  const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
  if (uploadError !== null || uploadResponse === null) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload the GeoJSON file.",
      cause: uploadError,
    });
  }

  const location: AppCertifiedLocation.Record = {
    $type: COLLECTION,
    name: locationInput.name,
    description: locationInput.description,
    lpVersion: "1.0.0",
    srs: "https://epsg.io/3857",
    locationType: "geojson-point",
    location: {
      $type: "org.hypercerts.defs#smallBlob",
      blob: uploadResponse.data.blob,
    },
    createdAt: new Date().toISOString(),
  };

  return createRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    record: location,
    validator: AppCertifiedLocation,
    resourceName: RESOURCE_NAME,
    rkey,
  });
};

/**
 * Factory to create the tRPC procedure for creating a location.
 */
export const createLocationFactory = createMutationFactory(
  {
    site: LocationInputSchema,
    uploads: LocationUploadsSchema,
    rkey: z.string().optional(),
  },
  (agent, input) => createLocationPure(agent, input.site, input.uploads, input.rkey)
);
