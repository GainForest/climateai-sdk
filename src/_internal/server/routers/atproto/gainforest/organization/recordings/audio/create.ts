import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppGainforestOrganizationRecordingsAudio } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { createRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { extractAudioMetadata } from "./utils";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.recordings.audio" as const;
const RESOURCE_NAME = "audio recording" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB (as per Audio type definition)

/**
 * Input schema for audio recording creation
 * Only requires user-provided data; technical metadata is auto-extracted
 */
export const AudioRecordingInputSchema = z.object({
  name: z.string(),
  description: z
    .object({
      text: z.string(),
      facets: z.array(z.any()).optional(),
    })
    .optional(),
  recordedAt: z.string().datetime(),
  coordinates: z.string().optional(),
});

export type AudioRecordingInput = z.infer<typeof AudioRecordingInputSchema>;

/**
 * Upload schema for audio recording creation
 */
export const AudioRecordingUploadsSchema = z.object({
  audioFile: z.union([z.string().url(), FileGeneratorSchema]),
});

export type AudioRecordingUploads = z.infer<typeof AudioRecordingUploadsSchema>;

/**
 * Fetches an audio file from a URL
 */
const fetchAudioFromUrl = async (url: string): Promise<File> => {
  const [response, fetchError] = await tryCatch(fetch(url));
  if (fetchError !== null || response === null || !response.ok) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Failed to fetch the audio file from the provided URL.",
      cause: fetchError,
    });
  }

  const blob = await response.blob();
  const filename = url.split("/").pop() || "audio";
  return new File([blob], filename, { type: blob.type });
};

/**
 * Pure function to create an audio recording.
 * Automatically extracts technical metadata (codec, channels, duration, sampleRate) from the file.
 * Can be reused outside of tRPC context.
 */
export const createAudioRecordingPure = async (
  agent: Agent,
  input: AudioRecordingInput,
  uploads: AudioRecordingUploads,
  rkey?: string
): Promise<PutRecordResponse<AppGainforestOrganizationRecordingsAudio.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Fetch or convert the audio file
  const file =
    typeof uploads.audioFile === "string"
      ? await fetchAudioFromUrl(uploads.audioFile)
      : await toFile(uploads.audioFile);

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The audio file is too large. It must be less than 100MB.",
    });
  }

  // Extract technical metadata from the audio file
  const extractedMetadata = await extractAudioMetadata(file);

  // Upload the blob
  const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
  if (uploadError !== null || uploadResponse === null) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload the audio file.",
      cause: uploadError,
    });
  }

  const audioRecording: AppGainforestOrganizationRecordingsAudio.Record = {
    $type: COLLECTION,
    name: input.name,
    description: input.description
      ? {
          $type: "app.gainforest.common.defs#richtext",
          text: input.description.text,
          facets: input.description.facets,
        }
      : undefined,
    blob: {
      $type: "app.gainforest.common.defs#audio",
      file: uploadResponse.data.blob,
    },
    metadata: {
      $type: "app.gainforest.organization.recordings.audio#metadata",
      codec: extractedMetadata.codec,
      channels: extractedMetadata.channels,
      duration: extractedMetadata.duration,
      sampleRate: extractedMetadata.sampleRate,
      recordedAt: input.recordedAt,
      coordinates: input.coordinates,
    },
    createdAt: new Date().toISOString(),
  };

  return createRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    record: audioRecording,
    validator: AppGainforestOrganizationRecordingsAudio,
    resourceName: RESOURCE_NAME,
    rkey,
  });
};

/**
 * Factory to create the tRPC procedure for creating an audio recording.
 */
export const createAudioRecordingFactory = createMutationFactory(
  {
    recording: AudioRecordingInputSchema,
    uploads: AudioRecordingUploadsSchema,
    rkey: z.string().optional(),
  },
  (agent, input) => createAudioRecordingPure(agent, input.recording, input.uploads, input.rkey)
);
