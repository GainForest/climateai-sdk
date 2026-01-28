import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimProject } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.project" as const;
const RESOURCE_NAME = "project" as const;

/**
 * Pure function to get a project by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getProjectPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<OrgHypercertsClaimProject.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: OrgHypercertsClaimProject,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting a project.
 */
export const getProjectFactory = createDidRkeyQueryFactory(getProjectPure);
