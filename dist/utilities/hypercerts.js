// src/server/utils/claims.ts
import { getBlobUrl } from "@/utilities";
var getEcocertsFromClaimActivities = (activitiesWithOrgInfo, pdsDomain) => {
  const ecocerts = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl = logo ? getBlobUrl(activityWithOrgInfo.repo.did, logo.image, pdsDomain) : null;
    for (const activity of activityWithOrgInfo.activities) {
      ecocerts.push({
        repo: {
          did: activityWithOrgInfo.repo.did
        },
        organizationInfo: {
          name: activityWithOrgInfo.organizationInfo.displayName,
          logoUrl
        },
        claimActivity: activity
      });
    }
  }
  return ecocerts;
};
export {
  getEcocertsFromClaimActivities
};
//# sourceMappingURL=hypercerts.js.map