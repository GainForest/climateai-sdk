import { z } from "zod";
import { getBlobUrl, parseAtUri } from "./utilities/atproto";
import { AppRouterFactory, type AppRouter } from "./server/routers/_app";
import type { ATProtoSDK } from "@hypercerts-org/sdk-core";

const supportedDomains = ["climateai.org", "gainforest.id"] as const;
export const supportedPDSDomainSchema = z.enum(supportedDomains);
const supportedPDSDomainsSchema = z.array(supportedPDSDomainSchema);
export type SupportedPDSDomain = (typeof supportedDomains)[number];

export class GainforestSDK<T extends SupportedPDSDomain> {
  public allowedPDSDomains;
  public appRouter;
  public getServerCaller;
  public utilities;

  constructor(_allowedPDSDomains: T[]) {
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
    const appRouterFactory = new AppRouterFactory<T>(this.allowedPDSDomains);
    this.appRouter = appRouterFactory.appRouter;
    this.getServerCaller = appRouterFactory.getServerCaller;
    this.utilities = {
      getBlobUrl: getBlobUrl<T>,
      parseAtUri,
    };
  }
}

export type { AppRouter, ATProtoSDK };
export { createContext } from "./server/trpc";
