import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { Agent } from "@atproto/api";
import {
  AppCertifiedLocation,
  OrgHypercertsClaimActivity,
  OrgHypercertsClaimContribution,
} from "@/../lex-api";
import { toBlobRef, toBlobRefGenerator } from "@/_internal/zod-schemas/blobref";
import {
  type FileGenerator,
  FileGeneratorSchema,
} from "@/_internal/zod-schemas/file";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import { StrongRefSchema } from "@/_internal/zod-schemas/strongref";
import { createLinearDocument } from "@/_internal/server/utils/linear-document";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";

const uploadFile = async (fileGenerator: FileGenerator, agent: Agent) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file);
  return toBlobRefGenerator(response.data.blob);
};

export const createClaimActivityFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        activity: z.object({
          title: z.string(),
          shortDescription: z.string(),
          description: z.string().optional(),
          locations: StrongRefSchema.array(),
          project: z.string().optional(),
          workScopes: z.array(z.string()),
          startDate: z.string(),
          endDate: z.string(),
          contributors: z.array(z.string()).refine((v) => v.length > 0, {
            message: "At least one contributor is required",
          }),
          createdAt: z.string().optional(),
        }),
        uploads: z.object({
          image: FileGeneratorSchema,
        }),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const agent = await getWriteAgent(input.pdsDomain);
      const did = agent.did;
      if (!did) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });
      }

      // Activity record
      const activityNSID = "org.hypercerts.claim.activity";
      const activity: OrgHypercertsClaimActivity.Record = {
        $type: activityNSID,
        title: input.activity.title,
        shortDescription: input.activity.shortDescription,
        description: input.activity.description,
        // These will be set later in the function:
        image: undefined,
        contributions: undefined,
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        location: input.activity.locations,
        project: input.activity.project,
        workScope: {
          $type: "org.hypercerts.claim.activity#workScope",
          withinAnyOf: input.activity.workScopes,
        },
        startDate: input.activity.startDate,
        endDate: input.activity.endDate,
        createdAt: new Date().toISOString(),
      };
      const validatedActivity = validateRecordOrThrow(
        activity,
        OrgHypercertsClaimActivity
      );

      // Contribution record
      const contributionNSID = "org.hypercerts.claim.contribution";
      const contribution: OrgHypercertsClaimContribution.Record = {
        $type: "org.hypercerts.claim.contribution",
        // Use dummy hypercert reference for now because the activity record is not yet created:
        hypercert: {
          $type: "com.atproto.repo.strongRef",
          uri: `at://${did}/org.hypercerts.claim.activity/0`,
          cid: "bafkreifj2t4px2uizj25ml53axem47yfhpgsx72ekjrm2qyymcn5ifz744",
        },
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        role: "Contributor",
        contributors: input.activity.contributors,
        createdAt: new Date().toISOString(),
      };
      const validatedContribution = validateRecordOrThrow(
        contribution,
        OrgHypercertsClaimContribution
      );

      // Validate the ownership of records being referenced.
      for (const location of input.activity.locations) {
        if (!checkOwnershipByAtUri(location.uri, did)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message:
              "One of the locations being referenced is not owned by you.",
          });
        }
      }
      if (input.activity.project) {
        if (!checkOwnershipByAtUri(input.activity.project, did)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "The project being referenced is not owned by you.",
          });
        }
      }

      // Write records to the PDS
      // 1. Upload image to the PDS
      const imageBlobRef = await uploadFile(input.uploads.image, agent);
      // 2. Write activity to the PDS
      const activityResponse = await agent.com.atproto.repo.createRecord({
        repo: did,
        collection: activityNSID,
        record: {
          ...validatedActivity,
          image: {
            $type: "org.hypercerts.defs#smallImage",
            image: toBlobRef(imageBlobRef),
          },
        } satisfies OrgHypercertsClaimActivity.Record,
      });
      if (activityResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to write activity record",
        });
      }
      // 4. Write contribution to the PDS
      const contributionWriteResponse =
        await agent.com.atproto.repo.createRecord({
          repo: did,
          collection: contributionNSID,
          record: {
            ...validatedContribution,
            hypercert: {
              $type: "com.atproto.repo.strongRef",
              uri: activityResponse.data.uri,
              cid: activityResponse.data.cid,
            },
          } satisfies OrgHypercertsClaimContribution.Record,
        });
      if (contributionWriteResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to write contribution record",
        });
      }

      return activityResponse;
    });
};
