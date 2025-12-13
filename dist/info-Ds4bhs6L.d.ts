import { $TypedObject, $Typed } from './lex-api/util.js';
import { BlobRef, ValidationResult } from '@atproto/lexicon';

/** Object containing a URI to external data */
interface Uri$1 {
    $type?: 'app.gainforest.common.defs#uri';
    /** URI to external data */
    uri: string;
}
declare function isUri$1<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "uri">;
declare function validateUri$1<V>(v: V): ValidationResult<Uri$1 & V>;
/** Object containing a blob to external data */
interface SmallBlob$1 {
    $type?: 'app.gainforest.common.defs#smallBlob';
    /** Blob to external data (up to 10MB) */
    blob: BlobRef;
}
declare function isSmallBlob$1<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "smallBlob">;
declare function validateSmallBlob$1<V>(v: V): ValidationResult<SmallBlob$1 & V>;
/** Object containing a blob to external data */
interface LargeBlob$1 {
    $type?: 'app.gainforest.common.defs#largeBlob';
    /** Blob to external data (up to 100MB) */
    blob: BlobRef;
}
declare function isLargeBlob$1<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "largeBlob">;
declare function validateLargeBlob$1<V>(v: V): ValidationResult<LargeBlob$1 & V>;
/** Object containing a small image */
interface SmallImage$1 {
    $type?: 'app.gainforest.common.defs#smallImage';
    /** Image (up to 5MB) */
    image: BlobRef;
}
declare function isSmallImage$1<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "smallImage">;
declare function validateSmallImage$1<V>(v: V): ValidationResult<SmallImage$1 & V>;
/** Object containing a large image */
interface LargeImage$1 {
    $type?: 'app.gainforest.common.defs#largeImage';
    /** Image (up to 10MB) */
    image: BlobRef;
}
declare function isLargeImage$1<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "largeImage">;
declare function validateLargeImage$1<V>(v: V): ValidationResult<LargeImage$1 & V>;
interface IndexedOrganization {
    $type?: 'app.gainforest.common.defs#indexedOrganization';
    /** The URI of the organization */
    id: string;
    /** The name of the organization */
    name: string;
}
declare function isIndexedOrganization<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "indexedOrganization">;
declare function validateIndexedOrganization<V>(v: V): ValidationResult<IndexedOrganization & V>;

type defs$1_IndexedOrganization = IndexedOrganization;
declare const defs$1_isIndexedOrganization: typeof isIndexedOrganization;
declare const defs$1_validateIndexedOrganization: typeof validateIndexedOrganization;
declare namespace defs$1 {
  export { type defs$1_IndexedOrganization as IndexedOrganization, type LargeBlob$1 as LargeBlob, type LargeImage$1 as LargeImage, type SmallBlob$1 as SmallBlob, type SmallImage$1 as SmallImage, type Uri$1 as Uri, defs$1_isIndexedOrganization as isIndexedOrganization, isLargeBlob$1 as isLargeBlob, isLargeImage$1 as isLargeImage, isSmallBlob$1 as isSmallBlob, isSmallImage$1 as isSmallImage, isUri$1 as isUri, defs$1_validateIndexedOrganization as validateIndexedOrganization, validateLargeBlob$1 as validateLargeBlob, validateLargeImage$1 as validateLargeImage, validateSmallBlob$1 as validateSmallBlob, validateSmallImage$1 as validateSmallImage, validateUri$1 as validateUri };
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

interface Main$6 {
    $type: 'app.certified.location';
    /** The version of the Location Protocol */
    lpVersion: string;
    /** The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system. */
    srs: string;
    /** An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point) */
    locationType: 'coordinate-decimal' | 'geojson-point' | (string & {});
    location: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    /** Optional name for this location */
    name?: string;
    /** Optional description for this location */
    description?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$6<V>(v: V): v is $TypedObject<V, "app.certified.location", "main">;
declare function validateMain$6<V>(v: V): ValidationResult<Main$6 & V>;

declare namespace AppCertifiedLocation {
  export { type Main$6 as Main, type Main$6 as Record, isMain$6 as isMain, isMain$6 as isRecord, validateMain$6 as validateMain, validateMain$6 as validateRecord };
}

interface Main$5 {
    $type?: 'com.atproto.repo.strongRef';
    uri: string;
    cid: string;
}
declare function isMain$5<V>(v: V): v is $TypedObject<V, "com.atproto.repo.strongRef", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

declare namespace strongRef {
  export { type Main$5 as Main, isMain$5 as isMain, validateMain$5 as validateMain };
}

interface Main$4 {
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
    contributions?: Main$5[];
    rights?: Main$5;
    location?: Main$5;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$4<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;

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

type OrgHypercertsClaimActivity_WorkScope = WorkScope;
declare const OrgHypercertsClaimActivity_isWorkScope: typeof isWorkScope;
declare const OrgHypercertsClaimActivity_validateWorkScope: typeof validateWorkScope;
declare namespace OrgHypercertsClaimActivity {
  export { type Main$4 as Main, type Main$4 as Record, type OrgHypercertsClaimActivity_WorkScope as WorkScope, isMain$4 as isMain, isMain$4 as isRecord, OrgHypercertsClaimActivity_isWorkScope as isWorkScope, validateMain$4 as validateMain, validateMain$4 as validateRecord, OrgHypercertsClaimActivity_validateWorkScope as validateWorkScope };
}

interface Main$3 {
    $type: 'app.gainforest.organization.observations.measuredTreesCluster';
    shapefile: SmallBlob$1;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.measuredTreesCluster", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace AppGainforestOrganizationObservationsMeasuredTreesCluster {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'app.gainforest.organization.defaultSite';
    /** The reference to the default site record in the PDS */
    site: string;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.defaultSite", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace AppGainforestOrganizationDefaultSite {
  export { type Main$2 as Main, type Main$2 as Record, isMain$2 as isMain, isMain$2 as isRecord, validateMain$2 as validateMain, validateMain$2 as validateRecord };
}

interface Main$1 {
    $type: 'app.gainforest.organization.site';
    /** The name of the site */
    name: string;
    /** The latitude of the centerpoint of the site */
    lat: string;
    /** The longitude of the centerpoint of the site */
    lon: string;
    /** The area of the site in hectares */
    area: string;
    shapefile: SmallBlob$1;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.site", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace AppGainforestOrganizationSite {
  export { type Main$1 as Main, type Main$1 as Record, isMain$1 as isMain, isMain$1 as isRecord, validateMain$1 as validateMain, validateMain$1 as validateRecord };
}

interface Main {
    $type: 'app.gainforest.organization.info';
    /** The name of the organization or project */
    displayName: string;
    /** The description of the organization or project */
    shortDescription: string;
    /** The long description of the organization or project in markdown */
    longDescription: string;
    coverImage?: SmallImage$1;
    logo?: SmallImage$1;
    /** The objectives of the organization or project */
    objectives: ('Conservation' | 'Research' | 'Education' | 'Community' | 'Other')[];
    /** The start date of the organization or project */
    startDate?: string;
    /** The website of the organization or project */
    website?: string;
    /** The country of the organization or project in two letter code (ISO 3166-1 alpha-2) */
    country: string;
    /** The visibility of the organization or project in the Green Globe */
    visibility: 'Public' | 'Hidden';
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.info", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

type AppGainforestOrganizationInfo_Main = Main;
declare const AppGainforestOrganizationInfo_isMain: typeof isMain;
declare const AppGainforestOrganizationInfo_validateMain: typeof validateMain;
declare namespace AppGainforestOrganizationInfo {
  export { type AppGainforestOrganizationInfo_Main as Main, type Main as Record, AppGainforestOrganizationInfo_isMain as isMain, isMain as isRecord, AppGainforestOrganizationInfo_validateMain as validateMain, validateMain as validateRecord };
}

export { AppCertifiedLocation as A, type IndexedOrganization as I, type LargeImage$1 as L, type Main as M, OrgHypercertsClaimActivity as O, type SmallImage$1 as S, type Uri$1 as U, type Main$1 as a, type Main$2 as b, type Main$3 as c, type Main$4 as d, type Main$6 as e, type SmallBlob$1 as f, type LargeBlob$1 as g, type Uri as h, type SmallBlob as i, type Main$5 as j, defs$1 as k, AppGainforestOrganizationDefaultSite as l, AppGainforestOrganizationInfo as m, AppGainforestOrganizationObservationsMeasuredTreesCluster as n, AppGainforestOrganizationSite as o, defs as p, strongRef as s };
