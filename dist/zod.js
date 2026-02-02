import z from 'zod';
import { CID } from 'multiformats/cid';
import { BlobRef } from '@atproto/api';
export { BlobRef } from '@atproto/api';

// src/_internal/zod-schemas/blobref.ts
var BlobRefGeneratorSchema = z.object({
  $type: z.literal("blob-ref-generator"),
  ref: z.object({
    $link: z.string()
  }),
  mimeType: z.string(),
  size: z.number()
});
var toBlobRef = (input) => {
  const validCID = CID.parse(
    input.ref.$link
  );
  return BlobRef.fromJsonRef({
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
var FileGeneratorSchema = z.object({
  name: z.string(),
  type: z.string(),
  dataBase64: z.string()
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

export { BlobRefGeneratorSchema, FileGeneratorSchema, toBlobRef, toBlobRefGenerator, toFile, toFileGenerator };
//# sourceMappingURL=zod.js.map
//# sourceMappingURL=zod.js.map