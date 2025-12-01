import { $ as $TypedObject, a as $Typed } from './util-B5oZwPdx.js';
import { BlobRef, ValidationResult } from '@atproto/lexicon';

/** Object containing a URI to external data */
interface Uri {
    $type?: 'org.hypercerts.defs#uri';
    /** URI to external data */
    uri: string;
}
declare function isUri<V>(v: V): v is $TypedObject<V, "org.hypercerts.defs", "uri">;
declare function validateUri<V>(v: V): ValidationResult<Uri & V>;
/** Object containing a blob to external data */
interface SmallBlob {
    $type?: 'org.hypercerts.defs#smallBlob';
    /** Blob to external data (up to 10MB) */
    blob: BlobRef;
}
declare function isSmallBlob<V>(v: V): v is $TypedObject<V, "org.hypercerts.defs", "smallBlob">;
declare function validateSmallBlob<V>(v: V): ValidationResult<SmallBlob & V>;
/** Object containing a blob to external data */
interface LargeBlob {
    $type?: 'org.hypercerts.defs#largeBlob';
    /** Blob to external data (up to 100MB) */
    blob: BlobRef;
}
declare function isLargeBlob<V>(v: V): v is $TypedObject<V, "org.hypercerts.defs", "largeBlob">;
declare function validateLargeBlob<V>(v: V): ValidationResult<LargeBlob & V>;
/** Object containing a small image */
interface SmallImage {
    $type?: 'org.hypercerts.defs#smallImage';
    /** Image (up to 5MB) */
    image: BlobRef;
}
declare function isSmallImage<V>(v: V): v is $TypedObject<V, "org.hypercerts.defs", "smallImage">;
declare function validateSmallImage<V>(v: V): ValidationResult<SmallImage & V>;
/** Object containing a large image */
interface LargeImage {
    $type?: 'org.hypercerts.defs#largeImage';
    /** Image (up to 10MB) */
    image: BlobRef;
}
declare function isLargeImage<V>(v: V): v is $TypedObject<V, "org.hypercerts.defs", "largeImage">;
declare function validateLargeImage<V>(v: V): ValidationResult<LargeImage & V>;

type defs_LargeBlob = LargeBlob;
type defs_LargeImage = LargeImage;
type defs_SmallBlob = SmallBlob;
type defs_SmallImage = SmallImage;
type defs_Uri = Uri;
declare const defs_isLargeBlob: typeof isLargeBlob;
declare const defs_isLargeImage: typeof isLargeImage;
declare const defs_isSmallBlob: typeof isSmallBlob;
declare const defs_isSmallImage: typeof isSmallImage;
declare const defs_isUri: typeof isUri;
declare const defs_validateLargeBlob: typeof validateLargeBlob;
declare const defs_validateLargeImage: typeof validateLargeImage;
declare const defs_validateSmallBlob: typeof validateSmallBlob;
declare const defs_validateSmallImage: typeof validateSmallImage;
declare const defs_validateUri: typeof validateUri;
declare namespace defs {
  export { type defs_LargeBlob as LargeBlob, type defs_LargeImage as LargeImage, type defs_SmallBlob as SmallBlob, type defs_SmallImage as SmallImage, type defs_Uri as Uri, defs_isLargeBlob as isLargeBlob, defs_isLargeImage as isLargeImage, defs_isSmallBlob as isSmallBlob, defs_isSmallImage as isSmallImage, defs_isUri as isUri, defs_validateLargeBlob as validateLargeBlob, defs_validateLargeImage as validateLargeImage, defs_validateSmallBlob as validateSmallBlob, defs_validateSmallImage as validateSmallImage, defs_validateUri as validateUri };
}

interface Main$1 {
    $type?: 'com.atproto.repo.strongRef';
    uri: string;
    cid: string;
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "com.atproto.repo.strongRef", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace strongRef {
  export { type Main$1 as Main, isMain$1 as isMain, validateMain$1 as validateMain };
}

interface Main {
    $type: 'org.hypercerts.claim.claim';
    /** Title of the hypercert */
    title: string;
    /** Short blurb of the impact work done. */
    shortDescription: string;
    /** Optional longer description of the impact work done. */
    description?: string;
    image?: $Typed<Uri> | $Typed<SmallImage> | {
        $type: string;
    };
    /** Scope of the work performed */
    workScope: string;
    /** When the work began */
    workTimeFrameFrom: string;
    /** When the work ended */
    workTimeFrameTo: string;
    /** Supporting evidence, documentation, or external data URIs */
    evidence?: Main$1[];
    /** A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contributions */
    contributions?: Main$1[];
    rights?: Main$1;
    location?: Main$1;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.claim", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

type OrgHypercertsClaimClaim_Main = Main;
declare const OrgHypercertsClaimClaim_isMain: typeof isMain;
declare const OrgHypercertsClaimClaim_validateMain: typeof validateMain;
declare namespace OrgHypercertsClaimClaim {
  export { type OrgHypercertsClaimClaim_Main as Main, type Main as Record, OrgHypercertsClaimClaim_isMain as isMain, isMain as isRecord, OrgHypercertsClaimClaim_validateMain as validateMain, validateMain as validateRecord };
}

export { type Main$1 as M, OrgHypercertsClaimClaim as O, type SmallBlob as S, type Uri as U, type Main as a, defs as d, strongRef as s };
