import { protectedProcedure } from "@/_internal/server/trpc";
import z, { file } from "zod";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import type { SupportedPDSDomain } from "@/_internal/index";
import {
  FileGeneratorSchema,
  toFile,
  type FileGenerator,
} from "@/_internal/zod-schemas/file";
import { BlobRef, type Agent } from "@atproto/api";
import { TRPCError } from "@trpc/server";

export const uploadFileAsBlobPure = async (
  file: File | FileGenerator,
  agent: Agent
) => {
  let fileToUpload: File;
  if (file instanceof File) {
    fileToUpload = file;
  } else {
    fileToUpload = await toFile(file);
  }
  const response = await agent.uploadBlob(fileToUpload);

  if (response.success !== true) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file as blob.",
    });
  }
  return response.data;
};

export const uploadFileAsBlobFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        file: FileGeneratorSchema,
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const agent = await getWriteAgent(ctx.sdk);
      const response = await uploadFileAsBlobPure(input.file, agent);

      return response;
    });
};
