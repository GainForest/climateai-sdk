import { $ as $Typed, a as $TypedObject } from './util-CbiaqOMs.js';
import { ValidationResult } from '@atproto/lexicon';
import { U as Uri, S as SmallBlob } from './claim-D_fBggK-.js';
import { U as Uri$1, a as SmallBlob$1, S as SmallImage } from './defs-Cx3i2lOk.js';

interface Main$3 {
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
declare function isMain$3<V>(v: V): v is $TypedObject<V, "app.certified.location", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace AppCertifiedLocation {
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
    shapefile: $Typed<Uri$1> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    trees?: $Typed<Uri$1> | $Typed<SmallBlob$1> | {
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

export { AppCertifiedLocation as A, type Main as M, type Main$1 as a, type Main$2 as b, type Main$3 as c, AppGainforestOrganizationDefaultSite as d, AppGainforestOrganizationInfo as e, AppGainforestOrganizationSite as f };
