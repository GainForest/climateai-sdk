import z from "zod";
import { TRPCError } from "@trpc/server";
import {
  OrgHypercertsClaimProject,
  PubLeafletBlocksText,
  PubLeafletPagesLinearDocument,
} from "@/../lex-api";
import { createOrUpdateRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import {
  BlobRefGeneratorSchema,
  FileGeneratorSchema,
  toBlobRef,
  toFile,
} from "@/_internal/zod-schemas";
import { ActivityWeightSchema } from "@/_internal/zod-schemas/activity-weight";
import { StrongRefSchema } from "@/_internal/zod-schemas/strongref";
import { uploadFileAsBlobPure } from "../../../common/uploadFileAsBlob";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.project" as const;
const RESOURCE_NAME = "project" as const;

/**
 * Input schema for project creation/update
 */
export const ProjectInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().optional(),
  avatar: BlobRefGeneratorSchema.optional(),
  coverPhoto: BlobRefGeneratorSchema.optional(),
  activities: z.array(ActivityWeightSchema).optional(),
  location: StrongRefSchema.optional(),
  createdAt: z.string().optional(),
});

export type ProjectInput = z.infer<typeof ProjectInputSchema>;

/**
 * Upload schema for project
 */
export const ProjectUploadsSchema = z.object({
  avatar: FileGeneratorSchema.optional(),
  coverPhoto: FileGeneratorSchema.optional(),
});

export type ProjectUploads = z.infer<typeof ProjectUploadsSchema>;

/**
 * Pure function to create or update a project.
 * Can be reused outside of tRPC context.
 */
export const createOrUpdateProjectPure = async (
  agent: Agent,
  did: string,
  projectInput: ProjectInput,
  uploads: ProjectUploads,
  rkey?: string
): Promise<PutRecordResponse<OrgHypercertsClaimProject.Record>> => {
  if (!agent.did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Build description as linear document if provided
  const descriptionLinearDocument: PubLeafletPagesLinearDocument.Main | undefined =
    projectInput.description
      ? {
          $type: "pub.leaflet.pages.linearDocument",
          blocks: [
            {
              $type: "pub.leaflet.pages.linearDocument#block",
              block: {
                $type: "pub.leaflet.blocks.text",
                plaintext: projectInput.description,
              } satisfies PubLeafletBlocksText.Main,
            } satisfies PubLeafletPagesLinearDocument.Block,
          ],
        }
      : undefined;

  // Upload images if provided
  const avatarBlob = uploads.avatar
    ? (await uploadFileAsBlobPure(await toFile(uploads.avatar), agent)).blob
    : projectInput.avatar
      ? toBlobRef(projectInput.avatar)
      : undefined;

  const coverPhotoBlob = uploads.coverPhoto
    ? (await uploadFileAsBlobPure(await toFile(uploads.coverPhoto), agent)).blob
    : projectInput.coverPhoto
      ? toBlobRef(projectInput.coverPhoto)
      : undefined;

  const project: OrgHypercertsClaimProject.Record = {
    $type: COLLECTION,
    title: projectInput.title,
    shortDescription: projectInput.shortDescription,
    description: descriptionLinearDocument,
    avatar: avatarBlob,
    coverPhoto: coverPhotoBlob,
    activities: projectInput.activities,
    location: projectInput.location,
    createdAt: projectInput.createdAt ?? new Date().toISOString(),
  };

  return createOrUpdateRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    record: project,
    validator: OrgHypercertsClaimProject,
    resourceName: RESOURCE_NAME,
    rkey,
  });
};

/**
 * Factory to create the tRPC procedure for creating/updating a project.
 */
export const createOrUpdateProjectFactory = createMutationFactory(
  {
    project: ProjectInputSchema,
    uploads: ProjectUploadsSchema,
    rkey: z.string().optional(),
  },
  (agent, input) =>
    createOrUpdateProjectPure(
      agent,
      input.did,
      input.project,
      input.uploads,
      input.rkey
    )
);
