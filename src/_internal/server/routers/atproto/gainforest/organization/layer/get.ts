import { getReadAgent } from "@/_internal/server/utils/agent";
import { AppGainforestOrganizationLayer } from "@/../lex-api";
import { getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidRkeyQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const COLLECTION = "app.gainforest.organization.layer" as const;
const RESOURCE_NAME = "layer" as const;

/**
 * Pure function to get a layer by DID and rkey.
 * Can be reused outside of tRPC context.
 */
export const getLayerPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
): Promise<GetRecordResponse<AppGainforestOrganizationLayer.Record>> => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey,
    validator: AppGainforestOrganizationLayer,
    resourceName: RESOURCE_NAME,
  });
};

/**
 * Factory to create the tRPC procedure for getting a layer.
 */
export const getLayerFactory = createDidRkeyQueryFactory(getLayerPure);
