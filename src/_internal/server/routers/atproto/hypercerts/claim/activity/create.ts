import z from "zod";
import { TRPCError } from "@trpc/server";
import type { Agent } from "@atproto/api";
import { OrgHypercertsClaimActivity } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { createRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { toBlobRef, toBlobRefGenerator } from "@/_internal/zod-schemas/blobref";
import {
  type FileGenerator,
  FileGeneratorSchema,
} from "@/_internal/zod-schemas/file";
import { StrongRefSchema } from "@/_internal/zod-schemas/strongref";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const ACTIVITY_COLLECTION = "org.hypercerts.claim.activity" as const;

/**
 * Contributor input schema matching the new lexicon structure
 */
export const ContributorInputSchema = z.object({
  identity: z.string().min(1, "Contributor identity is required"),
  weight: z.string().optional(),
  role: z.string().optional(),
});

export type ContributorInput = z.infer<typeof ContributorInputSchema>;

/**
 * Input schema for claim activity creation
 */
export const ClaimActivityInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().optional(),
  locations: StrongRefSchema.array().optional(),
  workScope: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  contributors: z.array(ContributorInputSchema).optional(),
  createdAt: z.string().optional(),
});

export type ClaimActivityInput = z.infer<typeof ClaimActivityInputSchema>;

/**
 * Upload schema for claim activity
 */
export const ClaimActivityUploadsSchema = z.object({
  image: FileGeneratorSchema.optional(),
});

export type ClaimActivityUploads = z.infer<typeof ClaimActivityUploadsSchema>;

/**
 * Helper to upload a file and return a blob ref generator
 */
const uploadFile = async (fileGenerator: FileGenerator, agent: Agent) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file);
  return toBlobRefGenerator(response.data.blob);
};

/**
 * Transform contributor input to lexicon format
 */
const transformContributors = (
  contributors: ContributorInput[]
): OrgHypercertsClaimActivity.Contributor[] => {
  return contributors.map((c) => ({
    $type: "org.hypercerts.claim.activity#contributor" as const,
    contributorIdentity: {
      $type: "org.hypercerts.claim.activity#contributorIdentity" as const,
      identity: c.identity,
    },
    contributionWeight: c.weight,
    contributionDetails: c.role
      ? {
          $type: "org.hypercerts.claim.activity#contributorRole" as const,
          role: c.role,
        }
      : undefined,
  }));
};

/**
 * Pure function to create a claim activity.
 * Can be reused outside of tRPC context.
 */
export const createClaimActivityPure = async (
  agent: Agent,
  activityInput: ClaimActivityInput,
  uploads?: ClaimActivityUploads
): Promise<PutRecordResponse<OrgHypercertsClaimActivity.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Validate ownership of referenced location records
  if (activityInput.locations) {
    for (const location of activityInput.locations) {
      if (!checkOwnershipByAtUri(location.uri, did)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "One of the locations being referenced is not owned by you.",
        });
      }
    }
  }

  // Upload the image if provided
  let imageBlob: OrgHypercertsClaimActivity.Record["image"] = undefined;
  if (uploads?.image) {
    const [imageBlobRef, uploadError] = await tryCatch(
      uploadFile(uploads.image, agent)
    );
    if (uploadError !== null || !imageBlobRef) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to upload the activity image.",
        cause: uploadError,
      });
    }
    imageBlob = {
      $type: "org.hypercerts.defs#smallImage",
      image: toBlobRef(imageBlobRef),
    };
  }

  // Build the activity record
  const activity: OrgHypercertsClaimActivity.Record = {
    $type: ACTIVITY_COLLECTION,
    title: activityInput.title,
    shortDescription: activityInput.shortDescription,
    description: activityInput.description,
    image: imageBlob,
    locations: activityInput.locations,
    workScope: activityInput.workScope
      ? {
          $type: "org.hypercerts.claim.activity#workScopeString",
          scope: activityInput.workScope,
        }
      : undefined,
    startDate: activityInput.startDate,
    endDate: activityInput.endDate,
    contributors: activityInput.contributors
      ? transformContributors(activityInput.contributors)
      : undefined,
    createdAt: activityInput.createdAt ?? new Date().toISOString(),
  };

  return createRecord({
    agent,
    collection: ACTIVITY_COLLECTION,
    repo: did,
    record: activity,
    validator: OrgHypercertsClaimActivity,
    resourceName: "claim activity",
  });
};

/**
 * Factory to create the tRPC procedure for creating a claim activity.
 */
export const createClaimActivityFactory = createMutationFactory(
  {
    activity: ClaimActivityInputSchema,
    uploads: ClaimActivityUploadsSchema.optional(),
  },
  (agent, input) => createClaimActivityPure(agent, input.activity, input.uploads)
);
