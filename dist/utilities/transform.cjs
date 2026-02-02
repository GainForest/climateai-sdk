'use strict';

var superjson = require('superjson');
var z = require('zod');
var cid = require('multiformats/cid');
var api = require('@atproto/api');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var superjson__default = /*#__PURE__*/_interopDefault(superjson);
var z__default = /*#__PURE__*/_interopDefault(z);

// src/_internal/utilities/transform/index.ts
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
exports.serialize = serialize;
//# sourceMappingURL=transform.cjs.map
//# sourceMappingURL=transform.cjs.map