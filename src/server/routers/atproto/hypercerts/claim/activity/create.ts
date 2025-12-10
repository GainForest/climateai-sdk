import { protectedProcedure } from "@/server/trpc";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { Agent } from "@atproto/api";
import {
  AppCertifiedLocation,
  OrgHypercertsClaimActivity,
  OrgHypercertsClaimContribution,
} from "@/../lex-api";
import { toBlobRef, toBlobRefGenerator } from "@/zod-schemas/blobref";
import { type FileGenerator, FileGeneratorSchema } from "@/zod-schemas/file";
import { getWriteAgent } from "@/server/utils/agent";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/index";

const uploadFile = async (fileGenerator: FileGenerator, agent: Agent) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file);
  return toBlobRefGenerator(response.data.blob);
};

export const createHypercertClaimFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        claim: z.object({
          title: z.string(),
          shortDescription: z.string(),
          description: z.string().optional(),
          workScopes: z.array(z.string()),
          startDate: z.string(),
          endDate: z.string(),
        }),
        uploads: z.object({
          image: FileGeneratorSchema,
          contributors: z.array(z.string()).refine((v) => v.length > 0, {
            message: "At least one contribution is required",
          }),
          siteAtUri: z.string(),
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

      // Generate record data for validation before writing to the PDS:
      // Location record
      const locationNSID = "app.certified.location";
      const location: AppCertifiedLocation.Record = {
        $type: locationNSID,
        lpVersion: "1.0.0",
        srs: "https://epsg.io/3857",
        locationType: "geojson",
        location: {
          $type: "org.hypercerts.defs#uri",
          uri: input.uploads.siteAtUri,
        },
        createdAt: new Date().toISOString(),
      };
      const validatedLocation = validateRecordOrThrow(
        location,
        AppCertifiedLocation
      );

      // Claim record
      const claimNSID = "org.hypercerts.claim.activity";
      const claim: OrgHypercertsClaimActivity.Record = {
        $type: claimNSID,
        title: input.claim.title,
        shortDescription: input.claim.shortDescription,
        description: input.claim.description,
        // These will be set after the records are created:
        image: undefined,
        location: undefined,
        contributions: undefined,
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        workScope: {
          $type: "org.hypercerts.claim.activity#workScope",
          anyOf: input.claim.workScopes,
        },
        startDate: input.claim.startDate,
        endDate: input.claim.endDate,
        createdAt: new Date().toISOString(),
      };
      const validatedClaim = validateRecordOrThrow(
        claim,
        OrgHypercertsClaimActivity
      );

      // Contribution record
      const contributionNSID = "org.hypercerts.claim.contribution";
      const contribution: OrgHypercertsClaimContribution.Record = {
        $type: "org.hypercerts.claim.contribution",
        // Use dummy hypercert reference for now because the claim record is not yet created:
        hypercert: {
          $type: "com.atproto.repo.strongRef",
          uri: `at://${did}/org.hypercerts.claim/0`,
          cid: "bafkreifj2t4px2uizj25ml53axem47yfhpgsx72ekjrm2qyymcn5ifz744",
        },
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        role: "Contributor",
        contributors: input.uploads.contributors,
        createdAt: new Date().toISOString(),
      };
      const validatedContribution = validateRecordOrThrow(
        contribution,
        OrgHypercertsClaimContribution
      );

      // Write records to the PDS
      // 1. Write location to the PDS
      const locationWriteResponse = await agent.com.atproto.repo.createRecord({
        repo: did,
        collection: locationNSID,
        record: validatedLocation,
      });
      if (locationWriteResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to write location record",
        });
      }
      // 2. Upload image to the PDS
      const imageBlobRef = await uploadFile(input.uploads.image, agent);
      // 3. Write claim to the PDS
      const claimResponse = await agent.com.atproto.repo.createRecord({
        repo: did,
        collection: claimNSID,
        record: {
          ...validatedClaim,
          image: {
            $type: "org.hypercerts.defs#smallImage",
            image: toBlobRef(imageBlobRef),
          },
          location: {
            $type: "com.atproto.repo.strongRef",
            uri: locationWriteResponse.data.uri,
            cid: locationWriteResponse.data.cid,
          },
        } satisfies OrgHypercertsClaimActivity.Record,
      });
      if (claimResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to write claim record",
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
              uri: claimResponse.data.uri,
              cid: claimResponse.data.cid,
            },
          } satisfies OrgHypercertsClaimContribution.Record,
        });
      if (contributionWriteResponse.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to write contribution record",
        });
      }

      return claimResponse;
    });
};
