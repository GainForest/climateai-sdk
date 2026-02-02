'use strict';

var z = require('zod');
var cid = require('multiformats/cid');
var api = require('@atproto/api');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var z__default = /*#__PURE__*/_interopDefault(z);

// src/_internal/zod-schemas/blobref.ts
var BlobRefGeneratorSchema = z__default.default.object({
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
var toBlobRefGenerator = (blobRef) => {
  const json = blobRef.toJSON();
  return {
    $type: "blob-ref-generator",
    ref: json.ref,
    mimeType: json.mimeType,
    size: json.size
  };
};
var FileGeneratorSchema = z__default.default.object({
  name: z__default.default.string(),
  type: z__default.default.string(),
  dataBase64: z__default.default.string()
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

Object.defineProperty(exports, "BlobRef", {
  enumerable: true,
  get: function () { return api.BlobRef; }
});
exports.BlobRefGeneratorSchema = BlobRefGeneratorSchema;
exports.FileGeneratorSchema = FileGeneratorSchema;
exports.toBlobRef = toBlobRef;
exports.toBlobRefGenerator = toBlobRefGenerator;
exports.toFile = toFile;
exports.toFileGenerator = toFileGenerator;
//# sourceMappingURL=zod.cjs.map
//# sourceMappingURL=zod.cjs.map