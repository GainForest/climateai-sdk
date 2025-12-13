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

// src/utilities/hypercerts.ts
var hypercerts_exports = {};
__export(hypercerts_exports, {
  getEcocertsFromClaimActivities: () => getEcocertsFromClaimActivities
});
module.exports = __toCommonJS(hypercerts_exports);

// src/utilities/getBlobUrl.ts
var import_api = require("@atproto/api");
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof import_api.BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
  if (isBlobRef) {
    const ref = imageData.ref;
    const cid = typeof ref === "string" ? ref : ref?.$link ?? String(ref);
    const encodedCid = encodeURIComponent(cid);
    return `https://${pdsDomain}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }
  if (imageData.$type === "app.gainforest.common.defs#uri") {
    const uri = imageData.uri;
    return uri;
  }
  if (imageData.$type === "app.gainforest.common.defs#smallBlob" || imageData.$type === "app.gainforest.common.defs#largeBlob") {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsDomain);
  }
  if (imageData.$type === "app.gainforest.common.defs#smallImage" || imageData.$type === "app.gainforest.common.defs#largeImage") {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsDomain);
  }
  if ("blob" in imageData) {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsDomain);
  }
  if ("image" in imageData) {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsDomain);
  }
  if ("uri" in imageData) {
    const uri = imageData.uri;
    return uri;
  }
  const imageDataTypeCheck = imageData;
  return imageDataTypeCheck;
};
var getBlobUrl_default = getBlobUrl;

// src/server/utils/claims.ts
var getEcocertsFromClaimActivities = (activitiesWithOrgInfo, pdsDomain) => {
  const ecocerts = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl = logo ? getBlobUrl_default(activityWithOrgInfo.repo.did, logo.image, pdsDomain) : null;
    for (const activity of activityWithOrgInfo.activities) {
      ecocerts.push({
        repo: {
          did: activityWithOrgInfo.repo.did
        },
        organizationInfo: {
          name: activityWithOrgInfo.organizationInfo.displayName,
          logoUrl
        },
        claimActivity: activity
      });
    }
  }
  return ecocerts;
};
//# sourceMappingURL=hypercerts.cjs.map