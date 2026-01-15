import { a as $TypedObject, V as ValidationResult, $ as $Typed } from './utils-BRYtkma9.js';
import { CID } from 'multiformats/cid';
import { z } from 'zod';

declare const jsonBlobRef: z.ZodUnion<[z.ZodObject<{
    $type: z.ZodLiteral<"blob">;
    ref: z.ZodEffects<z.ZodUnknown, CID, unknown>;
    mimeType: z.ZodString;
    size: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    $type: "blob";
    ref: CID;
    mimeType: string;
    size: number;
}, {
    $type: "blob";
    mimeType: string;
    size: number;
    ref?: unknown;
}>, z.ZodObject<{
    cid: z.ZodString;
    mimeType: z.ZodString;
}, "strict", z.ZodTypeAny, {
    mimeType: string;
    cid: string;
}, {
    mimeType: string;
    cid: string;
}>]>;
type JsonBlobRef = z.infer<typeof jsonBlobRef>;
declare class BlobRef {
    ref: CID;
    mimeType: string;
    size: number;
    original: JsonBlobRef;
    constructor(ref: CID, mimeType: string, size: number, original?: JsonBlobRef);
    static asBlobRef(obj: unknown): BlobRef | null;
    static fromJsonRef(json: JsonBlobRef): BlobRef;
    ipld(): JsonBlobRef;
    toJSON(): unknown;
}

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
    /** Title of the hypercert. */
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
    /** A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution. */
    contributions?: Main$1[];
    rights?: Main$1;
    /** An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location. */
    locations?: Main$1[];
    /** A reference (AT-URI) to the project record that this activity is part of. The record referenced must conform with the lexicon org.hypercerts.claim.project. This activity must also be referenced by the project, establishing a bidirectional link. */
    project?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

/** Logical scope of the work using label-based conditions. All labels in `withinAllOf` must apply; at least one label in `withinAnyOf` must apply if provided; no label in `withinNoneOf` may apply. */
interface WorkScope {
    $type?: 'org.hypercerts.claim.activity#workScope';
    /** Labels that MUST all hold for the scope to apply. */
    withinAllOf?: string[];
    /** Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition. */
    withinAnyOf?: string[];
    /** Labels that MUST NOT hold for the scope to apply. */
    withinNoneOf?: string[];
}
declare function isWorkScope<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "workScope">;
declare function validateWorkScope<V>(v: V): ValidationResult<WorkScope & V>;
interface ActivityWeight {
    $type?: 'org.hypercerts.claim.activity#activityWeight';
    activity: Main$1;
    /** The relative weight/importance of this hypercert activity (stored as a string to avoid float precision issues). Weights can be any positive numeric values and do not need to sum to a specific total; normalization can be performed by the consuming application as needed. */
    weight: string;
}
declare function isActivityWeight<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "activityWeight">;
declare function validateActivityWeight<V>(v: V): ValidationResult<ActivityWeight & V>;

type OrgHypercertsClaimActivity_ActivityWeight = ActivityWeight;
type OrgHypercertsClaimActivity_Main = Main;
type OrgHypercertsClaimActivity_WorkScope = WorkScope;
declare const OrgHypercertsClaimActivity_isActivityWeight: typeof isActivityWeight;
declare const OrgHypercertsClaimActivity_isMain: typeof isMain;
declare const OrgHypercertsClaimActivity_isWorkScope: typeof isWorkScope;
declare const OrgHypercertsClaimActivity_validateActivityWeight: typeof validateActivityWeight;
declare const OrgHypercertsClaimActivity_validateMain: typeof validateMain;
declare const OrgHypercertsClaimActivity_validateWorkScope: typeof validateWorkScope;
declare namespace OrgHypercertsClaimActivity {
  export { type OrgHypercertsClaimActivity_ActivityWeight as ActivityWeight, type OrgHypercertsClaimActivity_Main as Main, type Main as Record, type OrgHypercertsClaimActivity_WorkScope as WorkScope, OrgHypercertsClaimActivity_isActivityWeight as isActivityWeight, OrgHypercertsClaimActivity_isMain as isMain, isMain as isRecord, OrgHypercertsClaimActivity_isWorkScope as isWorkScope, OrgHypercertsClaimActivity_validateActivityWeight as validateActivityWeight, OrgHypercertsClaimActivity_validateMain as validateMain, validateMain as validateRecord, OrgHypercertsClaimActivity_validateWorkScope as validateWorkScope };
}

export { type ActivityWeight as A, BlobRef as B, type Main as M, OrgHypercertsClaimActivity as O, type SmallBlob as S, type Uri as U, type Main$1 as a, defs as d, strongRef as s };
