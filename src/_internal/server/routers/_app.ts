import { createContext, createTRPCRouter, publicProcedure } from "../trpc";
import { uploadFileAsBlobFactory } from "./atproto/common/uploadFileAsBlob";
import { loginFactory } from "./atproto/auth/login";
import { resumeFactory } from "./atproto/auth/resume";
import { logoutFactory } from "./atproto/auth/logout";
import { getOrganizationInfoFactory } from "./atproto/gainforest/organization/info/get";
import { getSiteFactory } from "./atproto/hypercerts/site/get";
import { getDefaultProjectSiteFactory } from "./atproto/hypercerts/site/getDefault";
import { getMeasuredTreesFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/get";
import { createClaimActivityFactory } from "./atproto/hypercerts/claim/activity/create";
import { createOrUpdateOrganizationInfoFactory } from "./atproto/gainforest/organization/info/createOrUpdate";
import { getAllSitesFactory } from "./atproto/hypercerts/site/getAll";
import { createSiteFactory } from "./atproto/hypercerts/site/create";
import { updateSiteFactory } from "./atproto/hypercerts/site/update";
import { setDefaultSiteFactory } from "./atproto/hypercerts/site/setDefault";
import { deleteSiteFactory } from "./atproto/hypercerts/site/delete";
import { getAllClaimActivitiesAcrossOrganizationsFactory } from "./atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getCliamActivityFactory } from "./atproto/hypercerts/claim/activity/get";
import { getCertifiedLocationFactory } from "./atproto/hypercerts/location/get";
import { addMeasuredTreesClusterToProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/_addToProject";
import { removeMeasuredTreesClusterFromProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/_removeFromProject";
import { addLayersToProjectFactory } from "./atproto/gainforest/organization/layer/_addToProject";
import { removeLayersFromProjectFactory } from "./atproto/gainforest/organization/layer/_removeFromProject";
import { getLayerFactory } from "./atproto/gainforest/organization/layer/get";
import { getProjectFactory } from "./atproto/hypercerts/claim/project/get";
import { getAllProjectsFactory } from "./atproto/hypercerts/claim/project/getAll";

import type { SupportedPDSDomain } from "@/_internal/index";
import z from "zod";
import { getAllLayersFactory } from "./atproto/gainforest/organization/layer/getAll";
import { getAllClaimActivitiesFactory } from "./atproto/hypercerts/claim/activity/getAll";
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
          layer: {
            get: getLayerFactory(this.allowedPDSDomainSchema),
            getAll: getAllLayersFactory(this.allowedPDSDomainSchema),
            addToProject: addLayersToProjectFactory(
              this.allowedPDSDomainSchema
            ),
            removeFromProject: removeLayersFromProjectFactory(
              this.allowedPDSDomainSchema
            ),
          },
          observations: {
            measuredTreesCluster: {
              get: getMeasuredTreesFactory(this.allowedPDSDomainSchema),
              addToProject: addMeasuredTreesClusterToProjectFactory(
                this.allowedPDSDomainSchema
              ),
              removeFromProject: removeMeasuredTreesClusterFromProjectFactory(
                this.allowedPDSDomainSchema
              ),
            },
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
            getAll: getAllClaimActivitiesFactory(this.allowedPDSDomainSchema),
          },
          project: {
            get: getProjectFactory(this.allowedPDSDomainSchema),
            getAll: getAllProjectsFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateOrganizationInfoFactory(
              this.allowedPDSDomainSchema
            ),
          },
        },
        location: {
          get: getCertifiedLocationFactory(this.allowedPDSDomainSchema),
        },
        site: {
          get: getSiteFactory(this.allowedPDSDomainSchema),
          getAll: getAllSitesFactory(this.allowedPDSDomainSchema),
          create: createSiteFactory(this.allowedPDSDomainSchema),
          update: updateSiteFactory(this.allowedPDSDomainSchema),
          delete: deleteSiteFactory(this.allowedPDSDomainSchema),
          getDefault: getDefaultProjectSiteFactory(this.allowedPDSDomainSchema),
          setDefault: setDefaultSiteFactory(this.allowedPDSDomainSchema),
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
