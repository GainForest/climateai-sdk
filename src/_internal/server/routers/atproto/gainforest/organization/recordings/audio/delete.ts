import z from "zod";
import { TRPCError } from "@trpc/server";
import { deleteRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { parseAtUri } from "@/_internal/utilities/atproto";
import type { Agent } from "@atproto/api";
import type { DeleteRecordResponse } from "@/_internal/server/utils/atproto-crud";

const COLLECTION = "app.gainforest.organization.recordings.audio" as const;
const RESOURCE_NAME = "audio recording" as const;

/**
 * Pure function to delete an audio recording.
 * Can be reused outside of tRPC context.
 */
export const deleteAudioRecordingPure = async (
  agent: Agent,
  audioRecordingAtUri: string
): Promise<DeleteRecordResponse> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  const rkey = parseAtUri(audioRecordingAtUri).rkey;

  return deleteRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for deleting an audio recording.
 */
export const deleteAudioRecordingFactory = createMutationFactory(
  {
    audioRecordingAtUri: z.string(),
  },
  (agent, input) => deleteAudioRecordingPure(agent, input.audioRecordingAtUri)
);
