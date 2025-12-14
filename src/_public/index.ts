export * from "../_internal";

import { ClimateAiSDK as SDKInternal } from "../_internal";

const sdkInternal = new SDKInternal(["climateai.org", "hypercerts.org"]);
const serverCallerInternal = sdkInternal.getServerCaller();
