import { GainforestSDK as SDKInternal } from "../src/_internal";
import { GainforestSDK as SDKPublic } from "../src/_public";
import { GainforestSDK as SDKDist } from "../dist";

const sdkInternal = new SDKInternal(["climateai.org", "hypercerts.org"]);
const sdkPublic = new SDKPublic(["climateai.org", "hypercerts.org"]);
const sdkDist = new SDKDist(["climateai.org", "hypercerts.org"]);

const serverCallerInternal = sdkInternal.getServerCaller();
const serverCallerPublic = sdkPublic.getServerCaller();
const serverCallerDist = sdkDist.getServerCaller();
