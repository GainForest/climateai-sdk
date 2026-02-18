import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationRecordingsAudio } from "@/../lex-api";
import { listRecords } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.recordings.audio" as const;
const RESOURCE_NAME = "audio recordings" as const;

/**
 * Response type for getAllAudioRecordings
 */
export type GetAllAudioRecordingsResponse = {
  recordings: GetRecordResponse<AppGainforestOrganizationRecordingsAudio.Record>[];
  cursor?: string;
};

/**
 * Pure function to get all audio recordings for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllAudioRecordingsPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetAllAudioRecordingsResponse> => {
  const agent = getReadAgent(pdsDomain);

  const result = await listRecords({
    agent,
    collection: COLLECTION,
    repo: did,
    validator: AppGainforestOrganizationRecordingsAudio,
    resourceName: RESOURCE_NAME,
    skipInvalid: true,
  });

  return {
    recordings: result.records,
    cursor: result.cursor,
  };
};

/**
 * Factory to create the tRPC procedure for getting all audio recordings.
 */
export const getAllAudioRecordingsFactory = createDidQueryFactory(getAllAudioRecordingsPure);
