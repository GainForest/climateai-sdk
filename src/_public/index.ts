export * from "../_internal";

import { ClimateAiSDK as SDKInternal } from "../_internal";

/**
 * Pre-configured ClimateAI SDK instance for climateai.org and hypercerts.org domains.
 *
 * Note: The getServerCaller method now requires an ATProtoSDK instance.
 * See @climateai/sdk/oauth for OAuth configuration utilities.
 */
const sdkInternal = new SDKInternal(["climateai.org", "gainforest.id"]);
