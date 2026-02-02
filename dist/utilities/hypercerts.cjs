'use strict';

var api = require('@atproto/api');

// src/_internal/utilities/atproto/getBlobUrl.ts
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof api.BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
  if (isBlobRef) {
    const ref = imageData.ref;
    const cid = typeof ref === "string" ? ref : ref?.$link ?? String(ref);
    const encodedCid = encodeURIComponent(cid);
    return `https://${pdsDomain}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }
  if (imageData.$type === "app.gainforest.common.defs#uri" || imageData.$type === "org.hypercerts.defs#uri") {
    return imageData.uri;
  }
  if (imageData.$type === "org.hypercerts.defs#smallBlob" || imageData.$type === "org.hypercerts.defs#largeBlob") {
    return getBlobUrl(did, imageData.blob, pdsDomain);
  }
  if (imageData.$type === "org.hypercerts.defs#smallImage" || imageData.$type === "org.hypercerts.defs#largeImage") {
    return getBlobUrl(did, imageData.image, pdsDomain);
  }
  if (imageData.$type === "app.gainforest.common.defs#image" || imageData.$type === "app.gainforest.common.defs#imageThumbnail") {
    return getBlobUrl(did, imageData.file, pdsDomain);
  }
  if ("blob" in imageData) {
    return getBlobUrl(did, imageData.blob, pdsDomain);
  }
  if ("image" in imageData) {
    return getBlobUrl(did, imageData.image, pdsDomain);
  }
  if ("file" in imageData) {
    return getBlobUrl(did, imageData.file, pdsDomain);
  }
  if ("uri" in imageData) {
    return imageData.uri;
  }
  const imageDataTypeCheck = imageData;
  return imageDataTypeCheck;
};

// src/_internal/server/utils/claims.ts
var getEcocertsFromClaimActivities = (activitiesWithOrgInfo, pdsDomain) => {
  const ecocerts = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl = logo ? getBlobUrl(activityWithOrgInfo.repo.did, logo.image, pdsDomain) : null;
    const coverImage = activityWithOrgInfo.organizationInfo.coverImage;
    const coverImageUrl = coverImage ? getBlobUrl(activityWithOrgInfo.repo.did, coverImage.image, pdsDomain) : null;
    for (const activity of activityWithOrgInfo.activities) {
      ecocerts.push({
        repo: {
          did: activityWithOrgInfo.repo.did
        },
        organizationInfo: {
          name: activityWithOrgInfo.organizationInfo.displayName,
          logoUrl,
          coverImageUrl
        },
        claimActivity: activity
      });
    }
  }
  return ecocerts;
};

exports.getEcocertsFromClaimActivities = getEcocertsFromClaimActivities;
//# sourceMappingURL=hypercerts.cjs.map
//# sourceMappingURL=hypercerts.cjs.map