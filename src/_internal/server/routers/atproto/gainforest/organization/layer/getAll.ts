import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationLayer } from "@/../lex-api";
import { listRecords } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.layer" as const;
const RESOURCE_NAME = "layers" as const;

/**
 * Pure function to get all layers for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllLayersPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppGainforestOrganizationLayer.Record>[]> => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION,
    repo: did,
    validator: AppGainforestOrganizationLayer,
    resourceName: RESOURCE_NAME,
    skipInvalid: true,
  });
  return result.records;
};

/**
 * Factory to create the tRPC procedure for getting all layers.
 */
export const getAllLayersFactory = createDidQueryFactory(getAllLayersPure);
