import { getReadAgent } from "@/_internal/server/utils/agent";
import { OrgHypercertsClaimProject } from "@/../lex-api";
import { listRecords } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "org.hypercerts.claim.project" as const;
const RESOURCE_NAME = "projects" as const;

/**
 * Pure function to get all projects for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllProjectsPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<OrgHypercertsClaimProject.Record>[]> => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION,
    repo: did,
    validator: OrgHypercertsClaimProject,
    resourceName: RESOURCE_NAME,
    skipInvalid: true,
  });
  return result.records;
};

/**
 * Factory to create the tRPC procedure for getting all projects.
 */
export const getAllProjectsFactory = createDidQueryFactory(getAllProjectsPure);
