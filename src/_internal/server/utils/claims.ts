import type { Ecocert } from "@/_internal/types/Ecocert";
import type { OrganizationWithActivities as OrganizationWithActivitiesType } from "@/_internal/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getBlobUrl } from "@/_internal/utilities/atproto";
import type { SupportedPDSDomain } from "@/_internal/index";

export const getEcocertsFromClaimActivities = (
  activitiesWithOrgInfo: OrganizationWithActivitiesType[],
  pdsDomain: SupportedPDSDomain
): Ecocert[] => {
  const ecocerts: Ecocert[] = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl =
      logo ?
        getBlobUrl(activityWithOrgInfo.repo.did, logo.image, pdsDomain)
      : null;
    for (const activity of activityWithOrgInfo.activities) {
      ecocerts.push({
        repo: {
          did: activityWithOrgInfo.repo.did,
        },
        organizationInfo: {
          name: activityWithOrgInfo.organizationInfo.displayName,
          logoUrl: logoUrl,
        },
        claimActivity: activity,
      });
    }
  }
  return ecocerts;
};
