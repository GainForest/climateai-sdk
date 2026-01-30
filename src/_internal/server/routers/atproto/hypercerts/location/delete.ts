import z from "zod";
import { TRPCError } from "@trpc/server";
import { AppGainforestOrganizationDefaultSite, AppCertifiedLocation } from "@/../lex-api";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { deleteRecord, getRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import { parseAtUri } from "@/_internal/utilities/atproto";
import type { Agent } from "@atproto/api";
import type { DeleteRecordResponse } from "@/_internal/server/utils/atproto-crud";

const LOCATION_COLLECTION = "app.certified.location" as const;
const DEFAULT_SITE_COLLECTION = "app.gainforest.organization.defaultSite" as const;

/**
 * Pure function to delete a location.
 * Can be reused outside of tRPC context.
 */
export const deleteLocationPure = async (
  agent: Agent,
  locationAtUri: string
): Promise<DeleteRecordResponse> => {
  const did = agent.did;
  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action.",
    });
  }

  // Check if this is the default location
  const [defaultSiteResult] = await tryCatch(
    getRecord({
      agent,
      collection: DEFAULT_SITE_COLLECTION,
      repo: did,
      rkey: "self",
      validator: AppGainforestOrganizationDefaultSite,
      resourceName: "default location",
    })
  );

  if (defaultSiteResult?.value.site === locationAtUri) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot delete the default location. Please set a different default first.",
    });
  }

  const rkey = parseAtUri(locationAtUri).rkey;

  return deleteRecord({
    agent,
    collection: LOCATION_COLLECTION,
    repo: did,
    rkey,
    resourceName: "location",
  });
};

/**
 * Factory to create the tRPC procedure for deleting a location.
 */
export const deleteLocationFactory = createMutationFactory(
  {
    locationAtUri: z.string(),
  },
  (agent, input) => deleteLocationPure(agent, input.locationAtUri)
);
