import { b as $TypedObject, $ as $Typed, U as Uri$1, S as SmallBlob$1 } from './claim-CsQa9nQY.js';
import { BlobRef, ValidationResult } from '@atproto/lexicon';

/** Object containing a URI to external data */
interface Uri {
    $type?: 'app.gainforest.common.defs#uri';
    /** URI to external data */
    uri: string;
}
declare function isUri<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "uri">;
declare function validateUri<V>(v: V): ValidationResult<Uri & V>;
/** Object containing a blob to external data */
interface SmallBlob {
    $type?: 'app.gainforest.common.defs#smallBlob';
    /** Blob to external data (up to 10MB) */
    blob: BlobRef;
}
declare function isSmallBlob<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "smallBlob">;
declare function validateSmallBlob<V>(v: V): ValidationResult<SmallBlob & V>;
/** Object containing a blob to external data */
interface LargeBlob {
    $type?: 'app.gainforest.common.defs#largeBlob';
    /** Blob to external data (up to 100MB) */
    blob: BlobRef;
}
declare function isLargeBlob<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "largeBlob">;
declare function validateLargeBlob<V>(v: V): ValidationResult<LargeBlob & V>;
/** Object containing a small image */
interface SmallImage {
    $type?: 'app.gainforest.common.defs#smallImage';
    /** Image (up to 5MB) */
    image: BlobRef;
}
declare function isSmallImage<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "smallImage">;
declare function validateSmallImage<V>(v: V): ValidationResult<SmallImage & V>;
/** Object containing a large image */
interface LargeImage {
    $type?: 'app.gainforest.common.defs#largeImage';
    /** Image (up to 10MB) */
    image: BlobRef;
}
declare function isLargeImage<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "largeImage">;
declare function validateLargeImage<V>(v: V): ValidationResult<LargeImage & V>;
interface IndexedOrganization {
    $type?: 'app.gainforest.common.defs#indexedOrganization';
    /** The URI of the organization */
    id: string;
    /** The name of the organization */
    name: string;
}
declare function isIndexedOrganization<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "indexedOrganization">;
declare function validateIndexedOrganization<V>(v: V): ValidationResult<IndexedOrganization & V>;

type defs_IndexedOrganization = IndexedOrganization;
type defs_LargeBlob = LargeBlob;
type defs_LargeImage = LargeImage;
type defs_SmallBlob = SmallBlob;
type defs_SmallImage = SmallImage;
type defs_Uri = Uri;
declare const defs_isIndexedOrganization: typeof isIndexedOrganization;
declare const defs_isLargeBlob: typeof isLargeBlob;
declare const defs_isLargeImage: typeof isLargeImage;
declare const defs_isSmallBlob: typeof isSmallBlob;
declare const defs_isSmallImage: typeof isSmallImage;
declare const defs_isUri: typeof isUri;
declare const defs_validateIndexedOrganization: typeof validateIndexedOrganization;
declare const defs_validateLargeBlob: typeof validateLargeBlob;
declare const defs_validateLargeImage: typeof validateLargeImage;
declare const defs_validateSmallBlob: typeof validateSmallBlob;
declare const defs_validateSmallImage: typeof validateSmallImage;
declare const defs_validateUri: typeof validateUri;
declare namespace defs {
  export { type defs_IndexedOrganization as IndexedOrganization, type defs_LargeBlob as LargeBlob, type defs_LargeImage as LargeImage, type defs_SmallBlob as SmallBlob, type defs_SmallImage as SmallImage, type defs_Uri as Uri, defs_isIndexedOrganization as isIndexedOrganization, defs_isLargeBlob as isLargeBlob, defs_isLargeImage as isLargeImage, defs_isSmallBlob as isSmallBlob, defs_isSmallImage as isSmallImage, defs_isUri as isUri, defs_validateIndexedOrganization as validateIndexedOrganization, defs_validateLargeBlob as validateLargeBlob, defs_validateLargeImage as validateLargeImage, defs_validateSmallBlob as validateSmallBlob, defs_validateSmallImage as validateSmallImage, defs_validateUri as validateUri };
}

interface Main$4 {
    $type: 'app.certified.location';
    /** The version of the Location Protocol */
    lpVersion: string;
    /** The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system. */
    srs: string;
    /** An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point) */
    locationType: 'coordinate-decimal' | 'geojson-point' | (string & {});
    location: $Typed<Uri$1> | $Typed<SmallBlob$1> | {
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
declare function isMain$4<V>(v: V): v is $TypedObject<V, "app.certified.location", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;

declare namespace AppCertifiedLocation {
  export { type Main$4 as Main, type Main$4 as Record, isMain$4 as isMain, isMain$4 as isRecord, validateMain$4 as validateMain, validateMain$4 as validateRecord };
}

interface Main$3 {
    $type: 'app.gainforest.organization.measuredTrees';
    /** The uri pointing to the shapefile of the measured trees */
    shapefile: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.measuredTrees", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace AppGainforestOrganizationMeasuredTrees {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'app.gainforest.organization.defaultSite';
    /** The reference to the default site record in the PDS */
    site: string;
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
    shapefile: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    trees?: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
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
    coverImage?: SmallImage;
    logo?: SmallImage;
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

export { AppCertifiedLocation as A, type IndexedOrganization as I, type LargeImage as L, type Main as M, type SmallImage as S, type Uri as U, type SmallBlob as a, type LargeBlob as b, type Main$1 as c, type Main$2 as d, type Main$3 as e, type Main$4 as f, defs as g, AppGainforestOrganizationDefaultSite as h, AppGainforestOrganizationInfo as i, AppGainforestOrganizationMeasuredTrees as j, AppGainforestOrganizationSite as k };
