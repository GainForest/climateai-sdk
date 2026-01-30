import { BlobRef } from '@atproto/api';

// src/_internal/utilities/atproto/getBlobUrl.ts
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
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

// src/_internal/utilities/atproto/parseAtUri.ts
var parseAtUri = (atUri) => {
  let cleanedAtUri = atUri.replace("at://", "");
  const splitUri = cleanedAtUri.split("/");
  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";
  return { did, collection, rkey };
};

export { getBlobUrl, parseAtUri };
//# sourceMappingURL=atproto.js.map
//# sourceMappingURL=atproto.js.map