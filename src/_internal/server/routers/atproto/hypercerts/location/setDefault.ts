import z from "zod";
import { TRPCError } from "@trpc/server";
import {
  AppGainforestOrganizationDefaultSite,
  AppCertifiedLocation,
} from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { putRecord, getRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { parseAtUri } from "@/_internal/utilities/atproto";
import type { Agent } from "@atproto/api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";

const LOCATION_COLLECTION = "app.certified.location" as const;
const DEFAULT_SITE_COLLECTION = "app.gainforest.organization.defaultSite" as const;

/**
 * Pure function to set the default location.
 * Can be reused outside of tRPC context.
 */
export const setDefaultLocationPure = async (
  agent: Agent,
  locationAtUri: string
): Promise<PutRecordResponse<AppGainforestOrganizationDefaultSite.Record>> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Validate URI format
  if (!(locationAtUri.startsWith("at://") && locationAtUri.includes(LOCATION_COLLECTION))) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid location URI format.",
    });
  }

  // Verify the location exists
  const [, locationError] = await tryCatch(
    getRecord({
      agent,
      collection: LOCATION_COLLECTION,
      repo: did,
      rkey: parseAtUri(locationAtUri).rkey,
      validator: AppCertifiedLocation,
      resourceName: "location",
    })
  );

  if (locationError !== null) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "The specified location was not found.",
      cause: locationError,
    });
  }

  // Create the default site record
  const defaultSite: AppGainforestOrganizationDefaultSite.Record = {
    $type: DEFAULT_SITE_COLLECTION,
    site: locationAtUri,
    createdAt: new Date().toISOString(),
  };

  return putRecord({
    agent,
    collection: DEFAULT_SITE_COLLECTION,
    repo: did,
    rkey: "self",
    record: defaultSite,
    validator: AppGainforestOrganizationDefaultSite,
    resourceName: "default location",
  });
};

/**
 * Factory to create the tRPC procedure for setting the default location.
 */
export const setDefaultLocationFactory = createMutationFactory(
  {
    locationAtUri: z.string(),
  },
  (agent, input) => setDefaultLocationPure(agent, input.locationAtUri)
);
