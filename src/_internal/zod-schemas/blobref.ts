import z from "zod";
import { CID } from "multiformats/cid";
import type { Version } from "multiformats/cid";
import { BlobRef } from "@atproto/api";

const BlobRefGeneratorSchema = z.object({
  $type: z.literal("blob-ref-generator"),
  ref: z.object({
    $link: z.string(),
  }),
  mimeType: z.string(),
  size: z.number(),
});

type BlobRefGenerator = z.infer<typeof BlobRefGeneratorSchema>;

const toBlobRef = (input: BlobRefGenerator) => {
  const validCID: CID<unknown, number, number, Version> = CID.parse(
    input.ref.$link
  );
  return BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size,
  });
};

const toBlobRefGenerator = (blobRef: BlobRef): BlobRefGenerator => {
  const json = blobRef.toJSON() as Omit<BlobRefGenerator, "$type"> & {
    $type: "blob";
  };
  return {
    $type: "blob-ref-generator",
    ref: json.ref,
    mimeType: json.mimeType,
    size: json.size,
  };
};

export {
  BlobRefGeneratorSchema,
  toBlobRef,
  toBlobRefGenerator,
  type BlobRefGenerator,
  BlobRef,
};
