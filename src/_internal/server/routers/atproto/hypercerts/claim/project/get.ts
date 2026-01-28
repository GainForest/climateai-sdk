import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimCollection } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.collection" as const;
const RESOURCE_NAME = "collection" as const;

/**
 * Pure function to get a collection by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getCollectionPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<OrgHypercertsClaimCollection.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: OrgHypercertsClaimCollection,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting a collection.
 */
export const getCollectionFactory = createDidRkeyQueryFactory(getCollectionPure);

// Backwards compatibility exports
export const getProjectPure = getCollectionPure;
export const getProjectFactory = getCollectionFactory;
