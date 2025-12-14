'use strict';

var api = require('@atproto/api');
var superjson = require('superjson');
var z = require('zod');
var cid = require('multiformats/cid');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var superjson__default = /*#__PURE__*/_interopDefault(superjson);
var z__default = /*#__PURE__*/_interopDefault(z);

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

// src/_internal/utilities/atproto/parseAtUri.ts
var parseAtUri = (atUri) => {
  let cleanedAtUri = atUri.replace("at://", "");
  const splitUri = cleanedAtUri.split("/");
  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";
  return { did, collection, rkey };
};

// src/_internal/server/utils/claims.ts
var getEcocertsFromClaimActivities = (activitiesWithOrgInfo, pdsDomain) => {
  const ecocerts = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl = logo ? getBlobUrl(activityWithOrgInfo.repo.did, logo.image, pdsDomain) : null;
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
z__default.default.object({
  $type: z__default.default.literal("blob-ref-generator"),
  ref: z__default.default.object({
    $link: z__default.default.string()
  }),
  mimeType: z__default.default.string(),
  size: z__default.default.number()
});
var toBlobRef = (input) => {
  const validCID = cid.CID.parse(
    input.ref.$link
  );
  return api.BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size
  });
};

// src/_internal/lib/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Set) && !(value instanceof Map);
};

// src/_internal/utilities/transform/index.ts
var _serialize = (data) => {
  return JSON.parse(JSON.stringify(data));
};
var _deserialize = (data) => {
  const isObj = isObject(data);
  if (!isObj) {
    if (Array.isArray(data)) {
      return data.map(_deserialize);
    }
    return data;
  }
  if ("$type" in data && data.$type === "blob" && "ref" in data) {
    try {
      return toBlobRef(data);
    } catch {
      return data;
    }
  }
  const obj = data;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, _deserialize(value)])
  );
};
var customTransformer = {
  serialize: (object) => {
    const atprotoSerialized = _serialize(object);
    const serializedObject = superjson__default.default.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = superjson__default.default.deserialize(object);
    const deserializedObject = _deserialize(superjsonDeserialized);
    return deserializedObject;
  }
};
var serialize = (data) => {
  const result = customTransformer.serialize(data);
  return result;
};
var deserialize = (object) => {
  return customTransformer.deserialize(object);
};

exports.customTransformer = customTransformer;
exports.deserialize = deserialize;
exports.getBlobUrl = getBlobUrl;
exports.getEcocertsFromClaimActivities = getEcocertsFromClaimActivities;
exports.parseAtUri = parseAtUri;
exports.serialize = serialize;
//# sourceMappingURL=utilities.cjs.map
//# sourceMappingURL=utilities.cjs.map