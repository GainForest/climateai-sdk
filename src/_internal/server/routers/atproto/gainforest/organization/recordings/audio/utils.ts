import { TRPCError } from "@trpc/server";
import { parseBuffer } from "music-metadata";
import type { AppGainforestOrganizationRecordingsAudio } from "@/../lex-api";

/**
 * Supported audio formats and their corresponding MIME types
 */
const MIME_TO_FORMAT: Record<string, AppGainforestOrganizationRecordingsAudio.Metadata["format"]> = {
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/x-wav": "wav",
  "audio/mp3": "mp3",
  "audio/mpeg": "mp3",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/flac": "flac",
  "audio/x-flac": "flac",
  "audio/ogg": "ogg",
  "audio/opus": "opus",
  "audio/webm": "webm",
  "audio/aiff": "aiff",
  "audio/x-aiff": "aiff",
};

/**
 * Container format to our format enum mapping
 */
const CONTAINER_TO_FORMAT: Record<string, AppGainforestOrganizationRecordingsAudio.Metadata["format"]> = {
  "WAVE": "wav",
  "MPEG": "mp3",
  "M4A": "m4a",
  "MP4": "m4a",
  "AAC": "aac",
  "FLAC": "flac",
  "Ogg": "ogg",
  "Opus": "opus",
  "WebM": "webm",
  "AIFF": "aiff",
};

/**
 * Extracted audio metadata from music-metadata
 */
export type ExtractedAudioMetadata = {
  codec: string;
  format: AppGainforestOrganizationRecordingsAudio.Metadata["format"];
  channels: number;
  duration: string;
  sampleRate: number;
};

/**
 * Extracts metadata from an audio file using music-metadata
 *
 * @param file - The audio file to extract metadata from
 * @returns Extracted metadata including codec, format, channels, duration, and sample rate
 * @throws TRPCError if metadata extraction fails or required fields are missing
 */
export const extractAudioMetadata = async (file: File): Promise<ExtractedAudioMetadata> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let metadata;
  try {
    metadata = await parseBuffer(buffer, { mimeType: file.type || undefined });
  } catch (error) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Failed to parse audio file. Please ensure the file is a valid audio format.",
      cause: error,
    });
  }

  const { format } = metadata;

  // Extract and validate sample rate
  if (!format.sampleRate) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Could not determine sample rate from audio file.",
    });
  }

  // Extract and validate channels
  if (!format.numberOfChannels) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Could not determine number of channels from audio file.",
    });
  }

  // Extract and validate duration
  if (format.duration === undefined || format.duration === null) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Could not determine duration from audio file.",
    });
  }

  // Determine the codec
  const codec = format.codec || format.codecProfile || "unknown";

  // Determine the format from container or MIME type
  let audioFormat: AppGainforestOrganizationRecordingsAudio.Metadata["format"] | undefined;

  // Try to get format from container
  if (format.container && CONTAINER_TO_FORMAT[format.container]) {
    audioFormat = CONTAINER_TO_FORMAT[format.container];
  }

  // Fall back to MIME type
  if (!audioFormat && file.type && MIME_TO_FORMAT[file.type]) {
    audioFormat = MIME_TO_FORMAT[file.type];
  }

  // Try to infer from file extension
  if (!audioFormat) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    const extensionFormats: Record<string, AppGainforestOrganizationRecordingsAudio.Metadata["format"]> = {
      "wav": "wav",
      "mp3": "mp3",
      "m4a": "m4a",
      "aac": "aac",
      "flac": "flac",
      "ogg": "ogg",
      "opus": "opus",
      "webm": "webm",
      "aiff": "aiff",
      "aif": "aiff",
    };
    if (extension && extensionFormats[extension]) {
      audioFormat = extensionFormats[extension];
    }
  }

  if (!audioFormat) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: `Unsupported audio format. Supported formats: wav, mp3, m4a, aac, flac, ogg, opus, webm, aiff. Detected container: ${format.container || "unknown"}, MIME: ${file.type || "unknown"}`,
    });
  }

  return {
    codec,
    format: audioFormat,
    channels: format.numberOfChannels,
    duration: format.duration.toString(),
    sampleRate: format.sampleRate,
  };
};
