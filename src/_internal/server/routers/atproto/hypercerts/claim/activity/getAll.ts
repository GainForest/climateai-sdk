import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimActivity } from "@/../lex-api";
import { listRecords } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.activity" as const;
const RESOURCE_NAME = "claim activities" as const;

/**
 * Response type for getAllClaimActivities
 */
export type GetAllClaimActivitiesResponse = {
  activities: GetRecordResponse<OrgHypercertsClaimActivity.Record>[];
};

/**
 * Pure function to get all claim activities for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllClaimActivitiesPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetAllClaimActivitiesResponse> => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION,
    repo: did,
    validator: OrgHypercertsClaimActivity,
    resourceName: RESOURCE_NAME,
    skipInvalid: true,
  });

  return {
    activities: result.records,
  };
};

/**
 * Factory to create the tRPC procedure for getting all claim activities.
 */
export const getAllClaimActivitiesFactory = createDidQueryFactory(getAllClaimActivitiesPure);
