import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import { AppGainforestOrganizationInfo } from "@/../lex-api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { FileGeneratorSchema } from "@/_internal/zod-schemas/file";
import {
  BlobRefGeneratorSchema,
  toBlobRef,
} from "@/_internal/zod-schemas/blobref";
import { uploadFileAsBlobPure } from "../../common/uploadFileAsBlob";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";

export const createOrUpdateOrganizationInfoFactory = <
  T extends SupportedPDSDomain,
>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        info: z.object({
          displayName: z.string(),
          shortDescription: z.string(),
          longDescription: z.string(),
          website: z.string().optional(),
          logo: BlobRefGeneratorSchema.optional(),
          coverImage: BlobRefGeneratorSchema.optional(),
          objectives: z.array(
            z.enum([
              "Conservation",
              "Research",
              "Education",
              "Community",
              "Other",
            ])
          ),
          startDate: z.string().optional(),
          country: z.string(),
          visibility: z.enum(["Public", "Hidden"]),
        }),
        uploads: z
          .object({
            logo: FileGeneratorSchema.optional(),
            coverImage: FileGeneratorSchema.optional(),
          })
          .optional(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const agent = await getWriteAgent(input.pdsDomain);
      const logoBlob =
        input.uploads?.logo ?
          (await uploadFileAsBlobPure(input.uploads.logo, agent)).blob
        : input.info.logo ? toBlobRef(input.info.logo)
        : undefined;
      const coverImageBlob =
        input.uploads?.coverImage ?
          (await uploadFileAsBlobPure(input.uploads.coverImage, agent)).blob
        : input.info.coverImage ? toBlobRef(input.info.coverImage)
        : undefined;

      const info: AppGainforestOrganizationInfo.Record = {
        $type: "app.gainforest.organization.info",
        displayName: input.info.displayName,
        shortDescription: input.info.shortDescription,
        longDescription: input.info.longDescription,
        website: input.info.website ? input.info.website : undefined,
        logo:
          logoBlob ?
            {
              $type: "app.gainforest.common.defs#smallImage",
              image: logoBlob,
            }
          : undefined,
        coverImage:
          coverImageBlob ?
            {
              $type: "app.gainforest.common.defs#smallImage",
              image: coverImageBlob,
            }
          : undefined,
        objectives: input.info.objectives,
        startDate: input.info.startDate ? input.info.startDate : undefined,
        country: input.info.country,
        visibility: input.info.visibility,
        createdAt: new Date().toISOString(),
      };

      validateRecordOrThrow(info, AppGainforestOrganizationInfo);

      const response = await agent.com.atproto.repo.putRecord({
        repo: input.did,
        collection: "app.gainforest.organization.info",
        record: info,
        rkey: "self",
      });

      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update organization info",
        });
      }

      return {
        ...response.data,
        value: info,
      } as PutRecordResponse<AppGainforestOrganizationInfo.Record>;
    });
};
