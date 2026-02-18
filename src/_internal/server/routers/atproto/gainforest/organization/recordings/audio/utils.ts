import { TRPCError } from "@trpc/server";
import { parseBuffer } from "music-metadata";

/**
 * Extracted audio metadata from music-metadata
 */
export type ExtractedAudioMetadata = {
  codec: string;
  channels: number;
  duration: string;
  sampleRate: number;
};

/**
 * Extracts metadata from an audio file using music-metadata
 *
 * @param file - The audio file to extract metadata from
 * @returns Extracted metadata including codec, channels, duration, and sample rate
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

  return {
    codec,
    channels: format.numberOfChannels,
    duration: format.duration.toString(),
    sampleRate: format.sampleRate,
  };
};
