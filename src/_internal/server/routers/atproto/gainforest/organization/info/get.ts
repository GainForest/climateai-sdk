import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationInfo } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.info" as const;
const RESOURCE_NAME = "organization info" as const;

/**
 * Pure function to get organization info by DID.
 * Can be reused outside of tRPC context.
 */
export const getOrganizationInfoPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppGainforestOrganizationInfo.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey: "self",
    validator: AppGainforestOrganizationInfo,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting organization info.
 */
export const getOrganizationInfoFactory = createDidQueryFactory(getOrganizationInfoPure);
