import z from "zod";
import { TRPCError } from "@trpc/server";
import type { Agent } from "@atproto/api";
import {
  OrgHypercertsClaimActivity,
  OrgHypercertsClaimContribution,
} from "@/../lex-api";
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
const CONTRIBUTION_COLLECTION = "org.hypercerts.claim.contribution" as const;

/**
 * Input schema for claim activity creation
 */
export const ClaimActivityInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().optional(),
  locations: StrongRefSchema.array().min(1, "At least one location is required"),
  project: z.string().optional(),
  workScopes: z.array(z.string()).min(1, "At least one work scope is required"),
  startDate: z.string(),
  endDate: z.string(),
  contributors: z
    .array(z.string())
    .min(1, "At least one contributor is required"),
  createdAt: z.string().optional(),
});

export type ClaimActivityInput = z.infer<typeof ClaimActivityInputSchema>;

/**
 * Upload schema for claim activity
 */
export const ClaimActivityUploadsSchema = z.object({
  image: FileGeneratorSchema,
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
 * Pure function to create a claim activity with contribution.
 * Can be reused outside of tRPC context.
 */
export const createClaimActivityPure = async (
  agent: Agent,
  activityInput: ClaimActivityInput,
  uploads: ClaimActivityUploads
): Promise<PutRecordResponse<OrgHypercertsClaimActivity.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Validate ownership of referenced records
  for (const location of activityInput.locations) {
    if (!checkOwnershipByAtUri(location.uri, did)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "One of the locations being referenced is not owned by you.",
      });
    }
  }

  if (activityInput.project) {
    if (!checkOwnershipByAtUri(activityInput.project, did)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "The project being referenced is not owned by you.",
      });
    }
  }

  // Upload the image
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

  // Create the activity record
  const activity: OrgHypercertsClaimActivity.Record = {
    $type: ACTIVITY_COLLECTION,
    title: activityInput.title,
    shortDescription: activityInput.shortDescription,
    description: activityInput.description,
    image: {
      $type: "org.hypercerts.defs#smallImage",
      image: toBlobRef(imageBlobRef),
    },
    location: activityInput.locations,
    project: activityInput.project,
    workScope: {
      $type: "org.hypercerts.claim.activity#workScope",
      withinAnyOf: activityInput.workScopes,
    },
    startDate: activityInput.startDate,
    endDate: activityInput.endDate,
    createdAt: activityInput.createdAt ?? new Date().toISOString(),
  };

  const activityResult = await createRecord({
    agent,
    collection: ACTIVITY_COLLECTION,
    repo: did,
    record: activity,
    validator: OrgHypercertsClaimActivity,
    resourceName: "claim activity",
  });

  // Create the contribution record
  const contribution: OrgHypercertsClaimContribution.Record = {
    $type: CONTRIBUTION_COLLECTION,
    hypercert: {
      $type: "com.atproto.repo.strongRef",
      uri: activityResult.uri,
      cid: activityResult.cid,
    },
    role: "Contributor",
    contributors: activityInput.contributors,
    createdAt: new Date().toISOString(),
  };

  const [, contributionError] = await tryCatch(
    createRecord({
      agent,
      collection: CONTRIBUTION_COLLECTION,
      repo: did,
      record: contribution,
      validator: OrgHypercertsClaimContribution,
      resourceName: "contribution",
    })
  );

  if (contributionError !== null) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create the contribution record.",
      cause: contributionError,
    });
  }

  return activityResult;
};

/**
 * Factory to create the tRPC procedure for creating a claim activity.
 */
export const createClaimActivityFactory = createMutationFactory(
  {
    activity: ClaimActivityInputSchema,
    uploads: ClaimActivityUploadsSchema,
  },
  (agent, input) => createClaimActivityPure(agent, input.activity, input.uploads)
);
