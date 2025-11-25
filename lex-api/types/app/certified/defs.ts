/**
 * Lightweight fallback definitions for app.certified.defs
 * The official generator omitted this file, but several lexicon types depend on it.
 */
import { BlobRef } from "@atproto/lexicon";

export interface Uri {
  $type?: "app.certified.defs#uri";
  uri: string;
}

export interface SmallBlob {
  $type?: "app.certified.defs#smallBlob";
  blob: BlobRef;
}

export interface LargeBlob {
  $type?: "app.certified.defs#largeBlob";
  blob: BlobRef;
}

export interface SmallImage {
  $type?: "app.certified.defs#smallImage";
  image: BlobRef;
}

export interface LargeImage {
  $type?: "app.certified.defs#largeImage";
  image: BlobRef;
}
