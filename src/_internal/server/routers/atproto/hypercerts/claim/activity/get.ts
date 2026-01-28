import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimActivity } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.activity" as const;
const RESOURCE_NAME = "claim activity" as const;

/**
 * Pure function to get a claim activity by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getClaimActivityPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<OrgHypercertsClaimActivity.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: OrgHypercertsClaimActivity,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting a claim activity.
 */
export const getClaimActivityFactory = createDidRkeyQueryFactory(getClaimActivityPure);

// Backwards compatibility alias (typo in original name)
export const getCliamActivityFactory = getClaimActivityFactory;
