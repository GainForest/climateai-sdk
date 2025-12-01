"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var client_exports = {};
__export(client_exports, {
  createTRPCClient: () => createTRPCClient
});
module.exports = __toCommonJS(client_exports);
var import_client = require("@trpc/client");

// src/utilities/transformer.ts
var import_superjson = __toESM(require("superjson"), 1);

// src/zod-schemas/blobref.ts
var import_zod = __toESM(require("zod"), 1);
var import_cid = require("multiformats/cid");
var import_lexicon = require("@atproto/lexicon");
var BlobRefGeneratorSchema = import_zod.default.object({
  $type: import_zod.default.literal("blob-ref-generator"),
  ref: import_zod.default.object({
    $link: import_zod.default.string()
  }),
  mimeType: import_zod.default.string(),
  size: import_zod.default.number()
});
var toBlobRef = (input) => {
  const validCID = import_cid.CID.parse(
    input.ref.$link
  );
  return import_lexicon.BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size
  });
};

// src/lib/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Set) && !(value instanceof Map);
};

// src/utilities/transformer.ts
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
    const serializedObject = import_superjson.default.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = import_superjson.default.deserialize(object);
    const deserializedObject = _deserialize(superjsonDeserialized);
    return deserializedObject;
  }
};

// src/client/index.ts
var createTRPCClient = (trpcEndpoint) => (0, import_client.createTRPCProxyClient)({
  links: [
    (0, import_client.httpBatchLink)({
      url: trpcEndpoint,
      transformer: customTransformer
    })
  ]
});
//# sourceMappingURL=index.cjs.map