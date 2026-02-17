import z from "zod";
import { TRPCError } from "@trpc/server";
import { OrgHypercertsClaimCollection } from "@/../lex-api";
import { createOrUpdateRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import {
  BlobRefGeneratorSchema,
  FileGeneratorSchema,
  toBlobRef,
  toFile,
  LinearDocumentSchema,
  toLinearDocument,
} from "@/_internal/zod-schemas";
import { CollectionItemSchema } from "@/_internal/zod-schemas/activity-weight";
import { StrongRefSchema } from "@/_internal/zod-schemas/strongref";
import { uploadFileAsBlobPure } from "../../../common/uploadFileAsBlob";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.collection" as const;
const RESOURCE_NAME = "collection" as const;

/**
 * Input schema for collection creation/update
 */
export const CollectionInputSchema = z.object({
  type: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().optional(),
  description: LinearDocumentSchema.optional(),
  avatar: BlobRefGeneratorSchema.optional(),
  banner: BlobRefGeneratorSchema.optional(),
  items: z.array(CollectionItemSchema).min(1, "At least one item is required"),
  location: StrongRefSchema.optional(),
  createdAt: z.string().optional(),
});

export type CollectionInput = z.infer<typeof CollectionInputSchema>;

/**
 * Upload schema for collection
 */
export const CollectionUploadsSchema = z.object({
  avatar: FileGeneratorSchema.optional(),
  banner: FileGeneratorSchema.optional(),
});

export type CollectionUploads = z.infer<typeof CollectionUploadsSchema>;

/**
 * Pure function to create or update a collection.
 * Can be reused outside of tRPC context.
 */
export const createOrUpdateCollectionPure = async (
  agent: Agent,
  did: string,
  collectionInput: CollectionInput,
  uploads: CollectionUploads,
  rkey?: string
): Promise<PutRecordResponse<OrgHypercertsClaimCollection.Record>> => {
  if (!agent.did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Convert description to lex-api format if provided
  const descriptionLinearDocument = collectionInput.description
    ? toLinearDocument(collectionInput.description)
    : undefined;

  // Upload images if provided
  const avatarBlob = uploads.avatar
    ? {
        $type: "org.hypercerts.defs#smallImage" as const,
        image: (await uploadFileAsBlobPure(await toFile(uploads.avatar), agent)).blob,
      }
    : collectionInput.avatar
      ? {
          $type: "org.hypercerts.defs#smallImage" as const,
          image: toBlobRef(collectionInput.avatar),
        }
      : undefined;

  const bannerBlob = uploads.banner
    ? {
        $type: "org.hypercerts.defs#largeImage" as const,
        image: (await uploadFileAsBlobPure(await toFile(uploads.banner), agent)).blob,
      }
    : collectionInput.banner
      ? {
          $type: "org.hypercerts.defs#largeImage" as const,
          image: toBlobRef(collectionInput.banner),
        }
      : undefined;

  // Transform items to proper format
  const items: OrgHypercertsClaimCollection.Item[] = collectionInput.items.map((item) => ({
    $type: "org.hypercerts.claim.collection#item" as const,
    itemIdentifier: item.itemIdentifier,
    itemWeight: item.itemWeight,
  }));

  const collection: OrgHypercertsClaimCollection.Record = {
    $type: COLLECTION,
    type: collectionInput.type,
    title: collectionInput.title,
    shortDescription: collectionInput.shortDescription,
    description: descriptionLinearDocument,
    avatar: avatarBlob,
    banner: bannerBlob,
    items,
    location: collectionInput.location,
    createdAt: collectionInput.createdAt ?? new Date().toISOString(),
  };

  return createOrUpdateRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    record: collection,
    validator: OrgHypercertsClaimCollection,
    resourceName: RESOURCE_NAME,
    rkey,
  });
};

/**
 * Factory to create the tRPC procedure for creating/updating a collection.
 */
export const createOrUpdateCollectionFactory = createMutationFactory(
  {
    collection: CollectionInputSchema,
    uploads: CollectionUploadsSchema,
    rkey: z.string().optional(),
  },
  (agent, input) =>
    createOrUpdateCollectionPure(
      agent,
      input.did,
      input.collection,
      input.uploads,
      input.rkey
    )
);

// Backwards compatibility exports
export const ProjectInputSchema = CollectionInputSchema;
export type ProjectInput = CollectionInput;
export const ProjectUploadsSchema = CollectionUploadsSchema;
export type ProjectUploads = CollectionUploads;
export const createOrUpdateProjectPure = createOrUpdateCollectionPure;
export const createOrUpdateProjectFactory = createOrUpdateCollectionFactory;
