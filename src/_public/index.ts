export * from "../_internal";

import { GainforestSDK as SDKInternal } from "../_internal";

/**
 * Pre-configured ClimateAI SDK instance (`sdkInternal`) for ["climateai.org", "gainforest.id"] domains.
 * This comment applies to the `sdkInternal` instance created from `SDKInternal`.
 *
 * Note: The getServerCaller method now requires an ATProtoSDK instance.
 * See @climateai/sdk/oauth for OAuth configuration utilities.
 */
const sdkInternal = new SDKInternal(["climateai.org", "gainforest.id"]);
