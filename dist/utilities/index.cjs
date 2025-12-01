"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utilities/index.ts
var utilities_exports = {};
__export(utilities_exports, {
  getBlobUrl: () => getBlobUrl_default,
  parseAtUri: () => parseAtUri_default
});
module.exports = __toCommonJS(utilities_exports);

// src/utilities/getBlobUrl.ts
var import_api = require("@atproto/api");
var getBlobUrl = (did, imageData, pdsUrl) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof import_api.BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
  if (isBlobRef) {
    const ref = imageData.ref;
    const cid = typeof ref === "string" ? ref : ref?.$link ?? String(ref);
    const encodedCid = encodeURIComponent(cid);
    return `${pdsUrl}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }
  if (imageData.$type === "app.gainforest.common.defs#uri") {
    const uri = imageData.uri;
    return uri;
  }
  if (imageData.$type === "app.gainforest.common.defs#smallBlob" || imageData.$type === "app.gainforest.common.defs#largeBlob") {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsUrl);
  }
  if (imageData.$type === "app.gainforest.common.defs#smallImage" || imageData.$type === "app.gainforest.common.defs#largeImage") {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsUrl);
  }
  if ("blob" in imageData) {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsUrl);
  }
  if ("image" in imageData) {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsUrl);
  }
  if ("uri" in imageData) {
    const uri = imageData.uri;
    return uri;
  }
  const imageDataTypeCheck = imageData;
  return imageDataTypeCheck;
};
var getBlobUrl_default = getBlobUrl;

// src/utilities/parseAtUri.ts
var parseAtUri = (atUri) => {
  const cleanedAtUri = atUri.replace("at://", "");
  const [did, ...rest] = cleanedAtUri.split("/");
  let rkey = rest.at(-1) ?? "";
  return { did, rkey };
};
var parseAtUri_default = parseAtUri;
//# sourceMappingURL=index.cjs.map