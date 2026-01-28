import {
  type Uri as GFUri,
  type Image as GFImage,
  type ImageThumbnail as GFImageThumbnail,
} from "@/../lex-api/types/app/gainforest/common/defs";
import {
  type LargeBlob,
  type LargeImage,
  type SmallBlob,
  type SmallImage,
  type Uri,
} from "@/../lex-api/types/org/hypercerts/defs";
import type { $Typed } from "@/../lex-api/util";
import type { BlobRefGenerator } from "@/_internal/zod-schemas/blobref";
import { BlobRef } from "@atproto/api";
import { SupportedPDSDomain } from "../..";

type SupportedImageData =
  | string
  | BlobRef
  | BlobRefGenerator
  // org.hypercerts.defs types
  | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob>
  | Uri
  | SmallImage
  | LargeImage
  | SmallBlob
  | LargeBlob
  // app.gainforest.common.defs types
  | $Typed<GFUri | GFImage | GFImageThumbnail>
  | GFUri
  | GFImage
  | GFImageThumbnail;

const getBlobUrl = <T extends SupportedPDSDomain>(
  did: string,
  imageData: SupportedImageData,
  pdsDomain: T
) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }

  const isBlobRef =
    imageData instanceof BlobRef ||
    ("ref" in imageData && "mimeType" in imageData && "size" in imageData);
  if (isBlobRef) {
    const ref = imageData.ref as unknown as { $link?: string } | string;
    const cid = typeof ref === "string" ? ref : (ref?.$link ?? String(ref));
    const encodedCid = encodeURIComponent(cid);
    return `https://${pdsDomain}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }

  // Handle $Typed cases - URI types
  if (
    imageData.$type === "app.gainforest.common.defs#uri" ||
    imageData.$type === "org.hypercerts.defs#uri"
  ) {
    return imageData.uri;
  }

  // Handle org.hypercerts.defs blob types
  if (
    imageData.$type === "org.hypercerts.defs#smallBlob" ||
    imageData.$type === "org.hypercerts.defs#largeBlob"
  ) {
    return getBlobUrl(did, imageData.blob, pdsDomain);
  }

  // Handle org.hypercerts.defs image types (use 'image' property)
  if (
    imageData.$type === "org.hypercerts.defs#smallImage" ||
    imageData.$type === "org.hypercerts.defs#largeImage"
  ) {
    return getBlobUrl(did, imageData.image, pdsDomain);
  }

  // Handle app.gainforest.common.defs image types (use 'file' property)
  if (
    imageData.$type === "app.gainforest.common.defs#image" ||
    imageData.$type === "app.gainforest.common.defs#imageThumbnail"
  ) {
    return getBlobUrl(did, imageData.file, pdsDomain);
  }

  // Fallback for untyped objects - check by property presence
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

  // Line for compile time check that all cases are handled. THIS SHOULD NEVER BE REACHED.
  const imageDataTypeCheck = imageData satisfies never;
  return imageDataTypeCheck;
};

export { getBlobUrl };
