import { tryCatch } from "@/_internal/lib/tryCatch";
import { publicProcedure } from "@/_internal/server/trpc";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getOrganizationInfoPure } from "../../../gainforest/organization/info/get";
import { getAllClaimActivitiesPure } from "./getAll";
import { type Repo } from "@atproto/api/dist/client/types/com/atproto/sync/listRepos";
import {
  AppGainforestOrganizationInfo,
  OrgHypercertsClaimActivity,
} from "@/../lex-api";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import type { SupportedPDSDomain } from "@/_internal/index";

export type OrganizationWithActivities = {
  repo: Repo;
  organizationInfo: AppGainforestOrganizationInfo.Record;
  activities: GetRecordResponse<OrgHypercertsClaimActivity.Record>[];
};

export const getAllClaimActivitiesAcrossOrganizationsFactory = <
  T extends SupportedPDSDomain,
>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(z.object({ pdsDomain: allowedPDSDomainSchema }))
    .query(async ({ input }) => {
      const agent = getReadAgent(input.pdsDomain);

      // Get all the repositories
      const [repositoriesListResponse, repositoriesListFetchError] =
        await tryCatch(
          agent.com.atproto.sync.listRepos({
            limit: 150,
          })
        );
      if (
        repositoriesListFetchError ||
        repositoriesListResponse.success !== true
      ) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch repositories list",
        });
      }
      const repositoriesList = repositoriesListResponse.data.repos;

      // Filter the repositories that are organizations
      const [organizationRepositories, organizationsFetchError] =
        await tryCatch(
          Promise.all(
            repositoriesList.map(async (repo) => {
              const [organizationInfoResponse, organizationInfoFetchError] =
                await tryCatch(
                  getOrganizationInfoPure(repo.did, input.pdsDomain)
                );
              if (organizationInfoFetchError) {
                return null;
              }
              return {
                repo: repo,
                organizationInfo: organizationInfoResponse.value,
              };
            })
          )
        );
      if (organizationsFetchError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch organizations list",
        });
      }
      const validOrganizationRepositories = organizationRepositories.filter(
        (org): org is NonNullable<typeof org> => org !== null
      );

      // Get all the claim activities for the organizations
      const [activities, activitiesFetchError] = await tryCatch(
        Promise.all(
          validOrganizationRepositories.map(async (organization) => {
            const [activitiesResponse, activitiesFetchError] = await tryCatch(
              getAllClaimActivitiesPure(organization.repo.did, input.pdsDomain)
            );
            if (activitiesFetchError) {
              return null;
            }
            return {
              repo: organization.repo,
              activities: activitiesResponse.activities,
              organizationInfo: organization.organizationInfo,
            };
          })
        )
      );
      if (activitiesFetchError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch activities list",
        });
      }

      const validActivities = activities.filter(
        (activity): activity is NonNullable<typeof activity> =>
          activity !== null
      );
      return validActivities satisfies OrganizationWithActivities[];
    });
};
