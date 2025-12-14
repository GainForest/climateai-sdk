import { createContext, createTRPCRouter, publicProcedure } from "../trpc";
import { uploadFileAsBlobFactory } from "./atproto/common/uploadFileAsBlob";
import { loginFactory } from "./atproto/auth/login";
import { resumeFactory } from "./atproto/auth/resume";
import { logoutFactory } from "./atproto/auth/logout";
import { getOrganizationInfoFactory } from "./atproto/gainforest/organization/info/get";
import { getSiteFactory } from "./atproto/gainforest/organization/site/get";
import { getDefaultProjectSiteFactory } from "./atproto/gainforest/organization/site/getDefault";
import { getMeasuredTreesFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/get";
import { createClaimActivityFactory } from "./atproto/hypercerts/claim/activity/create";
import { createOrUpdateOrganizationInfoFactory } from "./atproto/gainforest/organization/info/createOrUpdate";
import { getAllSitesFactory } from "./atproto/gainforest/organization/site/getAll";
import { createSiteFactory } from "./atproto/gainforest/organization/site/create";
import { updateSiteFactory } from "./atproto/gainforest/organization/site/update";
import { setDefaultSiteFactory } from "./atproto/gainforest/organization/site/setDefault";
import { deleteSiteFactory } from "./atproto/gainforest/organization/site/delete";
import { getAllClaimActivitiesAcrossOrganizationsFactory } from "./atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getCliamActivityFactory } from "./atproto/hypercerts/claim/activity/get";
import { getCertifiedLocationFactory } from "./atproto/hypercerts/location/get";
import { addSitesToProjectFactory } from "./atproto/gainforest/organization/site/addToProject";
import { removeSitesFromProjectFactory } from "./atproto/gainforest/organization/site/removeFromProject";
import { addMeasuredTreesClusterToProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/addToProject";
import { removeMeasuredTreesClusterFromProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/removeFromProject";
import { addLayersToProjectFactory } from "./atproto/gainforest/organization/layer/addToProject";
import { removeLayersFromProjectFactory } from "./atproto/gainforest/organization/layer/removeFromProject";
import { getLayerFactory } from "./atproto/gainforest/organization/layer/get";
import { getProjectFactory } from "./atproto/gainforest/organization/project/get";
import { getAllProjectsFactory } from "./atproto/gainforest/organization/project/getAll";

import type { SupportedPDSDomain } from "@/_internal/index";
import z from "zod";
export class AppRouterFactory<T extends SupportedPDSDomain> {
  public allowedPDSDomains;
  public allowedPDSDomainSchema;
  public appRouter;

  constructor(_allowedPDSDomains: T[]) {
    this.allowedPDSDomains = _allowedPDSDomains;
    this.allowedPDSDomainSchema = z.enum(this.allowedPDSDomains);

    this.appRouter = createTRPCRouter({
      health: publicProcedure.query(() => ({ status: "ok" })),
      common: {
        uploadFileAsBlob: uploadFileAsBlobFactory(this.allowedPDSDomainSchema),
      },
      auth: {
        login: loginFactory(this.allowedPDSDomainSchema),
        resume: resumeFactory(this.allowedPDSDomainSchema),
        logout: logoutFactory(this.allowedPDSDomainSchema),
      },
      gainforest: {
        organization: {
          info: {
            get: getOrganizationInfoFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateOrganizationInfoFactory(
              this.allowedPDSDomainSchema
            ),
          },
          project: {
            get: getProjectFactory(this.allowedPDSDomainSchema),
            getAll: getAllProjectsFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateOrganizationInfoFactory(
              this.allowedPDSDomainSchema
            ),
          },
          site: {
            get: getSiteFactory(this.allowedPDSDomainSchema),
            getAll: getAllSitesFactory(this.allowedPDSDomainSchema),
            create: createSiteFactory(this.allowedPDSDomainSchema),
            update: updateSiteFactory(this.allowedPDSDomainSchema),
            delete: deleteSiteFactory(this.allowedPDSDomainSchema),
            getDefault: getDefaultProjectSiteFactory(
              this.allowedPDSDomainSchema
            ),
            setDefault: setDefaultSiteFactory(this.allowedPDSDomainSchema),
            addToProject: addSitesToProjectFactory(this.allowedPDSDomainSchema),
            removeFromProject: removeSitesFromProjectFactory(
              this.allowedPDSDomainSchema
            ),
          },
          measuredTreesCluster: {
            get: getMeasuredTreesFactory(this.allowedPDSDomainSchema),
            addToProject: addMeasuredTreesClusterToProjectFactory(
              this.allowedPDSDomainSchema
            ),
            removeFromProject: removeMeasuredTreesClusterFromProjectFactory(
              this.allowedPDSDomainSchema
            ),
          },
          layers: {
            get: getLayerFactory(this.allowedPDSDomainSchema),
            addToProject: addLayersToProjectFactory(
              this.allowedPDSDomainSchema
            ),
            removeFromProject: removeLayersFromProjectFactory(
              this.allowedPDSDomainSchema
            ),
          },
        },
      },
      hypercerts: {
        claim: {
          activity: {
            create: createClaimActivityFactory(this.allowedPDSDomainSchema),
            getAllAcrossOrgs: getAllClaimActivitiesAcrossOrganizationsFactory(
              this.allowedPDSDomainSchema
            ),
            get: getCliamActivityFactory(this.allowedPDSDomainSchema),
          },
        },
        location: {
          get: getCertifiedLocationFactory(this.allowedPDSDomainSchema),
        },
      },
    });
  }

  getServerCaller = () => {
    return this.appRouter.createCaller(
      async () =>
        await createContext({ allowedPDSDomains: this.allowedPDSDomains })
    );
  };
}

export type AppRouter<T extends SupportedPDSDomain> =
  AppRouterFactory<T>["appRouter"];
