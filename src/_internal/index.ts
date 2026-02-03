import { z } from "zod";
import { getBlobUrl, parseAtUri } from "./utilities/atproto";
import { AppRouterFactory, type AppRouter } from "./server/routers/_app";
import { createContext as createContextInternal } from "./server/trpc";
import type { ATProtoSDK as HypercertsATProtoSDK } from "@hypercerts-org/sdk-core";

const supportedDomains = ["climateai.org", "gainforest.id"] as const;
export const supportedPDSDomainSchema = z.enum(supportedDomains);
const supportedPDSDomainsSchema = z.array(supportedPDSDomainSchema);
export type SupportedPDSDomain = (typeof supportedDomains)[number];

export class GainForestSDK<T extends SupportedPDSDomain> {
  public allowedPDSDomains;
  public appRouter;
  public getServerCaller;
  public utilities;
  private sdk: HypercertsATProtoSDK;

  constructor(_allowedPDSDomains: T[], sdk: HypercertsATProtoSDK) {
    if (!Array.isArray(_allowedPDSDomains)) {
      throw new Error("Allowed domains must be an array");
    } else if (_allowedPDSDomains.length === 0) {
      throw new Error("There should be at least one allowed domain");
    }
    if (!supportedPDSDomainsSchema.safeParse(_allowedPDSDomains).success) {
      throw new Error(
        "One of the domains is not supported. Supported domains are: " +
          supportedDomains.join(", ") +
          ". Received domains: " +
          JSON.stringify(_allowedPDSDomains, null, 2)
      );
    }
    this.allowedPDSDomains = _allowedPDSDomains;
    this.sdk = sdk;
    const appRouterFactory = new AppRouterFactory<T>(this.allowedPDSDomains, this.sdk);
    this.appRouter = appRouterFactory.appRouter;
    this.getServerCaller = appRouterFactory.getServerCaller;
    this.utilities = {
      getBlobUrl: getBlobUrl<T>,
      parseAtUri,
    };
  }

  /**
   * Creates a tRPC context using the stored SDK instance.
   *
   * @param opts.req - Optional request object
   * @returns The tRPC context
   */
  createContext = (opts?: { req?: Request }) => {
    return createContextInternal({
      sdk: this.sdk,
      allowedPDSDomains: this.allowedPDSDomains,
      ...opts,
    });
  };
}

export type { AppRouter, HypercertsATProtoSDK };
