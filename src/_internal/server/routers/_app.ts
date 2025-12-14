import { createContext, createTRPCRouter, publicProcedure } from "../trpc";
import { uploadFileAsBlobFactory } from "./atproto/common/uploadFileAsBlob";
import { loginFactory } from "./atproto/auth/login";
import { resumeFactory } from "./atproto/auth/resume";
import { logoutFactory } from "./atproto/auth/logout";
import { getOrganizationInfoFactory } from "./atproto/gainforest/organizationInfo/get";
import { getSiteFactory } from "./atproto/gainforest/site/get";
import { getDefaultProjectSiteFactory } from "./atproto/gainforest/site/getDefault";
import { getMeasuredTreesFactory } from "./atproto/gainforest/measuredTrees/get";
import { createClaimActivityFactory } from "./atproto/hypercerts/claim/activity/create";
import { createOrUpdateOrganizationInfoFactory } from "./atproto/gainforest/organizationInfo/createOrUpdate";
import { getAllSitesFactory } from "./atproto/gainforest/site/getAll";
import { createSiteFactory } from "./atproto/gainforest/site/create";
import { updateSiteFactory } from "./atproto/gainforest/site/update";
import { setDefaultSiteFactory } from "./atproto/gainforest/site/setDefault";
import { deleteSiteFactory } from "./atproto/gainforest/site/delete";
import { getAllClaimActivitiesAcrossOrganizationsFactory } from "./atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getCliamActivityFactory } from "./atproto/hypercerts/claim/activity/get";
import { getCertifiedLocationFactory } from "./atproto/hypercerts/location/get";
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
          },
          measuredTrees: {
            get: getMeasuredTreesFactory(this.allowedPDSDomainSchema),
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
