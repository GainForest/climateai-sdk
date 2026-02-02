import z from "zod";
import { TRPCError } from "@trpc/server";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import {
  FileGeneratorSchema,
  toFile,
  type FileGenerator,
} from "@/_internal/zod-schemas/file";
import type { Agent } from "@atproto/api";

/**
 * Pure function to upload a file as a blob.
 * Can be reused outside of tRPC context.
 */
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

  const [response, error] = await tryCatch(agent.uploadBlob(fileToUpload));

  if (error !== null) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file.",
      cause: error,
    });
  }

  if (response === null || response.success !== true) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file.",
    });
  }

  return response.data;
};

/**
 * Factory to create the tRPC procedure for uploading a file as blob.
 */
export const uploadFileAsBlobFactory = createMutationFactory(
  {
    file: FileGeneratorSchema,
  },
  (agent, input) => uploadFileAsBlobPure(input.file, agent)
);
