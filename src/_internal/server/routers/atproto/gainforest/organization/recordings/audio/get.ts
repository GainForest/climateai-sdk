import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationRecordingsAudio } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.recordings.audio" as const;
const RESOURCE_NAME = "audio recording" as const;

/**
 * Pure function to get an audio recording by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getAudioRecordingPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppGainforestOrganizationRecordingsAudio.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: AppGainforestOrganizationRecordingsAudio,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting an audio recording.
 */
export const getAudioRecordingFactory = createDidRkeyQueryFactory(getAudioRecordingPure);
