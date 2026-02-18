import { createContext, createTRPCRouter, publicProcedure } from "../trpc";
import { uploadFileAsBlobFactory } from "./atproto/common/uploadFileAsBlob";
import { getOrganizationInfoFactory } from "./atproto/gainforest/organization/info/get";
import { getLocationFactory } from "./atproto/hypercerts/location/get";
import { getDefaultLocationFactory } from "./atproto/hypercerts/location/getDefault";
import { getMeasuredTreesFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/get";
import { createClaimActivityFactory } from "./atproto/hypercerts/claim/activity/create";
import { createOrUpdateOrganizationInfoFactory } from "./atproto/gainforest/organization/info/createOrUpdate";
import { createOrUpdateLayerFactory } from "./atproto/gainforest/organization/layer/createOrUpdate";
import { getAllLocationsFactory } from "./atproto/hypercerts/location/getAll";
import { createLocationFactory } from "./atproto/hypercerts/location/create";
import { updateLocationFactory } from "./atproto/hypercerts/location/update";
import { setDefaultLocationFactory } from "./atproto/hypercerts/location/setDefault";
import { deleteLocationFactory } from "./atproto/hypercerts/location/delete";
import { getAllClaimActivitiesAcrossOrganizationsFactory } from "./atproto/hypercerts/claim/activity/getAllAcrossOrgs";
import { getCliamActivityFactory } from "./atproto/hypercerts/claim/activity/get";
import { addMeasuredTreesClusterToProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/_addToProject";
import { removeMeasuredTreesClusterFromProjectFactory } from "./atproto/gainforest/organization/observations/measuredTreesCluster/_removeFromProject";
import { addLayersToProjectFactory } from "./atproto/gainforest/organization/layer/_addToProject";
import { removeLayersFromProjectFactory } from "./atproto/gainforest/organization/layer/_removeFromProject";
import { getLayerFactory } from "./atproto/gainforest/organization/layer/get";
import { getProjectFactory } from "./atproto/hypercerts/claim/project/get";
import { getAllProjectsFactory } from "./atproto/hypercerts/claim/project/getAll";
import { getAudioRecordingFactory } from "./atproto/gainforest/organization/recordings/audio/get";
import { getAllAudioRecordingsFactory } from "./atproto/gainforest/organization/recordings/audio/getAll";
import { createAudioRecordingFactory } from "./atproto/gainforest/organization/recordings/audio/create";
import { updateAudioRecordingFactory } from "./atproto/gainforest/organization/recordings/audio/update";
import { deleteAudioRecordingFactory } from "./atproto/gainforest/organization/recordings/audio/delete";

import type { SupportedPDSDomain } from "@/_internal/index";
import type { ATProtoSDK as HypercertsATProtoSDK } from "@hypercerts-org/sdk-core";
import z from "zod";
import { getAllLayersFactory } from "./atproto/gainforest/organization/layer/getAll";
import { getAllClaimActivitiesFactory } from "./atproto/hypercerts/claim/activity/getAll";

export class AppRouterFactory<T extends SupportedPDSDomain> {
  public allowedPDSDomains;
  public allowedPDSDomainSchema;
  public appRouter;
  private sdk: HypercertsATProtoSDK;

  constructor(_allowedPDSDomains: T[], sdk: HypercertsATProtoSDK) {
    this.allowedPDSDomains = _allowedPDSDomains;
    this.sdk = sdk;
    this.allowedPDSDomainSchema = z.enum(this.allowedPDSDomains);

    this.appRouter = createTRPCRouter({
      health: publicProcedure.query(() => ({ status: "ok" })),
      common: {
        uploadFileAsBlob: uploadFileAsBlobFactory(this.allowedPDSDomainSchema),
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
            createOrUpdate: createOrUpdateLayerFactory(
              this.allowedPDSDomainSchema
            ),
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
          recordings: {
            audio: {
              get: getAudioRecordingFactory(this.allowedPDSDomainSchema),
              getAll: getAllAudioRecordingsFactory(this.allowedPDSDomainSchema),
              create: createAudioRecordingFactory(this.allowedPDSDomainSchema),
              update: updateAudioRecordingFactory(this.allowedPDSDomainSchema),
              delete: deleteAudioRecordingFactory(this.allowedPDSDomainSchema),
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
          get: getLocationFactory(this.allowedPDSDomainSchema),
          getAll: getAllLocationsFactory(this.allowedPDSDomainSchema),
          create: createLocationFactory(this.allowedPDSDomainSchema),
          update: updateLocationFactory(this.allowedPDSDomainSchema),
          delete: deleteLocationFactory(this.allowedPDSDomainSchema),
          getDefault: getDefaultLocationFactory(this.allowedPDSDomainSchema),
          setDefault: setDefaultLocationFactory(this.allowedPDSDomainSchema),
        },
      },
    });
  }

  /**
   * Creates a server-side caller for the tRPC router.
   * Uses the HypercertsATProtoSDK instance provided at construction time.
   *
   * @returns A callable server-side tRPC client
   */
  getServerCaller = () => {
    return this.appRouter.createCaller(
      async () =>
        await createContext({ sdk: this.sdk, allowedPDSDomains: this.allowedPDSDomains })
    );
  };
}

export type AppRouter<T extends SupportedPDSDomain> =
  AppRouterFactory<T>["appRouter"];
