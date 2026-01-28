import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimCollection } from "@/../lex-api";
import { listRecords } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.collection" as const;
const RESOURCE_NAME = "collections" as const;

/**
 * Pure function to get all collections for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllCollectionsPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<OrgHypercertsClaimCollection.Record>[]> => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION,
    repo: did,
    validator: OrgHypercertsClaimCollection,
    resourceName: RESOURCE_NAME,
    skipInvalid: true,
  });
  return result.records;
};

/**
 * Factory to create the tRPC procedure for getting all collections.
 */
export const getAllCollectionsFactory = createDidQueryFactory(getAllCollectionsPure);

// Backwards compatibility exports
export const getAllProjectsPure = getAllCollectionsPure;
export const getAllProjectsFactory = getAllCollectionsFactory;
