import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppCertifiedLocation } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { putRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import {
  BlobRefGeneratorSchema,
  toBlobRef,
} from "@/_internal/zod-schemas/blobref";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { processGeojsonFileOrThrow } from "./utils";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.certified.location" as const;
const RESOURCE_NAME = "location" as const;

/**
 * Input schema for location update
 */
export const LocationUpdateInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  shapefile: z
    .object({
      $type: z.literal("org.hypercerts.defs#smallBlob"),
      blob: BlobRefGeneratorSchema,
    })
    .optional(),
});

export type LocationUpdateInput = z.infer<typeof LocationUpdateInputSchema>;

/**
 * Upload schema for location update
 */
export const LocationUpdateUploadsSchema = z
  .object({
    shapefile: FileGeneratorSchema.optional(),
  })
  .optional();

export type LocationUpdateUploads = z.infer<typeof LocationUpdateUploadsSchema>;

/**
 * Pure function to update a location.
 * Can be reused outside of tRPC context.
 */
export const updateLocationPure = async (
  agent: Agent,
  rkey: string,
  locationInput: LocationUpdateInput,
  uploads?: LocationUpdateUploads
): Promise<PutRecordResponse<AppCertifiedLocation.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Determine the shapefile blob
  let shapefileBlob: AppCertifiedLocation.Record["location"];

  if (uploads?.shapefile) {
    // New file uploaded - process and upload it
    const file = await toFile(uploads.shapefile);
    await processGeojsonFileOrThrow(file);

    const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
    if (uploadError !== null || uploadResponse === null) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to upload the GeoJSON file.",
        cause: uploadError,
      });
    }

    shapefileBlob = {
      $type: "org.hypercerts.defs#smallBlob",
      blob: uploadResponse.data.blob,
    };
  } else if (locationInput.shapefile) {
    // Use existing blob reference
    shapefileBlob = {
      $type: "org.hypercerts.defs#smallBlob",
      blob: toBlobRef(locationInput.shapefile.blob),
    };
  } else {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "A shapefile is required. Provide either a new file or an existing blob reference.",
    });
  }

  const location: AppCertifiedLocation.Record = {
    $type: COLLECTION,
    name: locationInput.name,
    description: locationInput.description,
    lpVersion: "1.0.0",
    srs: "https://epsg.io/3857",
    locationType: "geojson-point",
    location: shapefileBlob,
    createdAt: new Date().toISOString(),
  };

  return putRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    record: location,
    validator: AppCertifiedLocation,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for updating a location.
 */
export const updateLocationFactory = createMutationFactory(
  {
    rkey: z.string(),
    site: LocationUpdateInputSchema,
    uploads: LocationUpdateUploadsSchema,
  },
  (agent, input) => updateLocationPure(agent, input.rkey, input.site, input.uploads)
);
