import { tryCatch } from "@/_internal/lib/tryCatch";
import { publicProcedure } from "@/_internal/server/trpc";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getOrganizationInfoPure } from "../../../gainforest/organization/info/get";
import { getAllClaimActivitiesPure } from "./getAll";
import {
  AppGainforestOrganizationInfo,
  OrgHypercertsClaimActivity,
} from "@/../lex-api";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import type { SupportedPDSDomain } from "@/_internal/index";

/**
 * Organization with its activities
 */
export type OrganizationWithActivities = {
  repo: {
    did: string;
  };
  organizationInfo: AppGainforestOrganizationInfo.Record;
  activities: GetRecordResponse<OrgHypercertsClaimActivity.Record>[];
};

/**
 * Pure function to get all claim activities across all organizations.
 * Can be reused outside of tRPC context.
 */
export const getAllClaimActivitiesAcrossOrganizationsPure = async <
  T extends SupportedPDSDomain,
>(
  pdsDomain: T
): Promise<OrganizationWithActivities[]> => {
  const agent = getReadAgent(pdsDomain);

  // Get all repositories
  const [repositoriesListResponse, repositoriesListFetchError] = await tryCatch(
    agent.com.atproto.sync.listRepos({
      limit: 150,
    })
  );

  if (
    repositoriesListFetchError !== null ||
    repositoriesListResponse === null ||
    repositoriesListResponse.success !== true
  ) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch the list of repositories.",
      cause: repositoriesListFetchError,
    });
  }

  const repositoriesList = repositoriesListResponse.data.repos;

  // Filter repositories that are organizations (have organization info)
  const organizationResults = await Promise.all(
    repositoriesList.map(async (repo) => {
      const [organizationInfoResponse] = await tryCatch(
        getOrganizationInfoPure(repo.did, pdsDomain)
      );
      if (!organizationInfoResponse) {
        return null;
      }
      return {
        repo: { did: repo.did },
        organizationInfo: organizationInfoResponse.value,
      };
    })
  );

  const validOrganizations = organizationResults.filter(
    (org): org is NonNullable<typeof org> => org !== null
  );

  // Get activities for each organization
  const activitiesResults = await Promise.all(
    validOrganizations.map(async (organization) => {
      const [activitiesResponse] = await tryCatch(
        getAllClaimActivitiesPure(organization.repo.did, pdsDomain)
      );
      if (!activitiesResponse) {
        return null;
      }
      return {
        repo: organization.repo,
        activities: activitiesResponse.activities,
        organizationInfo: organization.organizationInfo,
      };
    })
  );

  return activitiesResults.filter(
    (activity): activity is NonNullable<typeof activity> => activity !== null
  );
};

/**
 * Factory to create the tRPC procedure for getting all claim activities across organizations.
 */
export const getAllClaimActivitiesAcrossOrganizationsFactory = <
  T extends SupportedPDSDomain,
>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(z.object({ pdsDomain: allowedPDSDomainSchema }))
    .query(async ({ input }) => {
      return getAllClaimActivitiesAcrossOrganizationsPure(input.pdsDomain);
    });
};
