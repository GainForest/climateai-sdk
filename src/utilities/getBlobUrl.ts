import {
  type LargeBlob,
  type LargeImage,
  type SmallBlob,
  type SmallImage,
  type Uri,
} from "@/../lex-api/types/app/gainforest/common/defs";
import type { $Typed } from "@/../lex-api/util";
import type { BlobRefGenerator } from "@/zod-schemas/blobref";
import { BlobRef } from "@atproto/api";
import { SupportedPDSDomain } from "..";

const getBlobUrl = <T extends SupportedPDSDomain>(
  did: string,
  imageData:
    | string
    | BlobRef
    | BlobRefGenerator
    | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob>
    | Uri
    | SmallImage
    | LargeImage
    | SmallBlob
    | LargeBlob,
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

  // Handle $Typed cases
  if (imageData.$type === "app.gainforest.common.defs#uri") {
    const uri = imageData.uri;
    // TODO: handle other URI types
    // if (uri.startsWith("at://")) {
    //   const { did: uriDid, rkey: uriRkey } = parseAtUri(uri);
    //   return `${PDS_URL}/xrpc/com.atproto.repo.getRecord?did=${uriDid}&rkey=${uriRkey}`;
    // }
    return uri;
  }

  if (
    imageData.$type === "app.gainforest.common.defs#smallBlob" ||
    imageData.$type === "app.gainforest.common.defs#largeBlob"
  ) {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsDomain);
  }

  if (
    imageData.$type === "app.gainforest.common.defs#smallImage" ||
    imageData.$type === "app.gainforest.common.defs#largeImage"
  ) {
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

  // Line for compile time check that all cases are handled. THIS SHOULD NEVER BE REACHED.
  const imageDataTypeCheck = imageData satisfies never;
  return imageDataTypeCheck;
};

export default getBlobUrl;
