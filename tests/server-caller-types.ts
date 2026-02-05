import { GainForestSDK } from "../src/_internal";
import { GainForestSDK as SDKPublic } from "../src/_public";
import { GainForestSDK as SDKDist } from "../dist";

const mockSdk = {} as any;

const sdkInternal = new GainForestSDK(["climateai.org"], mockSdk);
const sdkPublic = new SDKPublic(["climateai.org"], mockSdk);
const sdkDist = new SDKDist(["climateai.org"], mockSdk);

const serverCallerInternal = sdkInternal.getServerCaller();
const serverCallerPublic = sdkPublic.getServerCaller();
const serverCallerDist = sdkDist.getServerCaller();
