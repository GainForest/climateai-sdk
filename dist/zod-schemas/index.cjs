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

// src/zod-schemas/index.ts
var zod_schemas_exports = {};
__export(zod_schemas_exports, {
  BlobRefGeneratorSchema: () => BlobRefGeneratorSchema,
  FileGeneratorSchema: () => FileGeneratorSchema,
  toBlobRef: () => toBlobRef,
  toBlobRefGenerator: () => toBlobRefGenerator,
  toFile: () => toFile,
  toFileGenerator: () => toFileGenerator
});
module.exports = __toCommonJS(zod_schemas_exports);

// src/zod-schemas/blobref.ts
var import_zod = __toESM(require("zod"), 1);
var import_cid = require("multiformats/cid");
var import_api = require("@atproto/api");
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
  return import_api.BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size
  });
};
var toBlobRefGenerator = (blobRef) => {
  const json = blobRef.toJSON();
  return {
    $type: "blob-ref-generator",
    ref: json.ref,
    mimeType: json.mimeType,
    size: json.size
  };
};

// src/zod-schemas/file.ts
var import_zod2 = __toESM(require("zod"), 1);
var FileGeneratorSchema = import_zod2.default.object({
  name: import_zod2.default.string(),
  type: import_zod2.default.string(),
  dataBase64: import_zod2.default.string()
});
var toFile = async (fileGenerator) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  return file;
};
var toFileGenerator = async (file) => {
  return {
    name: file.name,
    type: file.type,
    dataBase64: await file.arrayBuffer().then((buffer) => Buffer.from(buffer).toString("base64"))
  };
};
//# sourceMappingURL=index.cjs.map