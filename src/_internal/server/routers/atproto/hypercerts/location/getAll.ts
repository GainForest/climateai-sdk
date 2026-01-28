import { getReadAgent } from "@/_internal/server/utils/agent";
import {
  AppGainforestOrganizationDefaultSite,
  AppCertifiedLocation,
} from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { listRecords, getRecord } from "@/_internal/server/utils/atproto-crud";
import { createDidQueryFactory } from "@/_internal/server/utils/procedure-factories";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

const LOCATION_COLLECTION = "app.certified.location" as const;
const DEFAULT_SITE_COLLECTION = "app.gainforest.organization.defaultSite" as const;

/**
 * Response type for getAllLocations
 */
export type GetAllLocationsResponse = {
  locations: GetRecordResponse<AppCertifiedLocation.Record>[];
  defaultLocation: GetRecordResponse<AppGainforestOrganizationDefaultSite.Record> | null;
};

/**
 * Pure function to get all locations and the default location for a DID.
 * Can be reused outside of tRPC context.
 */
export const getAllLocationsPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
): Promise<GetAllLocationsResponse> => {
  const agent = getReadAgent(pdsDomain);

  // Fetch locations and default site in parallel
  const [locationsResult, defaultSiteResult] = await Promise.all([
    listRecords({
      agent,
      collection: LOCATION_COLLECTION,
      repo: did,
      validator: AppCertifiedLocation,
      resourceName: "locations",
      skipInvalid: true,
    }),
    tryCatch(
      getRecord({
        agent,
        collection: DEFAULT_SITE_COLLECTION,
        repo: did,
        rkey: "self",
        validator: AppGainforestOrganizationDefaultSite,
        resourceName: "default location",
      })
    ),
  ]);

  // Default site might not exist, so we handle the error gracefully
  const [defaultSite] = defaultSiteResult;

  return {
    locations: locationsResult.records,
    defaultLocation: defaultSite ?? null,
  };
};

/**
 * Factory to create the tRPC procedure for getting all locations.
 */
export const getAllLocationsFactory = createDidQueryFactory(getAllLocationsPure);
