import { checkOwnershipByAtUri } from "@/_internal/server/utils/ownership";
import { AppGainforestOrganizationProject } from "lex-api";

export const filterProjectByOwnership = (
  project: AppGainforestOrganizationProject.Record,
  userDid: string
): AppGainforestOrganizationProject.Record => {
  return {
    ...project,
    sites: project.sites.filter((site) => checkOwnershipByAtUri(site, userDid)),
    measuredTreesClusters: project.measuredTreesClusters.filter(
      (measuredTreesCluster) =>
        checkOwnershipByAtUri(measuredTreesCluster, userDid)
    ),
    layers: project.layers.filter((layer) =>
      checkOwnershipByAtUri(layer, userDid)
    ),
    ecocerts: project.ecocerts.filter((ecocert) =>
      checkOwnershipByAtUri(ecocert, userDid)
    ),
  };
};
