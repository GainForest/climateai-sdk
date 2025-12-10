import { BlobRef, ValidationResult } from '@atproto/lexicon';

/**
 * GENERATED CODE - DO NOT MODIFY
 */

type OmitKey<T, K extends keyof T> = {
    [K2 in keyof T as K2 extends K ? never : K2]: T[K2];
};
type $Typed<V, T extends string = string> = V & {
    $type: T;
};
type Un$Typed<V extends {
    $type?: string;
}> = OmitKey<V, '$type'>;
type $Type<Id extends string, Hash extends string> = Hash extends 'main' ? Id : `${Id}#${Hash}`;
type $TypedObject<V, Id extends string, Hash extends string> = V extends {
    $type: $Type<Id, Hash>;
} ? V : V extends {
    $type?: string;
} ? V extends {
    $type?: infer T extends $Type<Id, Hash>;
} ? V & {
    $type: T;
} : never : V & {
    $type: $Type<Id, Hash>;
};

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
    $type: 'org.hypercerts.claim.activity';
    /** Title of the hypercert */
    title: string;
    /** Short blurb of the impact work done. */
    shortDescription: string;
    /** Optional longer description of the impact work done. */
    description?: string;
    image?: $Typed<Uri> | $Typed<SmallImage> | {
        $type: string;
    };
    workScope?: WorkScope;
    /** When the work began */
    startDate: string;
    /** When the work ended */
    endDate: string;
    /** A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution */
    contributions?: Main$1[];
    rights?: Main$1;
    location?: Main$1;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

/** Logical scope of the work using label-based conditions. All labels in `allOf` must apply; at least one label in `anyOf` must apply if provided; no label in `noneOf` may apply. */
interface WorkScope {
    $type?: 'org.hypercerts.claim.activity#workScope';
    /** Labels that MUST all hold for the scope to apply. */
    allOf?: string[];
    /** Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition. */
    anyOf?: string[];
    /** Labels that MUST NOT hold for the scope to apply. */
    noneOf?: string[];
}
declare function isWorkScope<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "workScope">;
declare function validateWorkScope<V>(v: V): ValidationResult<WorkScope & V>;

type OrgHypercertsClaimActivity_Main = Main;
type OrgHypercertsClaimActivity_WorkScope = WorkScope;
declare const OrgHypercertsClaimActivity_isMain: typeof isMain;
declare const OrgHypercertsClaimActivity_isWorkScope: typeof isWorkScope;
declare const OrgHypercertsClaimActivity_validateMain: typeof validateMain;
declare const OrgHypercertsClaimActivity_validateWorkScope: typeof validateWorkScope;
declare namespace OrgHypercertsClaimActivity {
  export { type OrgHypercertsClaimActivity_Main as Main, type Main as Record, type OrgHypercertsClaimActivity_WorkScope as WorkScope, OrgHypercertsClaimActivity_isMain as isMain, isMain as isRecord, OrgHypercertsClaimActivity_isWorkScope as isWorkScope, OrgHypercertsClaimActivity_validateMain as validateMain, validateMain as validateRecord, OrgHypercertsClaimActivity_validateWorkScope as validateWorkScope };
}

export { type $Typed as $, type Main as M, type OmitKey as O, type SmallBlob as S, type Uri as U, type $TypedObject as a, type Main$1 as b, type Un$Typed as c, OrgHypercertsClaimActivity as d, defs as e, strongRef as s };
