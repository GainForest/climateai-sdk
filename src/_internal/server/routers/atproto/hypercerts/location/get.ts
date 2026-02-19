import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppCertifiedLocation } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.certified.location" as const;
const RESOURCE_NAME = "location" as const;

/**
 * Pure function to get a location by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getLocationPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppCertifiedLocation.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: AppCertifiedLocation,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting a location.
 */
export const getLocationFactory = createDidRkeyQueryFactory(getLocationPure);
