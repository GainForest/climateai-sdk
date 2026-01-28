import z from "zod";
import {
  AppGainforestOrganizationInfo,
  AppBskyRichtextFacet,
  PubLeafletPagesLinearDocument,
  PubLeafletBlocksText,
} from "@/../lex-api";
import { putRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { FileGeneratorSchema } from "@/_internal/zod-schemas/file";
import {
  BlobRefGeneratorSchema,
  toBlobRef,
} from "@/_internal/zod-schemas/blobref";
import { uploadFileAsBlobPure } from "../../../common/uploadFileAsBlob";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import type { Agent } from "@atproto/api";

const COLLECTION = "app.gainforest.organization.info" as const;
const RESOURCE_NAME = "organization info" as const;

/**
 * Zod schema for organization objectives
 */
export const ObjectivesSchema = z.enum([
  "Conservation",
  "Research",
  "Education",
  "Community",
  "Other",
]);

export type Objective = z.infer<typeof ObjectivesSchema>;

/**
 * Zod schema for visibility setting
 */
export const VisibilitySchema = z.enum(["Public", "Unlisted"]);

export type Visibility = z.infer<typeof VisibilitySchema>;

/**
 * Input schema for organization info
 */
export const OrganizationInfoInputSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  website: z.string().url("Website must be a valid URL").optional(),
  logo: BlobRefGeneratorSchema.optional(),
  coverImage: BlobRefGeneratorSchema.optional(),
  objectives: z.array(ObjectivesSchema).min(1, "At least one objective is required"),
  startDate: z.string().datetime().optional(),
  country: z.string().min(1, "Country is required"),
  visibility: VisibilitySchema,
  createdAt: z.string().datetime().optional(),
});

export type OrganizationInfoInput = z.infer<typeof OrganizationInfoInputSchema>;

/**
 * Upload schema for optional file uploads
 */
export const OrganizationInfoUploadsSchema = z.object({
  logo: FileGeneratorSchema.optional(),
  coverImage: FileGeneratorSchema.optional(),
});

export type OrganizationInfoUploads = z.infer<typeof OrganizationInfoUploadsSchema>;

/**
 * Pure function to create or update organization info.
 * Can be reused outside of tRPC context.
 */
export const createOrUpdateOrganizationInfoPure = async (
  agent: Agent,
  did: string,
  infoInput: OrganizationInfoInput,
  uploads?: OrganizationInfoUploads
): Promise<PutRecordResponse<AppGainforestOrganizationInfo.Record>> => {
  // Handle logo blob
  const logoBlob =
    uploads?.logo
      ? (await uploadFileAsBlobPure(uploads.logo, agent)).blob
      : infoInput.logo
        ? toBlobRef(infoInput.logo)
        : undefined;

  // Handle cover image blob
  const coverImageBlob =
    uploads?.coverImage
      ? (await uploadFileAsBlobPure(uploads.coverImage, agent)).blob
      : infoInput.coverImage
        ? toBlobRef(infoInput.coverImage)
        : undefined;

  // Build shortDescription as richtext facet
  const shortDescription: AppBskyRichtextFacet.Main = {
    $type: "app.bsky.richtext.facet",
    index: {
      $type: "app.bsky.richtext.facet#byteSlice",
      byteStart: 0,
      byteEnd: Buffer.byteLength(infoInput.shortDescription, "utf8"),
    },
    features: [],
  };

  // Build longDescription as linear document
  const longDescription: PubLeafletPagesLinearDocument.Main = {
    $type: "pub.leaflet.pages.linearDocument",
    blocks: [
      {
        $type: "pub.leaflet.pages.linearDocument#block",
        block: {
          $type: "pub.leaflet.blocks.text",
          plaintext: infoInput.longDescription,
        } satisfies PubLeafletBlocksText.Main,
      } satisfies PubLeafletPagesLinearDocument.Block,
    ],
  };

  const info: AppGainforestOrganizationInfo.Record = {
    $type: COLLECTION,
    displayName: infoInput.displayName,
    shortDescription,
    longDescription,
    website: infoInput.website,
    logo: logoBlob
      ? { $type: "org.hypercerts.defs#smallImage", image: logoBlob }
      : undefined,
    coverImage: coverImageBlob
      ? { $type: "org.hypercerts.defs#smallImage", image: coverImageBlob }
      : undefined,
    objectives: infoInput.objectives,
    startDate: infoInput.startDate,
    country: infoInput.country,
    visibility: infoInput.visibility,
    createdAt: infoInput.createdAt ?? new Date().toISOString(),
  };

  return putRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey: "self",
    record: info,
    validator: AppGainforestOrganizationInfo,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for creating/updating organization info.
 */
export const createOrUpdateOrganizationInfoFactory = createMutationFactory(
  {
    info: OrganizationInfoInputSchema,
    uploads: OrganizationInfoUploadsSchema.optional(),
  },
  (agent, input) =>
    createOrUpdateOrganizationInfoPure(agent, input.did, input.info, input.uploads)
);
