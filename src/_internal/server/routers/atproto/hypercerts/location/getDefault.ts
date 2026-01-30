import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationDefaultSite } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.defaultSite" as const;
const RESOURCE_NAME = "default location" as const;

/**
 * Pure function to get the default location for a DID.
 * Can be reused outside of tRPC context.
 */
export const getDefaultLocationPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppGainforestOrganizationDefaultSite.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey: "self",
    validator: AppGainforestOrganizationDefaultSite,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting the default location.
 */
export const getDefaultLocationFactory = createDidQueryFactory(getDefaultLocationPure);
