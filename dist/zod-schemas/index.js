// src/zod-schemas/blobref.ts
import z from "zod";
import { CID } from "multiformats/cid";
import { BlobRef } from "@atproto/lexicon";
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

// src/zod-schemas/file.ts
import z2 from "zod";
var FileGeneratorSchema = z2.object({
  name: z2.string(),
  type: z2.string(),
  dataBase64: z2.string()
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
export {
  BlobRefGeneratorSchema,
  FileGeneratorSchema,
  toBlobRef,
  toBlobRefGenerator,
  toFile,
  toFileGenerator
};
//# sourceMappingURL=index.js.map