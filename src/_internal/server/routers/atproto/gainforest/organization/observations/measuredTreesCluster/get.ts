import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationObservationsMeasuredTreesCluster as MeasuredTreesCluster } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.observations.measuredTreesCluster" as const;
const RESOURCE_NAME = "measured trees cluster" as const;

/**
 * Pure function to get measured trees cluster by DID.
 * Can be reused outside of tRPC context.
 */
export const getMeasuredTreesClusterPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<MeasuredTreesCluster.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey: "self",
    validator: MeasuredTreesCluster,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting measured trees cluster.
 */
export const getMeasuredTreesFactory = createDidQueryFactory(getMeasuredTreesClusterPure);
