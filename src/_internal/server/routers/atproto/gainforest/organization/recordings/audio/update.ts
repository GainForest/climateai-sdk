import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppGainforestOrganizationRecordingsAudio } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { putRecord, getRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { FileGeneratorSchema, toFile } from "@/_internal/zod-schemas/file";
import { extractAudioMetadata } from "./utils";
import { getReadAgent } from "@/_internal/server/utils/agent";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import type { SupportedPDSDomain } from "@/_internal/index";

const COLLECTION = "app.gainforest.organization.recordings.audio" as const;
const RESOURCE_NAME = "audio recording" as const;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

/**
 * Input schema for audio recording update
 * User can update name, description, recordedAt, coordinates
 * If a new file is provided, technical metadata is re-extracted
 */
export const AudioRecordingUpdateInputSchema = z.object({
  name: z.string().optional(),
  description: z
    .object({
      text: z.string(),
      facets: z.array(z.any()).optional(),
    })
    .optional(),
  recordedAt: z.string().datetime(),
  coordinates: z.string().optional(),
});

export type AudioRecordingUpdateInput = z.infer<typeof AudioRecordingUpdateInputSchema>;

/**
 * Upload schema for audio recording update
 * If audioFile is not provided, the existing audio blob is kept
 */
export const AudioRecordingUpdateUploadsSchema = z
  .object({
    audioFile: FileGeneratorSchema.optional(),
  })
  .optional();

export type AudioRecordingUpdateUploads = z.infer<typeof AudioRecordingUpdateUploadsSchema>;

/**
 * Pure function to update an audio recording.
 * If a new audio file is provided, technical metadata is re-extracted.
 * Otherwise, existing audio blob and technical metadata are preserved.
 * Can be reused outside of tRPC context.
 */
export const updateAudioRecordingPure = async (
  agent: Agent,
  rkey: string,
  pdsDomain: SupportedPDSDomain,
  recordingInput: AudioRecordingUpdateInput,
  uploads?: AudioRecordingUpdateUploads
): Promise<PutRecordResponse<AppGainforestOrganizationRecordingsAudio.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  let audioBlob: AppGainforestOrganizationRecordingsAudio.Record["audioBlob"];
  let technicalMetadata: {
    codec: string;
    format: AppGainforestOrganizationRecordingsAudio.Metadata["format"];
    channels: number;
    duration: string;
    sampleRate: number;
  };

  if (uploads?.audioFile) {
    // New file uploaded - process and upload it
    const file = await toFile(uploads.audioFile);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The audio file is too large. It must be less than 100MB.",
      });
    }

    // Extract technical metadata from the new audio file
    const extractedMetadata = await extractAudioMetadata(file);
    technicalMetadata = extractedMetadata;

    const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
    if (uploadError !== null || uploadResponse === null) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to upload the audio file.",
        cause: uploadError,
      });
    }

    audioBlob = {
      $type: "app.gainforest.common.defs#audio",
      file: uploadResponse.data.blob,
    };
  } else {
    // No new file - fetch existing record to preserve audio blob and technical metadata
    const readAgent = getReadAgent(pdsDomain);
    const existingRecord = await getRecord({
      agent: readAgent,
      collection: COLLECTION,
      repo: did,
      rkey,
      validator: AppGainforestOrganizationRecordingsAudio,
      resourceName: RESOURCE_NAME,
    });

    audioBlob = existingRecord.value.audioBlob;
    technicalMetadata = {
      codec: existingRecord.value.metadata.codec,
      format: existingRecord.value.metadata.format,
      channels: existingRecord.value.metadata.channels,
      duration: existingRecord.value.metadata.duration,
      sampleRate: existingRecord.value.metadata.sampleRate,
    };
  }

  const audioRecording: AppGainforestOrganizationRecordingsAudio.Record = {
    $type: COLLECTION,
    name: recordingInput.name,
    description: recordingInput.description
      ? {
          $type: "app.gainforest.common.defs#richtext",
          text: recordingInput.description.text,
          facets: recordingInput.description.facets,
        }
      : undefined,
    audioBlob,
    metadata: {
      $type: "app.gainforest.organization.recordings.audio#metadata",
      codec: technicalMetadata.codec,
      format: technicalMetadata.format,
      channels: technicalMetadata.channels,
      duration: technicalMetadata.duration,
      sampleRate: technicalMetadata.sampleRate,
      recordedAt: recordingInput.recordedAt,
      coordinates: recordingInput.coordinates,
    },
    createdAt: new Date().toISOString(),
  };

  return putRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    record: audioRecording,
    validator: AppGainforestOrganizationRecordingsAudio,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for updating an audio recording.
 */
export const updateAudioRecordingFactory = createMutationFactory(
  {
    rkey: z.string(),
    recording: AudioRecordingUpdateInputSchema,
    uploads: AudioRecordingUpdateUploadsSchema,
  },
  (agent, input) =>
    updateAudioRecordingPure(agent, input.rkey, input.pdsDomain, input.recording, input.uploads)
);
