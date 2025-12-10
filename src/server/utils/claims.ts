import type { Ecocert } from "@/types/Ecocert";
import type { OrganizationWithClaims as OrganizationWithClaimsType } from "@/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getBlobUrl } from "@/utilities";
import type { SupportedPDSDomain } from "@/index";

export const getEcocertsFromClaims = (
  claimsWithOrgInfo: OrganizationWithClaimsType[],
  pdsDomain: SupportedPDSDomain
): Ecocert[] => {
  const ecocerts: Ecocert[] = [];
  for (const claimWithOrgInfo of claimsWithOrgInfo) {
    const logo = claimWithOrgInfo.organizationInfo.logo;
    const logoUrl =
      logo ?
        getBlobUrl(claimWithOrgInfo.repo.did, logo.image, pdsDomain)
      : null;
    for (const claim of claimWithOrgInfo.claims) {
      ecocerts.push({
        repo: {
          did: claimWithOrgInfo.repo.did,
        },
        organizationInfo: {
          name: claimWithOrgInfo.organizationInfo.displayName,
          logoUrl: logoUrl,
        },
        claim: claim,
      });
    }
  }
  return ecocerts;
};
