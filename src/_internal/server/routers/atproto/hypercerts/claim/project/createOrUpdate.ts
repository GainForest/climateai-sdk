import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import {
  OrgHypercertsClaimProject,
  PubLeafletBlocksText,
  PubLeafletPagesLinearDocument,
} from "@/../lex-api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import {
  BlobRefGeneratorSchema,
  FileGeneratorSchema,
  toBlobRef,
  toFile,
} from "@/_internal/zod-schemas";
import { ActivityWeightSchema } from "@/_internal/zod-schemas/activity-weight";
import { StrongRefSchema } from "@/_internal/zod-schemas/strongref";
import { uploadFileAsBlobPure } from "../../../common/uploadFileAsBlob";

export const createOrUpdateProjectFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        rkey: z.string().optional(),
        project: z.object({
          title: z.string().min(1),
          shortDescription: z.string(),
          description: z.string().optional(),
          avatar: BlobRefGeneratorSchema.optional(),
          coverPhoto: BlobRefGeneratorSchema.optional(),
          activities: z.array(ActivityWeightSchema).optional(),
          location: StrongRefSchema.optional(),
          createdAt: z.string().optional(),
        }),
        uploads: z.object({
          avatar: FileGeneratorSchema.optional(),
          coverPhoto: FileGeneratorSchema.optional(),
        }),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const agent = await getWriteAgent(ctx.sdk);
      if (!agent.did) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authenticated",
        });
      }

      const descriptionLinearDocumentOrUndefined =
        input.project.description ?
          ({
            $type: "pub.leaflet.pages.linearDocument",
            blocks: [
              {
                $type: "pub.leaflet.pages.linearDocument#block",
                block: {
                  $type: "pub.leaflet.blocks.text",
                  plaintext: input.project.description,
                } satisfies PubLeafletBlocksText.Main,
              } satisfies PubLeafletPagesLinearDocument.Block,
            ],
          } satisfies PubLeafletPagesLinearDocument.Main)
        : undefined;

      const project: OrgHypercertsClaimProject.Record = {
        $type: "org.hypercerts.claim.project",
        title: input.project.title,
        shortDescription: input.project.shortDescription,
        description: descriptionLinearDocumentOrUndefined,
        avatar:
          input.project.avatar ? toBlobRef(input.project.avatar) : undefined,
        coverPhoto:
          input.project.coverPhoto ?
            toBlobRef(input.project.coverPhoto)
          : undefined,
        activities: input.project.activities,
        location: input.project.location,
        createdAt:
          input.project.createdAt ?
            input.project.createdAt
          : new Date().toISOString(),
      };

      // Validate if the data before uploading images
      const validatedProjectBeforeUpload = validateRecordOrThrow(
        project,
        OrgHypercertsClaimProject
      );

      // Upload images if there are any.
      const avatarUplaodResponse =
        input.uploads.avatar ?
          await uploadFileAsBlobPure(await toFile(input.uploads.avatar), agent)
        : undefined;
      const coverPhotoUploadResponse =
        input.uploads.coverPhoto ?
          await uploadFileAsBlobPure(
            await toFile(input.uploads.coverPhoto),
            agent
          )
        : undefined;

      // Update the project with the uploaded images, else keep the original ones.
      project.avatar =
        avatarUplaodResponse ? avatarUplaodResponse.blob : project.avatar;
      project.coverPhoto =
        coverPhotoUploadResponse ?
          coverPhotoUploadResponse.blob
        : project.coverPhoto;

      // Validate the project with the uploaded images
      const validatedProjectAfterUpload = validateRecordOrThrow(
        project,
        OrgHypercertsClaimProject
      );
      const projectToCreateOrUpdate = validatedProjectAfterUpload;

      let response;
      if (input.rkey) {
        response = await agent.com.atproto.repo.putRecord({
          repo: input.did,
          collection: "app.gainforest.organization.project",
          record: projectToCreateOrUpdate,
          rkey: input.rkey,
        });
      } else {
        response = await agent.com.atproto.repo.createRecord({
          repo: input.did,
          collection: "app.gainforest.organization.project",
          record: projectToCreateOrUpdate,
        });
      }

      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create or update project",
        });
      }

      return {
        uri: response.data.uri,
        cid: response.data.cid,
        validationStatus: response.data.validationStatus,
        value: project,
      } satisfies PutRecordResponse<OrgHypercertsClaimProject.Record>;
    });
};
