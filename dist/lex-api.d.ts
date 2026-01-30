import { ComAtprotoRepoListRecords, ComAtprotoRepoGetRecord, ComAtprotoRepoCreateRecord, ComAtprotoRepoPutRecord, ComAtprotoRepoDeleteRecord } from '@atproto/api';
import { L as LexiconDoc, b as LexUserType, V as ValidationResult, $ as $TypedObject, a as $Typed, O as OmitKey, U as Un$Typed } from './utils-BtB-jULs.js';
import { B as BlobRef, a as Main$m, S as SmallBlob, U as Uri, b as Main$n, c as SmallImage, M as Main$t } from './activity-BHO9ElRW.js';
export { f as AppBskyRichtextFacet, s as ComAtprotoRepoStrongRef, O as OrgHypercertsClaimActivity, d as OrgHypercertsDefs } from './activity-BHO9ElRW.js';
import { I as Image, A as Audio, V as Video, S as Spectrogram, f as IndexedOrganization, d as Main$o, e as Main$p, M as Main$q, a as Main$r, b as Main$s, c as Main$u } from './collection-DOapNLRU.js';
export { g as AppCertifiedLocation, h as AppGainforestCommonDefs, i as AppGainforestOrganizationDefaultSite, j as AppGainforestOrganizationInfo, k as AppGainforestOrganizationLayer, l as AppGainforestOrganizationObservationsMeasuredTreesCluster, O as OrgHypercertsClaimCollection, m as PubLeafletBlocksBlockquote, n as PubLeafletBlocksBskyPost, o as PubLeafletBlocksButton, p as PubLeafletBlocksCode, q as PubLeafletBlocksHeader, r as PubLeafletBlocksHorizontalRule, s as PubLeafletBlocksIframe, t as PubLeafletBlocksImage, u as PubLeafletBlocksMath, v as PubLeafletBlocksPage, w as PubLeafletBlocksPoll, x as PubLeafletBlocksText, y as PubLeafletBlocksUnorderedList, z as PubLeafletBlocksWebsite, B as PubLeafletPagesLinearDocument, C as PubLeafletRichtextFacet } from './collection-DOapNLRU.js';
import 'zod';
import 'multiformats/cid';

/**
 * A collection of compiled lexicons.
 */
declare class Lexicons implements Iterable<LexiconDoc> {
    docs: Map<string, LexiconDoc>;
    defs: Map<string, LexUserType>;
    constructor(docs?: Iterable<LexiconDoc>);
    /**
     * @example clone a lexicon:
     * ```ts
     * const clone = new Lexicons(originalLexicon)
     * ```
     *
     * @example get docs array:
     * ```ts
     * const docs = Array.from(lexicons)
     * ```
     */
    [Symbol.iterator](): Iterator<LexiconDoc>;
    /**
     * Add a lexicon doc.
     */
    add(doc: LexiconDoc): void;
    /**
     * Remove a lexicon doc.
     */
    remove(uri: string): void;
    /**
     * Get a lexicon doc.
     */
    get(uri: string): LexiconDoc | undefined;
    /**
     * Get a definition.
     */
    getDef(uri: string): LexUserType | undefined;
    /**
     * Get a def, throw if not found. Throws on not found.
     */
    getDefOrThrow<T extends LexUserType['type'] = LexUserType['type']>(uri: string, types?: readonly T[]): Extract<LexUserType, {
        type: T;
    }>;
    /**
     * Validate a record or object.
     */
    validate(lexUri: string, value: unknown): ValidationResult;
    /**
     * Validate a record and throw on any error.
     */
    assertValidRecord(lexUri: string, value: unknown): unknown;
    /**
     * Validate xrpc query params and throw on any error.
     */
    assertValidXrpcParams(lexUri: string, value: unknown): Record<string, unknown> | undefined;
    /**
     * Validate xrpc input body and throw on any error.
     */
    assertValidXrpcInput(lexUri: string, value: unknown): unknown;
    /**
     * Validate xrpc output body and throw on any error.
     */
    assertValidXrpcOutput(lexUri: string, value: unknown): unknown;
    /**
     * Validate xrpc subscription message and throw on any error.
     */
    assertValidXrpcMessage<T = unknown>(lexUri: string, value: unknown): T;
    /**
     * Resolve a lex uri given a ref
     */
    resolveLexUri(lexUri: string, ref: string): string;
}

type QueryParams$1 = Record<string, any>;
type HeadersMap = Record<string, string | undefined>;

type Gettable<T> = T | (() => T);
interface CallOptions$1 {
    encoding?: string;
    signal?: AbortSignal;
    headers?: HeadersMap;
}
declare class XRPCResponse {
    data: any;
    headers: HeadersMap;
    success: boolean;
    constructor(data: any, headers: HeadersMap);
}

type FetchHandler = (this: void, 
/**
 * The URL (pathname + query parameters) to make the request to, without the
 * origin. The origin (protocol, hostname, and port) must be added by this
 * {@link FetchHandler}, typically based on authentication or other factors.
 */
url: string, init: RequestInit) => Promise<Response>;
type FetchHandlerOptions = BuildFetchHandlerOptions | string | URL;
type BuildFetchHandlerOptions = {
    /**
     * The service URL to make requests to. This can be a string, URL, or a
     * function that returns a string or URL. This is useful for dynamic URLs,
     * such as a service URL that changes based on authentication.
     */
    service: Gettable<string | URL>;
    /**
     * Headers to be added to every request. If a function is provided, it will be
     * called on each request to get the headers. This is useful for dynamic
     * headers, such as authentication tokens that may expire.
     */
    headers?: {
        [_ in string]?: Gettable<null | string>;
    };
    /**
     * Bring your own fetch implementation. Typically useful for testing, logging,
     * mocking, or adding retries, session management, signatures, proof of
     * possession (DPoP), SSRF protection, etc. Defaults to the global `fetch`
     * function.
     */
    fetch?: typeof globalThis.fetch;
};
interface FetchHandlerObject {
    fetchHandler: (this: FetchHandlerObject, 
    /**
     * The URL (pathname + query parameters) to make the request to, without the
     * origin. The origin (protocol, hostname, and port) must be added by this
     * {@link FetchHandler}, typically based on authentication or other factors.
     */
    url: string, init: RequestInit) => Promise<Response>;
}

declare class XrpcClient {
    readonly fetchHandler: FetchHandler;
    readonly headers: Map<string, Gettable<string | null>>;
    readonly lex: Lexicons;
    constructor(fetchHandlerOpts: FetchHandler | FetchHandlerObject | FetchHandlerOptions, lex: Lexicons | Iterable<LexiconDoc>);
    setHeader(key: string, value: Gettable<null | string>): void;
    unsetHeader(key: string): void;
    clearHeaders(): void;
    call(methodNsid: string, params?: QueryParams$1, data?: unknown, opts?: CallOptions$1): Promise<XRPCResponse>;
}

/** A Decentralized Identifier (DID) string. */
interface Did {
    $type?: 'app.certified.defs#did';
    /** The DID string value. */
    did: string;
}
declare function isDid<V>(v: V): v is $TypedObject<V, "app.certified.defs", "did">;
declare function validateDid<V>(v: V): ValidationResult<Did & V>;

type defs$2_Did = Did;
declare const defs$2_isDid: typeof isDid;
declare const defs$2_validateDid: typeof validateDid;
declare namespace defs$2 {
  export { type defs$2_Did as Did, defs$2_isDid as isDid, defs$2_validateDid as validateDid };
}

interface Main$l {
    $type: 'app.certified.badge.definition';
    /** Category of the badge (e.g. endorsement, participation, affiliation). */
    badgeType: string;
    /** Human-readable title of the badge. */
    title: string;
    /** Icon representing the badge, stored as a blob for compact visual display. */
    icon: BlobRef;
    /** Optional short statement describing what the badge represents. */
    description?: string;
    /** Optional allowlist of DIDs allowed to issue this badge. If omitted, anyone may issue it. */
    allowedIssuers?: Did[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$l<V>(v: V): v is $TypedObject<V, "app.certified.badge.definition", "main">;
declare function validateMain$l<V>(v: V): ValidationResult<Main$l & V>;

declare namespace AppCertifiedBadgeDefinition {
  export { type Main$l as Main, type Main$l as Record, isMain$l as isMain, isMain$l as isRecord, validateMain$l as validateMain, validateMain$l as validateRecord };
}

interface Main$k {
    $type: 'app.certified.badge.award';
    badge: Main$l;
    subject: $Typed<Did> | $Typed<Main$m> | {
        $type: string;
    };
    /** Optional statement explaining the reason for this badge award. */
    note?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$k<V>(v: V): v is $TypedObject<V, "app.certified.badge.award", "main">;
declare function validateMain$k<V>(v: V): ValidationResult<Main$k & V>;

declare namespace AppCertifiedBadgeAward {
  export { type Main$k as Main, type Main$k as Record, isMain$k as isMain, isMain$k as isRecord, validateMain$k as validateMain, validateMain$k as validateRecord };
}

interface Main$j {
    $type: 'app.certified.badge.response';
    badgeAward: Main$k;
    /** The recipient’s response for the badge (accepted or rejected). */
    response: 'accepted' | 'rejected';
    /** Optional relative weight for accepted badges, assigned by the recipient. */
    weight?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$j<V>(v: V): v is $TypedObject<V, "app.certified.badge.response", "main">;
declare function validateMain$j<V>(v: V): ValidationResult<Main$j & V>;

declare namespace AppCertifiedBadgeResponse {
  export { type Main$j as Main, type Main$j as Record, isMain$j as isMain, isMain$j as isRecord, validateMain$j as validateMain, validateMain$j as validateRecord };
}

interface Main$i {
    $type: 'app.gainforest.dwc.event';
    /** An identifier for the event. Should be globally unique or unique within the dataset. */
    eventID: string;
    /** An identifier for the broader event that this event is part of (e.g., a survey campaign that contains multiple transects). */
    parentEventID?: string;
    /** AT-URI reference to the parent app.gainforest.dwc.event record. */
    parentEventRef?: string;
    /** The date or date range during which the event occurred. ISO 8601 format (e.g., '2024-03-15', '2024-03-15/2024-03-17'). */
    eventDate: string;
    /** The time or time range during which the event occurred. ISO 8601 format (e.g., '06:30:00', '06:30:00/09:00:00'). */
    eventTime?: string;
    /** A category or description of the habitat in which the event occurred (e.g., 'primary tropical rainforest', 'degraded pasture', 'riparian zone'). */
    habitat?: string;
    /** The names of, references to, or descriptions of the methods used during the event (e.g., 'camera trap array', 'line transect distance sampling', 'audio point count 10-min'). */
    samplingProtocol?: string;
    /** A numeric value for a measurement of the size of a sample in the event (e.g., '20', '0.25'). */
    sampleSizeValue?: string;
    /** The unit of measurement for the sampleSizeValue (e.g., 'square meters', 'hectares', 'trap-nights'). */
    sampleSizeUnit?: string;
    /** The amount of effort expended during the event (e.g., '3 person-hours', '14 trap-nights', '2 km transect walked'). */
    samplingEffort?: string;
    /** Notes or a reference to notes taken in the field about the event. */
    fieldNotes?: string;
    /** Comments or notes about the event. */
    eventRemarks?: string;
    /** Identifier for the location where the event occurred. */
    locationID?: string;
    /** Geographic latitude in decimal degrees (WGS84). Range: -90 to 90. */
    decimalLatitude?: string;
    /** Geographic longitude in decimal degrees (WGS84). Range: -180 to 180. */
    decimalLongitude?: string;
    /** The spatial reference system. Recommended: 'EPSG:4326'. */
    geodeticDatum?: string;
    /** Uncertainty radius in meters around the coordinates. */
    coordinateUncertaintyInMeters?: number;
    /** The name of the country. */
    country?: string;
    /** ISO 3166-1 alpha-2 country code. */
    countryCode?: string;
    /** First-level administrative division. */
    stateProvince?: string;
    /** Second-level administrative division. */
    county?: string;
    /** Third-level administrative division. */
    municipality?: string;
    /** Specific locality description. */
    locality?: string;
    /** Lower limit of elevation range in meters above sea level. */
    minimumElevationInMeters?: number;
    /** Upper limit of elevation range in meters above sea level. */
    maximumElevationInMeters?: number;
    /** Comments about the location. */
    locationRemarks?: string;
    /** Timestamp of record creation in the ATProto PDS. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$i<V>(v: V): v is $TypedObject<V, "app.gainforest.dwc.event", "main">;
declare function validateMain$i<V>(v: V): ValidationResult<Main$i & V>;

declare namespace AppGainforestDwcEvent {
  export { type Main$i as Main, type Main$i as Record, isMain$i as isMain, isMain$i as isRecord, validateMain$i as validateMain, validateMain$i as validateRecord };
}

interface Main$h {
    $type: 'app.gainforest.dwc.measurement';
    /** An identifier for the measurement. Should be unique within the dataset. */
    measurementID?: string;
    /** AT-URI reference to the app.gainforest.dwc.occurrence record this measurement belongs to. */
    occurrenceRef: string;
    /** The occurrenceID of the linked occurrence record (for cross-system interoperability). */
    occurrenceID?: string;
    /** The nature of the measurement, fact, characteristic, or assertion (e.g., 'DBH', 'tree height', 'canopy cover', 'tail length', 'body mass', 'soil pH', 'water temperature'). */
    measurementType: string;
    /** The value of the measurement, fact, characteristic, or assertion (e.g., '45.2', 'present', 'blue'). */
    measurementValue: string;
    /** The units for the measurementValue (e.g., 'cm', 'm', 'kg', 'mm', '%', 'degrees Celsius'). */
    measurementUnit?: string;
    /** The description of the potential error associated with the measurementValue (e.g., '0.5 cm', '5%'). */
    measurementAccuracy?: string;
    /** The description of or reference to the method used to determine the measurement (e.g., 'diameter tape at 1.3m height', 'laser rangefinder', 'Bitterlich method'). */
    measurementMethod?: string;
    /** Person(s) who determined the measurement. Pipe-delimited for multiple. */
    measurementDeterminedBy?: string;
    /** The date the measurement was made. ISO 8601 format. */
    measurementDeterminedDate?: string;
    /** Comments or notes accompanying the measurement. */
    measurementRemarks?: string;
    /** Timestamp of record creation in the ATProto PDS. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$h<V>(v: V): v is $TypedObject<V, "app.gainforest.dwc.measurement", "main">;
declare function validateMain$h<V>(v: V): ValidationResult<Main$h & V>;

declare namespace AppGainforestDwcMeasurement {
  export { type Main$h as Main, type Main$h as Record, isMain$h as isMain, isMain$h as isRecord, validateMain$h as validateMain, validateMain$h as validateRecord };
}

interface Main$g {
    $type: 'app.gainforest.dwc.occurrence';
    /** A globally unique identifier for the occurrence record. Recommended: a persistent URI (e.g., DOI, LSID, or UUID-based URI). */
    occurrenceID?: string;
    /** The specific nature of the data record. Must be one of the Darwin Core class names. */
    basisOfRecord: 'HumanObservation' | 'MachineObservation' | 'PreservedSpecimen' | 'LivingSpecimen' | 'FossilSpecimen' | 'MaterialSample' | 'MaterialEntity' | 'MaterialCitation';
    /** The Dublin Core type class that best describes the resource (dc:type). */
    dcType?: 'PhysicalObject' | 'StillImage' | 'MovingImage' | 'Sound' | 'Text' | 'Event' | 'Dataset';
    /** A legal document giving official permission to do something with the record. Recommended: a Creative Commons URI (e.g., 'http://creativecommons.org/licenses/by/4.0/'). */
    license?: string;
    /** Person or organization owning or managing rights over the resource. */
    rightsHolder?: string;
    /** The name or acronym of the institution having custody of the object(s) or information in the record. */
    institutionCode?: string;
    /** The name, acronym, or code identifying the collection or dataset from which the record was derived. */
    collectionCode?: string;
    /** The name identifying the dataset from which the record was derived. */
    datasetName?: string;
    /** A description of what information is withheld from this record and why (e.g., 'coordinates generalized to protect endangered species'). */
    informationWithheld?: string;
    /** A description of actions taken to make the data less specific or complete (e.g., 'coordinates rounded to nearest 0.1 degree'). */
    dataGeneralizations?: string;
    /** A related resource that is referenced, cited, or otherwise pointed to by the record (URL). */
    references?: string;
    /** Person(s) responsible for recording the occurrence in the field. Pipe-delimited for multiple (e.g., 'Jane Smith | John Doe'). */
    recordedBy?: string;
    /** Persistent identifier(s) (e.g., ORCID) of the person(s) who recorded. Pipe-delimited for multiple. */
    recordedByID?: string;
    /** The number of individuals present at the time of the occurrence. */
    individualCount?: number;
    /** A number or enumeration value for the quantity of organisms (e.g., '27', '12.5', 'many'). */
    organismQuantity?: string;
    /** The type of quantification system used for organismQuantity (e.g., 'individuals', '% biomass', 'stems/ha'). */
    organismQuantityType?: string;
    /** The sex of the biological individual(s). */
    sex?: 'male' | 'female' | 'hermaphrodite';
    /** The age class or life stage at the time of occurrence (e.g., 'adult', 'juvenile', 'larva', 'seedling', 'sapling'). */
    lifeStage?: string;
    /** The reproductive condition at the time of occurrence (e.g., 'flowering', 'fruiting', 'budding', 'pregnant'). */
    reproductiveCondition?: string;
    /** The behavior shown by the subject at the time of occurrence (e.g., 'foraging', 'nesting', 'roosting'). */
    behavior?: string;
    /** Statement about the presence or absence of a taxon at a location. */
    occurrenceStatus?: 'present' | 'absent';
    /** Comments or notes about the occurrence. */
    occurrenceRemarks?: string;
    /** Identifiers (URIs) of media associated with the occurrence. Pipe-delimited for multiple. */
    associatedMedia?: string;
    /** Identifiers (URIs) of literature associated with the occurrence. Pipe-delimited for multiple. */
    associatedReferences?: string;
    /** Identifiers (URIs) of genetic sequence information associated with the occurrence. Pipe-delimited for multiple. */
    associatedSequences?: string;
    /** Identifiers of other occurrences associated with this one (e.g., parasite-host). Pipe-delimited. */
    associatedOccurrences?: string;
    /** Identifier for the sampling event. Can be used to group occurrences from the same event. */
    eventID?: string;
    /** AT-URI reference to an app.gainforest.dwc.event record (for star-schema linkage). */
    eventRef?: string;
    /** The date or date-time (or interval) during which the occurrence was recorded. ISO 8601 format (e.g., '2024-03-15', '2024-03-15T10:30:00Z', '2024-03/2024-06'). */
    eventDate: string;
    /** The time of the event. ISO 8601 format (e.g., '14:30:00', '14:30:00+02:00'). */
    eventTime?: string;
    /** A description of the habitat in which the event occurred (e.g., 'tropical rainforest', 'mangrove swamp', 'montane cloud forest'). */
    habitat?: string;
    /** The method or protocol used during the event (e.g., 'camera trap', 'point count', 'mist net', '20m x 20m plot survey', 'acoustic monitoring'). */
    samplingProtocol?: string;
    /** The amount of effort expended during the event (e.g., '2 trap-nights', '30 minutes', '10 km transect'). */
    samplingEffort?: string;
    /** Notes or reference to notes taken in the field about the event. */
    fieldNotes?: string;
    /** Identifier for the location (e.g., a reference to a named site). */
    locationID?: string;
    /** Geographic latitude in decimal degrees (WGS84). Positive values are north of the Equator. Range: -90 to 90. */
    decimalLatitude?: string;
    /** Geographic longitude in decimal degrees (WGS84). Positive values are east of the Greenwich Meridian. Range: -180 to 180. */
    decimalLongitude?: string;
    /** The spatial reference system for the coordinates. Recommended: 'EPSG:4326' (WGS84). */
    geodeticDatum?: string;
    /** Horizontal distance (meters) from the given coordinates describing the smallest circle containing the whole location. */
    coordinateUncertaintyInMeters?: number;
    /** The name of the country or major administrative unit. */
    country?: string;
    /** The standard code for the country (ISO 3166-1 alpha-2). */
    countryCode?: string;
    /** The name of the next smaller administrative region than country. */
    stateProvince?: string;
    /** The full, unabbreviated name of the next smaller administrative region than stateProvince. */
    county?: string;
    /** The full, unabbreviated name of the next smaller administrative region than county. */
    municipality?: string;
    /** The specific description of the place (e.g., '500m upstream of bridge on Rio Pará'). */
    locality?: string;
    /** The original textual description of the place as provided by the recorder. */
    verbatimLocality?: string;
    /** The lower limit of the range of elevation (in meters above sea level). */
    minimumElevationInMeters?: number;
    /** The upper limit of the range of elevation (in meters above sea level). */
    maximumElevationInMeters?: number;
    /** The lesser depth of a range of depth below the local surface (in meters). */
    minimumDepthInMeters?: number;
    /** The greater depth of a range of depth below the local surface (in meters). */
    maximumDepthInMeters?: number;
    /** Comments about the location. */
    locationRemarks?: string;
    /** GBIF backbone taxonomy key for the identified taxon. Retained for backward compatibility with existing GainForest workflows. */
    gbifTaxonKey?: string;
    /** The full scientific name, with authorship and date if known (e.g., 'Centropyge flavicauda Fraser-Brunner 1933'). */
    scientificName: string;
    /** The authorship information for the scientific name (e.g., 'Fraser-Brunner 1933'). */
    scientificNameAuthorship?: string;
    /** The full scientific name of the kingdom (e.g., 'Animalia', 'Plantae', 'Fungi'). */
    kingdom?: string;
    /** The full scientific name of the phylum or division. */
    phylum?: string;
    /** The full scientific name of the class. */
    class?: string;
    /** The full scientific name of the order. */
    order?: string;
    /** The full scientific name of the family. */
    family?: string;
    /** The full scientific name of the genus. */
    genus?: string;
    /** The name of the species epithet of the scientificName. */
    specificEpithet?: string;
    /** The name of the lowest or terminal infraspecific epithet. */
    infraspecificEpithet?: string;
    /** The taxonomic rank of the most specific name in scientificName. */
    taxonRank?: 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'subfamily' | 'genus' | 'subgenus' | 'species' | 'subspecies' | 'variety' | 'form';
    /** A common or vernacular name for the taxon. */
    vernacularName?: string;
    /** The status of the use of the scientificName (e.g., 'accepted', 'synonym', 'doubtful'). */
    taxonomicStatus?: string;
    /** The nomenclatural code under which the scientificName is constructed. */
    nomenclaturalCode?: 'ICZN' | 'ICN' | 'ICNP' | 'ICTV' | 'BioCode';
    /** A complete list of taxa names terminating at the rank immediately superior to the taxon. Pipe-delimited (e.g., 'Animalia|Chordata|Mammalia|Rodentia|Ctenomyidae|Ctenomys'). */
    higherClassification?: string;
    /** Person(s) who assigned the taxon to the occurrence. Pipe-delimited for multiple. */
    identifiedBy?: string;
    /** Persistent identifier(s) (e.g., ORCID) of the person(s) who identified. Pipe-delimited. */
    identifiedByID?: string;
    /** The date on which the identification was made. ISO 8601 format. */
    dateIdentified?: string;
    /** A brief phrase or standard term qualifying the identification (e.g., 'cf. agrestis', 'aff. agrestis'). */
    identificationQualifier?: string;
    /** Comments or notes about the identification. */
    identificationRemarks?: string;
    /** Previous assignments of names to the occurrence. Pipe-delimited. */
    previousIdentifications?: string;
    /** Additional structured data as a valid JSON string (per Simple DwC Section 7.1). Example: '{"iucnStatus":"vulnerable","canopyCover":"85%"}'. Should be flattened to a single line with no non-printing characters. */
    dynamicProperties?: string;
    imageEvidence?: Image;
    audioEvidence?: Audio;
    videoEvidence?: Video;
    spectrogramEvidence?: Spectrogram;
    /** Timestamp of record creation in the ATProto PDS. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$g<V>(v: V): v is $TypedObject<V, "app.gainforest.dwc.occurrence", "main">;
declare function validateMain$g<V>(v: V): ValidationResult<Main$g & V>;

declare namespace AppGainforestDwcOccurrence {
  export { type Main$g as Main, type Main$g as Record, isMain$g as isMain, isMain$g as isRecord, validateMain$g as validateMain, validateMain$g as validateRecord };
}

/** Reference to a target record that is being evaluated. */
interface SubjectRef {
    $type?: 'app.gainforest.evaluator.defs#subjectRef';
    /** AT-URI of the target record. */
    uri: string;
    /** CID pinning the exact version of the target record. */
    cid?: string;
}
declare function isSubjectRef<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "subjectRef">;
declare function validateSubjectRef<V>(v: V): ValidationResult<SubjectRef & V>;
/** Provenance metadata describing the method used to produce an evaluation. */
interface MethodInfo {
    $type?: 'app.gainforest.evaluator.defs#methodInfo';
    /** Human-readable name of the method or model (e.g., 'GainForest BioClassifier'). */
    name: string;
    /** Version string of the method or model (e.g., '2.1.0'). */
    version?: string;
    /** Identifier for the specific model checkpoint used (e.g., date or hash). */
    modelCheckpoint?: string;
    /** URIs to papers, documentation, or repositories describing this method. */
    references?: string[];
}
declare function isMethodInfo<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "methodInfo">;
declare function validateMethodInfo<V>(v: V): ValidationResult<MethodInfo & V>;
/** A candidate taxon identification with confidence score and rank. */
interface CandidateTaxon {
    $type?: 'app.gainforest.evaluator.defs#candidateTaxon';
    /** Full scientific name of the candidate taxon. */
    scientificName: string;
    /** GBIF backbone taxonomy key for the candidate. */
    gbifTaxonKey?: string;
    /** Confidence score (0-1000, where 1000 = 100.0%). */
    confidence: number;
    /** Rank position among candidates (1 = best match). */
    rank: number;
    /** Kingdom of the candidate taxon. */
    kingdom?: string;
    /** Family of the candidate taxon. */
    family?: string;
    /** Genus of the candidate taxon. */
    genus?: string;
}
declare function isCandidateTaxon<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "candidateTaxon">;
declare function validateCandidateTaxon<V>(v: V): ValidationResult<CandidateTaxon & V>;
/** A single data quality flag indicating an issue with a specific field. */
interface QualityFlag {
    $type?: 'app.gainforest.evaluator.defs#qualityFlag';
    /** The field name that has the quality issue. */
    field: string;
    /** Description of the quality issue. */
    issue: string;
    /** Severity level of the quality issue. */
    severity?: 'error' | 'warning' | 'info' | (string & {});
}
declare function isQualityFlag<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "qualityFlag">;
declare function validateQualityFlag<V>(v: V): ValidationResult<QualityFlag & V>;
/** A single measurement derived by an evaluator from source data. */
interface DerivedMeasurement {
    $type?: 'app.gainforest.evaluator.defs#derivedMeasurement';
    /** The nature of the measurement (e.g., 'canopy cover', 'NDVI', 'tree height'). */
    measurementType: string;
    /** The value of the measurement. */
    measurementValue: string;
    /** The units for the measurement value (e.g., '%', 'm', 'kg'). */
    measurementUnit?: string;
    /** Description of the method used to obtain the measurement. */
    measurementMethod?: string;
}
declare function isDerivedMeasurement<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "derivedMeasurement">;
declare function validateDerivedMeasurement<V>(v: V): ValidationResult<DerivedMeasurement & V>;
/** AI or human species recognition result with ranked candidate identifications. */
interface SpeciesIdResult {
    $type?: 'app.gainforest.evaluator.defs#speciesIdResult';
    /** Ranked list of candidate species identifications. */
    candidates: CandidateTaxon[];
    /** Which feature of the subject record was used as input (e.g., 'mediaEvidence'). */
    inputFeature?: string;
    /** Additional notes about the species identification. */
    remarks?: string;
}
declare function isSpeciesIdResult<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "speciesIdResult">;
declare function validateSpeciesIdResult<V>(v: V): ValidationResult<SpeciesIdResult & V>;
/** Data quality assessment result with per-field quality flags. */
interface DataQualityResult {
    $type?: 'app.gainforest.evaluator.defs#dataQualityResult';
    /** List of quality issues found in the record. */
    flags: QualityFlag[];
    /** Overall completeness score (0-1000, where 1000 = 100.0%). */
    completenessScore?: number;
    /** Additional notes about the quality assessment. */
    remarks?: string;
}
declare function isDataQualityResult<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "dataQualityResult">;
declare function validateDataQualityResult<V>(v: V): ValidationResult<DataQualityResult & V>;
/** Expert verification result for a previous identification or evaluation. */
interface VerificationResult {
    $type?: 'app.gainforest.evaluator.defs#verificationResult';
    /** Verification status: confirmed, rejected, or uncertain. */
    status: 'confirmed' | 'rejected' | 'uncertain' | (string & {});
    /** Name of the person who performed the verification. */
    verifiedBy?: string;
    /** Persistent identifier (e.g., ORCID) of the verifier. */
    verifiedByID?: string;
    /** Notes about the verification decision. */
    remarks?: string;
    /** Suggested corrections if the original identification was rejected or uncertain. */
    suggestedCorrections?: string;
}
declare function isVerificationResult<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "verificationResult">;
declare function validateVerificationResult<V>(v: V): ValidationResult<VerificationResult & V>;
/** Generic categorical classification result (e.g., conservation priority, habitat type). */
interface ClassificationResult {
    $type?: 'app.gainforest.evaluator.defs#classificationResult';
    /** The classification category (e.g., 'conservation-priority', 'habitat-type'). */
    category: string;
    /** The assigned classification value (e.g., 'critical', 'tropical-rainforest'). */
    value: string;
    /** Additional notes about the classification. */
    remarks?: string;
}
declare function isClassificationResult<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "classificationResult">;
declare function validateClassificationResult<V>(v: V): ValidationResult<ClassificationResult & V>;
/** Derived measurements produced by an evaluator from source data (e.g., remote sensing metrics). */
interface MeasurementResult {
    $type?: 'app.gainforest.evaluator.defs#measurementResult';
    /** List of derived measurements. */
    measurements: DerivedMeasurement[];
    /** Additional notes about the measurements. */
    remarks?: string;
}
declare function isMeasurementResult<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.defs", "measurementResult">;
declare function validateMeasurementResult<V>(v: V): ValidationResult<MeasurementResult & V>;

type defs$1_CandidateTaxon = CandidateTaxon;
type defs$1_ClassificationResult = ClassificationResult;
type defs$1_DataQualityResult = DataQualityResult;
type defs$1_DerivedMeasurement = DerivedMeasurement;
type defs$1_MeasurementResult = MeasurementResult;
type defs$1_MethodInfo = MethodInfo;
type defs$1_QualityFlag = QualityFlag;
type defs$1_SpeciesIdResult = SpeciesIdResult;
type defs$1_SubjectRef = SubjectRef;
type defs$1_VerificationResult = VerificationResult;
declare const defs$1_isCandidateTaxon: typeof isCandidateTaxon;
declare const defs$1_isClassificationResult: typeof isClassificationResult;
declare const defs$1_isDataQualityResult: typeof isDataQualityResult;
declare const defs$1_isDerivedMeasurement: typeof isDerivedMeasurement;
declare const defs$1_isMeasurementResult: typeof isMeasurementResult;
declare const defs$1_isMethodInfo: typeof isMethodInfo;
declare const defs$1_isQualityFlag: typeof isQualityFlag;
declare const defs$1_isSpeciesIdResult: typeof isSpeciesIdResult;
declare const defs$1_isSubjectRef: typeof isSubjectRef;
declare const defs$1_isVerificationResult: typeof isVerificationResult;
declare const defs$1_validateCandidateTaxon: typeof validateCandidateTaxon;
declare const defs$1_validateClassificationResult: typeof validateClassificationResult;
declare const defs$1_validateDataQualityResult: typeof validateDataQualityResult;
declare const defs$1_validateDerivedMeasurement: typeof validateDerivedMeasurement;
declare const defs$1_validateMeasurementResult: typeof validateMeasurementResult;
declare const defs$1_validateMethodInfo: typeof validateMethodInfo;
declare const defs$1_validateQualityFlag: typeof validateQualityFlag;
declare const defs$1_validateSpeciesIdResult: typeof validateSpeciesIdResult;
declare const defs$1_validateSubjectRef: typeof validateSubjectRef;
declare const defs$1_validateVerificationResult: typeof validateVerificationResult;
declare namespace defs$1 {
  export { type defs$1_CandidateTaxon as CandidateTaxon, type defs$1_ClassificationResult as ClassificationResult, type defs$1_DataQualityResult as DataQualityResult, type defs$1_DerivedMeasurement as DerivedMeasurement, type defs$1_MeasurementResult as MeasurementResult, type defs$1_MethodInfo as MethodInfo, type defs$1_QualityFlag as QualityFlag, type defs$1_SpeciesIdResult as SpeciesIdResult, type defs$1_SubjectRef as SubjectRef, type defs$1_VerificationResult as VerificationResult, defs$1_isCandidateTaxon as isCandidateTaxon, defs$1_isClassificationResult as isClassificationResult, defs$1_isDataQualityResult as isDataQualityResult, defs$1_isDerivedMeasurement as isDerivedMeasurement, defs$1_isMeasurementResult as isMeasurementResult, defs$1_isMethodInfo as isMethodInfo, defs$1_isQualityFlag as isQualityFlag, defs$1_isSpeciesIdResult as isSpeciesIdResult, defs$1_isSubjectRef as isSubjectRef, defs$1_isVerificationResult as isVerificationResult, defs$1_validateCandidateTaxon as validateCandidateTaxon, defs$1_validateClassificationResult as validateClassificationResult, defs$1_validateDataQualityResult as validateDataQualityResult, defs$1_validateDerivedMeasurement as validateDerivedMeasurement, defs$1_validateMeasurementResult as validateMeasurementResult, defs$1_validateMethodInfo as validateMethodInfo, defs$1_validateQualityFlag as validateQualityFlag, defs$1_validateSpeciesIdResult as validateSpeciesIdResult, defs$1_validateSubjectRef as validateSubjectRef, defs$1_validateVerificationResult as validateVerificationResult };
}

interface Main$f {
    $type: 'app.gainforest.evaluator.evaluation';
    subject?: SubjectRef;
    /** Batch evaluation: multiple target records sharing the same result. Use this OR subject, not both. */
    subjects?: SubjectRef[];
    /** Identifier for the type of evaluation (must match one declared in the evaluator's service record). */
    evaluationType: string;
    result?: $Typed<SpeciesIdResult> | $Typed<DataQualityResult> | $Typed<VerificationResult> | $Typed<ClassificationResult> | $Typed<MeasurementResult> | {
        $type: string;
    };
    /** Overall confidence in this evaluation (0-1000, where 1000 = 100.0%). */
    confidence?: number;
    method?: MethodInfo;
    /** If true, this is a negation/withdrawal of a previous evaluation (like label negation). */
    neg?: boolean;
    /** AT-URI of a previous evaluation record that this one supersedes (e.g., model re-run with improved version). */
    supersedes?: string;
    /** Additional structured data as a JSON string. Escape hatch for experimental result types before they are formalized into the union. */
    dynamicProperties?: string;
    /** Timestamp of when this evaluation was produced. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$f<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.evaluation", "main">;
declare function validateMain$f<V>(v: V): ValidationResult<Main$f & V>;

declare namespace AppGainforestEvaluatorEvaluation {
  export { type Main$f as Main, type Main$f as Record, isMain$f as isMain, isMain$f as isRecord, validateMain$f as validateMain, validateMain$f as validateRecord };
}

interface Main$e {
    $type: 'app.gainforest.evaluator.service';
    policies: EvaluatorPolicies;
    /** Timestamp of when this evaluator service was declared. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$e<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.service", "main">;
declare function validateMain$e<V>(v: V): ValidationResult<Main$e & V>;

/** Policies declaring what this evaluator does and how it operates. */
interface EvaluatorPolicies {
    $type?: 'app.gainforest.evaluator.service#evaluatorPolicies';
    /** Whether this evaluator requires user subscription ('subscription') or processes all matching records ('open'). */
    accessModel?: 'open' | 'subscription' | (string & {});
    /** List of evaluation type identifiers this evaluator produces (e.g., 'species-id', 'data-quality'). */
    evaluationTypes: string[];
    /** Detailed definitions for each evaluation type, including human-readable descriptions. */
    evaluationTypeDefinitions?: EvaluationTypeDefinition[];
    /** NSIDs of record collections this evaluator can evaluate (e.g., 'app.gainforest.dwc.occurrence'). */
    subjectCollections?: string[];
}
declare function isEvaluatorPolicies<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.service", "evaluatorPolicies">;
declare function validateEvaluatorPolicies<V>(v: V): ValidationResult<EvaluatorPolicies & V>;
/** Definition of a single evaluation type produced by this evaluator. */
interface EvaluationTypeDefinition {
    $type?: 'app.gainforest.evaluator.service#evaluationTypeDefinition';
    /** The evaluation type identifier (must match an entry in evaluationTypes). */
    identifier: string;
    /** The lexicon reference for the result type (e.g., 'app.gainforest.evaluator.defs#speciesIdResult'). */
    resultType: string;
    method?: MethodInfo;
    /** Human-readable names and descriptions in various languages. */
    locales?: EvaluationTypeLocale[];
}
declare function isEvaluationTypeDefinition<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.service", "evaluationTypeDefinition">;
declare function validateEvaluationTypeDefinition<V>(v: V): ValidationResult<EvaluationTypeDefinition & V>;
/** Localized name and description for an evaluation type. */
interface EvaluationTypeLocale {
    $type?: 'app.gainforest.evaluator.service#evaluationTypeLocale';
    /** Language code (BCP-47, e.g., 'en', 'pt-BR'). */
    lang: string;
    /** Short human-readable name for this evaluation type. */
    name: string;
    /** Longer description of what this evaluation type does. */
    description: string;
}
declare function isEvaluationTypeLocale<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.service", "evaluationTypeLocale">;
declare function validateEvaluationTypeLocale<V>(v: V): ValidationResult<EvaluationTypeLocale & V>;

type AppGainforestEvaluatorService_EvaluationTypeDefinition = EvaluationTypeDefinition;
type AppGainforestEvaluatorService_EvaluationTypeLocale = EvaluationTypeLocale;
type AppGainforestEvaluatorService_EvaluatorPolicies = EvaluatorPolicies;
declare const AppGainforestEvaluatorService_isEvaluationTypeDefinition: typeof isEvaluationTypeDefinition;
declare const AppGainforestEvaluatorService_isEvaluationTypeLocale: typeof isEvaluationTypeLocale;
declare const AppGainforestEvaluatorService_isEvaluatorPolicies: typeof isEvaluatorPolicies;
declare const AppGainforestEvaluatorService_validateEvaluationTypeDefinition: typeof validateEvaluationTypeDefinition;
declare const AppGainforestEvaluatorService_validateEvaluationTypeLocale: typeof validateEvaluationTypeLocale;
declare const AppGainforestEvaluatorService_validateEvaluatorPolicies: typeof validateEvaluatorPolicies;
declare namespace AppGainforestEvaluatorService {
  export { type AppGainforestEvaluatorService_EvaluationTypeDefinition as EvaluationTypeDefinition, type AppGainforestEvaluatorService_EvaluationTypeLocale as EvaluationTypeLocale, type AppGainforestEvaluatorService_EvaluatorPolicies as EvaluatorPolicies, type Main$e as Main, type Main$e as Record, AppGainforestEvaluatorService_isEvaluationTypeDefinition as isEvaluationTypeDefinition, AppGainforestEvaluatorService_isEvaluationTypeLocale as isEvaluationTypeLocale, AppGainforestEvaluatorService_isEvaluatorPolicies as isEvaluatorPolicies, isMain$e as isMain, isMain$e as isRecord, AppGainforestEvaluatorService_validateEvaluationTypeDefinition as validateEvaluationTypeDefinition, AppGainforestEvaluatorService_validateEvaluationTypeLocale as validateEvaluationTypeLocale, AppGainforestEvaluatorService_validateEvaluatorPolicies as validateEvaluatorPolicies, validateMain$e as validateMain, validateMain$e as validateRecord };
}

interface Main$d {
    $type: 'app.gainforest.evaluator.subscription';
    /** DID of the evaluator service to subscribe to. */
    evaluator: string;
    /** Which of the user's record collections should be evaluated (NSIDs). Must be a subset of the evaluator's subjectCollections. If omitted, all supported collections are evaluated. */
    collections?: string[];
    /** Which evaluation types the user wants. If omitted, all types the evaluator supports are applied. */
    evaluationTypes?: string[];
    /** Timestamp of when this subscription was created. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$d<V>(v: V): v is $TypedObject<V, "app.gainforest.evaluator.subscription", "main">;
declare function validateMain$d<V>(v: V): ValidationResult<Main$d & V>;

declare namespace AppGainforestEvaluatorSubscription {
  export { type Main$d as Main, type Main$d as Record, isMain$d as isMain, isMain$d as isRecord, validateMain$d as validateMain, validateMain$d as validateRecord };
}

/**
 * GENERATED CODE - DO NOT MODIFY
 */

type QueryParams = {};
type InputSchema = undefined;
interface OutputSchema {
    organizations: IndexedOrganization[];
}
interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
}
interface Response$1 {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
declare function toKnownErr(e: any): any;

type AppGainforestOrganizationGetIndexedOrganizations_CallOptions = CallOptions;
type AppGainforestOrganizationGetIndexedOrganizations_InputSchema = InputSchema;
type AppGainforestOrganizationGetIndexedOrganizations_OutputSchema = OutputSchema;
type AppGainforestOrganizationGetIndexedOrganizations_QueryParams = QueryParams;
declare const AppGainforestOrganizationGetIndexedOrganizations_toKnownErr: typeof toKnownErr;
declare namespace AppGainforestOrganizationGetIndexedOrganizations {
  export { type AppGainforestOrganizationGetIndexedOrganizations_CallOptions as CallOptions, type AppGainforestOrganizationGetIndexedOrganizations_InputSchema as InputSchema, type AppGainforestOrganizationGetIndexedOrganizations_OutputSchema as OutputSchema, type AppGainforestOrganizationGetIndexedOrganizations_QueryParams as QueryParams, type Response$1 as Response, AppGainforestOrganizationGetIndexedOrganizations_toKnownErr as toKnownErr };
}

interface Main$c {
    $type: 'app.gainforest.organization.observations.dendogram';
    dendogram: SmallBlob;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$c<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.dendogram", "main">;
declare function validateMain$c<V>(v: V): ValidationResult<Main$c & V>;

declare namespace AppGainforestOrganizationObservationsDendogram {
  export { type Main$c as Main, type Main$c as Record, isMain$c as isMain, isMain$c as isRecord, validateMain$c as validateMain, validateMain$c as validateRecord };
}

interface Main$b {
    $type: 'app.gainforest.organization.observations.fauna';
    /** An array of GBIF taxon keys for each fauna observation */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$b<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.fauna", "main">;
declare function validateMain$b<V>(v: V): ValidationResult<Main$b & V>;

declare namespace AppGainforestOrganizationObservationsFauna {
  export { type Main$b as Main, type Main$b as Record, isMain$b as isMain, isMain$b as isRecord, validateMain$b as validateMain, validateMain$b as validateRecord };
}

interface Main$a {
    $type: 'app.gainforest.organization.observations.flora';
    /** An array of GBIF taxon keys for each flora observation */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$a<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.flora", "main">;
declare function validateMain$a<V>(v: V): ValidationResult<Main$a & V>;

declare namespace AppGainforestOrganizationObservationsFlora {
  export { type Main$a as Main, type Main$a as Record, isMain$a as isMain, isMain$a as isRecord, validateMain$a as validateMain, validateMain$a as validateRecord };
}

interface Main$9 {
    $type: 'app.gainforest.organization.predictions.fauna';
    /** An array of GBIF taxon keys for each fauna prediction */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$9<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.predictions.fauna", "main">;
declare function validateMain$9<V>(v: V): ValidationResult<Main$9 & V>;

declare namespace AppGainforestOrganizationPredictionsFauna {
  export { type Main$9 as Main, type Main$9 as Record, isMain$9 as isMain, isMain$9 as isRecord, validateMain$9 as validateMain, validateMain$9 as validateRecord };
}

interface Main$8 {
    $type: 'app.gainforest.organization.predictions.flora';
    /** An array of GBIF taxon keys for each flora prediction */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$8<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.predictions.flora", "main">;
declare function validateMain$8<V>(v: V): ValidationResult<Main$8 & V>;

declare namespace AppGainforestOrganizationPredictionsFlora {
  export { type Main$8 as Main, type Main$8 as Record, isMain$8 as isMain, isMain$8 as isRecord, validateMain$8 as validateMain, validateMain$8 as validateRecord };
}

interface Main$7 {
    $type: 'org.hypercerts.claim.attachment';
    /** References to the subject(s) the attachment is connected to—this may be an activity claim, outcome claim, measurement, evaluation, or even another attachment. This is optional as the attachment can exist before the claim is recorded. */
    subjects?: Main$m[];
    /** The type of attachment, e.g. report, audit, evidence, testimonial, methodology, etc. */
    contentType?: string;
    /** The files, documents, or external references included in this attachment record. */
    content: ($Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    })[];
    /** Title of this attachment. */
    title: string;
    /** Short summary of this attachment, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`. */
    shortDescription?: string;
    /** Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc). */
    shortDescriptionFacets?: Main$n[];
    /** Optional longer description of this attachment, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`. */
    description?: string;
    /** Rich text annotations for `description` (mentions, URLs, hashtags, etc). */
    descriptionFacets?: Main$n[];
    location?: Main$m;
    /** Client-declared timestamp when this record was originally created. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$7<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.attachment", "main">;
declare function validateMain$7<V>(v: V): ValidationResult<Main$7 & V>;

declare namespace OrgHypercertsClaimAttachment {
  export { type Main$7 as Main, type Main$7 as Record, isMain$7 as isMain, isMain$7 as isRecord, validateMain$7 as validateMain, validateMain$7 as validateRecord };
}

interface Main$6 {
    $type: 'org.hypercerts.claim.contributionDetails';
    /** Role or title of the contributor. */
    role?: string;
    /** What the contribution concretely was. */
    contributionDescription?: string;
    /** When this contribution started. This should be a subset of the hypercert timeframe. */
    startDate?: string;
    /** When this contribution finished. This should be a subset of the hypercert timeframe. */
    endDate?: string;
    /** Client-declared timestamp when this record was originally created. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$6<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.contributionDetails", "main">;
declare function validateMain$6<V>(v: V): ValidationResult<Main$6 & V>;

declare namespace OrgHypercertsClaimContributionDetails {
  export { type Main$6 as Main, type Main$6 as Record, isMain$6 as isMain, isMain$6 as isRecord, validateMain$6 as validateMain, validateMain$6 as validateRecord };
}

interface Main$5 {
    $type: 'org.hypercerts.claim.contributorInformation';
    /** DID or a URI to a social profile of the contributor. */
    identifier?: string;
    /** Display name of the contributor. */
    displayName?: string;
    image?: $Typed<Uri> | $Typed<SmallImage> | {
        $type: string;
    };
    /** Client-declared timestamp when this record was originally created. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$5<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.contributorInformation", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

declare namespace OrgHypercertsClaimContributorInformation {
  export { type Main$5 as Main, type Main$5 as Record, isMain$5 as isMain, isMain$5 as isRecord, validateMain$5 as validateMain, validateMain$5 as validateRecord };
}

/** Overall score for an evaluation on a numeric scale. */
interface Score {
    $type?: 'org.hypercerts.claim.evaluation#score';
    /** Minimum value of the scale, e.g. 0 or 1. */
    min: number;
    /** Maximum value of the scale, e.g. 5 or 10. */
    max: number;
    /** Score within the inclusive range [min, max]. */
    value: number;
}
declare function isScore<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evaluation", "score">;
declare function validateScore<V>(v: V): ValidationResult<Score & V>;
interface Main$4 {
    $type: 'org.hypercerts.claim.evaluation';
    subject?: Main$m;
    /** DIDs of the evaluators */
    evaluators: Did[];
    /** Evaluation data (URIs or blobs) containing detailed reports or methodology */
    content?: ($Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    })[];
    /** Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement */
    measurements?: Main$m[];
    /** Brief evaluation summary */
    summary: string;
    score?: Score;
    location?: Main$m;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$4<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evaluation", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;

type OrgHypercertsClaimEvaluation_Score = Score;
declare const OrgHypercertsClaimEvaluation_isScore: typeof isScore;
declare const OrgHypercertsClaimEvaluation_validateScore: typeof validateScore;
declare namespace OrgHypercertsClaimEvaluation {
  export { type Main$4 as Main, type Main$4 as Record, type OrgHypercertsClaimEvaluation_Score as Score, isMain$4 as isMain, isMain$4 as isRecord, OrgHypercertsClaimEvaluation_isScore as isScore, validateMain$4 as validateMain, validateMain$4 as validateRecord, OrgHypercertsClaimEvaluation_validateScore as validateScore };
}

interface Main$3 {
    $type: 'org.hypercerts.claim.measurement';
    subject?: Main$m;
    /** The metric being measured, e.g. forest area restored, number of users, etc. */
    metric: string;
    /** The unit of the measured value (e.g. kg CO₂e, hectares, %, index score). */
    unit: string;
    /** The measured numeric value. */
    value: string;
    /** The start date and time when the measurement began. */
    startDate?: string;
    /** The end date and time when the measurement ended. If it was a one time measurement, the endDate should be equal to the startDate. */
    endDate?: string;
    /** Optional geographic references related to where the measurement was taken. Each referenced record must conform with the app.certified.location lexicon. */
    locations?: Main$m[];
    /** Short identifier for the measurement methodology */
    methodType?: string;
    /** URI to methodology documentation, standard protocol, or measurement procedure */
    methodURI?: string;
    /** URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets) */
    evidenceURI?: string[];
    /** DIDs of the entity (or entities) that measured this data */
    measurers?: Did[];
    /** Short comment of this measurement, suitable for previews and list views. Rich text annotations may be provided via `commentFacets`. */
    comment?: string;
    /** Rich text annotations for `comment` (mentions, URLs, hashtags, etc). */
    commentFacets?: Main$n[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.measurement", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace OrgHypercertsClaimMeasurement {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'org.hypercerts.claim.rights';
    /** Full name of the rights */
    rightsName: string;
    /** Short rights identifier for easier search */
    rightsType: string;
    /** Description of the rights of this hypercert */
    rightsDescription: string;
    attachment?: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.rights", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace OrgHypercertsClaimRights {
  export { type Main$2 as Main, type Main$2 as Record, isMain$2 as isMain, isMain$2 as isRecord, validateMain$2 as validateMain, validateMain$2 as validateRecord };
}

interface Main$1 {
    $type: 'org.hypercerts.funding.receipt';
    from: Did;
    /** The recipient of the funds. Can be identified by DID or a clear-text name. */
    to: string;
    /** Amount of funding received. */
    amount: string;
    /** Currency of the payment (e.g. EUR, USD, ETH). */
    currency: string;
    /** How the funds were transferred (e.g. bank_transfer, credit_card, onchain, cash, check, payment_processor). */
    paymentRail?: string;
    /** Optional network within the payment rail (e.g. arbitrum, ethereum, sepa, visa, paypal). */
    paymentNetwork?: string;
    /** Identifier of the underlying payment transaction (e.g. bank reference, onchain transaction hash, or processor-specific ID). Use paymentNetwork to specify the network where applicable. */
    transactionId?: string;
    /** Optional reference to the activity, project, or organization this funding relates to. */
    for?: string;
    /** Optional notes or additional context for this funding receipt. */
    notes?: string;
    /** Timestamp when the payment occurred. */
    occurredAt?: string;
    /** Client-declared timestamp when this receipt record was created. */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "org.hypercerts.funding.receipt", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace OrgHypercertsFundingReceipt {
  export { type Main$1 as Main, type Main$1 as Record, isMain$1 as isMain, isMain$1 as isRecord, validateMain$1 as validateMain, validateMain$1 as validateRecord };
}

interface Main {
    $type: 'org.hypercerts.helper.workScopeTag';
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    /** Lowercase, hyphenated machine-readable key for this scope (e.g., 'ipfs', 'go-lang', 'filecoin'). */
    key: string;
    /** Human-readable label for this scope. */
    label: string;
    /** Category type of this scope. Recommended values: topic, language, domain, method, tag. */
    kind?: string;
    /** Optional longer description of this scope. */
    description?: string;
    parent?: Main$m;
    /** Optional array of alternative names or identifiers for this scope. */
    aliases?: string[];
    externalReference?: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.helper.workScopeTag", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

type OrgHypercertsHelperWorkScopeTag_Main = Main;
declare const OrgHypercertsHelperWorkScopeTag_isMain: typeof isMain;
declare const OrgHypercertsHelperWorkScopeTag_validateMain: typeof validateMain;
declare namespace OrgHypercertsHelperWorkScopeTag {
  export { type OrgHypercertsHelperWorkScopeTag_Main as Main, type Main as Record, OrgHypercertsHelperWorkScopeTag_isMain as isMain, isMain as isRecord, OrgHypercertsHelperWorkScopeTag_validateMain as validateMain, validateMain as validateRecord };
}

/** A geographic point with uncertainty, following Darwin Core Location class */
interface Geolocation {
    $type?: 'app.gainforest.dwc.defs#geolocation';
    /** Geographic latitude in decimal degrees (WGS84). Positive values north of the Equator, negative south. Range: -90 to 90. */
    decimalLatitude: string;
    /** Geographic longitude in decimal degrees (WGS84). Positive values east of the Greenwich Meridian, negative west. Range: -180 to 180. */
    decimalLongitude: string;
    /** Horizontal distance from the coordinates describing the smallest circle containing the whole location. Zero is not valid. */
    coordinateUncertaintyInMeters?: number;
    /** The ellipsoid, geodetic datum, or spatial reference system. Recommended: 'EPSG:4326' (WGS84) */
    geodeticDatum?: string;
}
declare function isGeolocation<V>(v: V): v is $TypedObject<V, "app.gainforest.dwc.defs", "geolocation">;
declare function validateGeolocation<V>(v: V): ValidationResult<Geolocation & V>;
/** A taxonomic identification with provenance metadata */
interface TaxonIdentification {
    $type?: 'app.gainforest.dwc.defs#taxonIdentification';
    /** The full scientific name including authorship and date */
    scientificName: string;
    /** GBIF backbone taxonomy key for the identified taxon */
    gbifTaxonKey?: string;
    /** Person(s) who made the identification (pipe-delimited for multiple) */
    identifiedBy?: string;
    /** ORCID or other persistent identifier for the person(s) who identified (pipe-delimited) */
    identifiedByID?: string;
    /** Date the identification was made (ISO 8601) */
    dateIdentified?: string;
    /** Uncertainty qualifier applied to the taxon name (e.g., 'cf. agrestis', 'aff. agrestis') */
    identificationQualifier?: string;
    /** Notes or comments about the identification */
    identificationRemarks?: string;
}
declare function isTaxonIdentification<V>(v: V): v is $TypedObject<V, "app.gainforest.dwc.defs", "taxonIdentification">;
declare function validateTaxonIdentification<V>(v: V): ValidationResult<TaxonIdentification & V>;
/** The specific nature of the data record. Controlled vocabulary per Darwin Core. */
type BasisOfRecordEnum = 'HumanObservation' | 'MachineObservation' | 'PreservedSpecimen' | 'LivingSpecimen' | 'FossilSpecimen' | 'MaterialSample' | 'MaterialEntity' | 'MaterialCitation' | (string & {});
/** Statement about the presence or absence of a taxon at a location. */
type OccurrenceStatusEnum = 'present' | 'absent' | (string & {});
/** Dublin Core type vocabulary for the nature of the resource. */
type DublinCoreTypeEnum = 'PhysicalObject' | 'StillImage' | 'MovingImage' | 'Sound' | 'Text' | 'Event' | 'Dataset' | (string & {});
/** The nomenclatural code under which the scientific name is constructed. */
type NomenclaturalCodeEnum = 'ICZN' | 'ICN' | 'ICNP' | 'ICTV' | 'BioCode' | (string & {});
/** The sex of the biological individual(s) represented in the occurrence. */
type SexEnum = 'male' | 'female' | 'hermaphrodite' | (string & {});
/** The taxonomic rank of the most specific name in the scientificName. */
type TaxonRankEnum = 'kingdom' | 'phylum' | 'class' | 'order' | 'family' | 'subfamily' | 'genus' | 'subgenus' | 'species' | 'subspecies' | 'variety' | 'form' | (string & {});

type defs_BasisOfRecordEnum = BasisOfRecordEnum;
type defs_DublinCoreTypeEnum = DublinCoreTypeEnum;
type defs_Geolocation = Geolocation;
type defs_NomenclaturalCodeEnum = NomenclaturalCodeEnum;
type defs_OccurrenceStatusEnum = OccurrenceStatusEnum;
type defs_SexEnum = SexEnum;
type defs_TaxonIdentification = TaxonIdentification;
type defs_TaxonRankEnum = TaxonRankEnum;
declare const defs_isGeolocation: typeof isGeolocation;
declare const defs_isTaxonIdentification: typeof isTaxonIdentification;
declare const defs_validateGeolocation: typeof validateGeolocation;
declare const defs_validateTaxonIdentification: typeof validateTaxonIdentification;
declare namespace defs {
  export { type defs_BasisOfRecordEnum as BasisOfRecordEnum, type defs_DublinCoreTypeEnum as DublinCoreTypeEnum, type defs_Geolocation as Geolocation, type defs_NomenclaturalCodeEnum as NomenclaturalCodeEnum, type defs_OccurrenceStatusEnum as OccurrenceStatusEnum, type defs_SexEnum as SexEnum, type defs_TaxonIdentification as TaxonIdentification, type defs_TaxonRankEnum as TaxonRankEnum, defs_isGeolocation as isGeolocation, defs_isTaxonIdentification as isTaxonIdentification, defs_validateGeolocation as validateGeolocation, defs_validateTaxonIdentification as validateTaxonIdentification };
}

/**
 * The following lines are added by lex-api-mod.ts to fix build errors.
 */

declare const PUB_LEAFLET_PAGES: {
    LinearDocumentTextAlignLeft: string;
    LinearDocumentTextAlignCenter: string;
    LinearDocumentTextAlignRight: string;
    LinearDocumentTextAlignJustify: string;
};
declare class AtpBaseClient extends XrpcClient {
    app: AppNS;
    com: ComNS;
    org: OrgNS;
    pub: PubNS;
    constructor(options: FetchHandler | FetchHandlerOptions);
    /** @deprecated use `this` instead */
    get xrpc(): XrpcClient;
}
declare class AppNS {
    _client: XrpcClient;
    bsky: AppBskyNS;
    certified: AppCertifiedNS;
    gainforest: AppGainforestNS;
    constructor(client: XrpcClient);
}
declare class AppBskyNS {
    _client: XrpcClient;
    richtext: AppBskyRichtextNS;
    constructor(client: XrpcClient);
}
declare class AppBskyRichtextNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
}
declare class AppCertifiedNS {
    _client: XrpcClient;
    location: AppCertifiedLocationRecord;
    badge: AppCertifiedBadgeNS;
    constructor(client: XrpcClient);
}
declare class AppCertifiedBadgeNS {
    _client: XrpcClient;
    award: AppCertifiedBadgeAwardRecord;
    definition: AppCertifiedBadgeDefinitionRecord;
    response: AppCertifiedBadgeResponseRecord;
    constructor(client: XrpcClient);
}
declare class AppCertifiedBadgeAwardRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$k;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$k;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$k>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$k>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppCertifiedBadgeDefinitionRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$l;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$l;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$l>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$l>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppCertifiedBadgeResponseRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$j;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$j;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$j>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$j>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppCertifiedLocationRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$o;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$o;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$o>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$o>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestNS {
    _client: XrpcClient;
    dwc: AppGainforestDwcNS;
    evaluator: AppGainforestEvaluatorNS;
    organization: AppGainforestOrganizationNS;
    constructor(client: XrpcClient);
}
declare class AppGainforestDwcNS {
    _client: XrpcClient;
    event: AppGainforestDwcEventRecord;
    measurement: AppGainforestDwcMeasurementRecord;
    occurrence: AppGainforestDwcOccurrenceRecord;
    constructor(client: XrpcClient);
}
declare class AppGainforestDwcEventRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$i;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$i;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$i>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$i>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestDwcMeasurementRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$h;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$h;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$h>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$h>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestDwcOccurrenceRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$g;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$g;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$g>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$g>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestEvaluatorNS {
    _client: XrpcClient;
    evaluation: AppGainforestEvaluatorEvaluationRecord;
    service: AppGainforestEvaluatorServiceRecord;
    subscription: AppGainforestEvaluatorSubscriptionRecord;
    constructor(client: XrpcClient);
}
declare class AppGainforestEvaluatorEvaluationRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$f;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$f;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$f>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$f>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestEvaluatorServiceRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$e;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$e;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$e>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$e>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestEvaluatorSubscriptionRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$d;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$d;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$d>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$d>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationNS {
    _client: XrpcClient;
    defaultSite: AppGainforestOrganizationDefaultSiteRecord;
    info: AppGainforestOrganizationInfoRecord;
    layer: AppGainforestOrganizationLayerRecord;
    observations: AppGainforestOrganizationObservationsNS;
    predictions: AppGainforestOrganizationPredictionsNS;
    constructor(client: XrpcClient);
    getIndexedOrganizations(params?: QueryParams, opts?: CallOptions): Promise<Response$1>;
}
declare class AppGainforestOrganizationObservationsNS {
    _client: XrpcClient;
    dendogram: AppGainforestOrganizationObservationsDendogramRecord;
    fauna: AppGainforestOrganizationObservationsFaunaRecord;
    flora: AppGainforestOrganizationObservationsFloraRecord;
    measuredTreesCluster: AppGainforestOrganizationObservationsMeasuredTreesClusterRecord;
    constructor(client: XrpcClient);
}
declare class AppGainforestOrganizationObservationsDendogramRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$c;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$c;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$c>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$c>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationObservationsFaunaRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$b;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$b;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$b>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$b>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationObservationsFloraRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$a;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$a;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$a>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$a>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationObservationsMeasuredTreesClusterRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$s;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$s;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$s>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$s>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationPredictionsNS {
    _client: XrpcClient;
    fauna: AppGainforestOrganizationPredictionsFaunaRecord;
    flora: AppGainforestOrganizationPredictionsFloraRecord;
    constructor(client: XrpcClient);
}
declare class AppGainforestOrganizationPredictionsFaunaRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$9;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$9;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$9>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$9>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationPredictionsFloraRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$8;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$8;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$8>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$8>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationDefaultSiteRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$p;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$p;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$p>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$p>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationInfoRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$q;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$q;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$q>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$q>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class AppGainforestOrganizationLayerRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$r;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$r;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$r>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$r>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class ComNS {
    _client: XrpcClient;
    atproto: ComAtprotoNS;
    constructor(client: XrpcClient);
}
declare class ComAtprotoNS {
    _client: XrpcClient;
    repo: ComAtprotoRepoNS;
    constructor(client: XrpcClient);
}
declare class ComAtprotoRepoNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
}
declare class OrgNS {
    _client: XrpcClient;
    hypercerts: OrgHypercertsNS;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsNS {
    _client: XrpcClient;
    claim: OrgHypercertsClaimNS;
    funding: OrgHypercertsFundingNS;
    helper: OrgHypercertsHelperNS;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsClaimNS {
    _client: XrpcClient;
    activity: OrgHypercertsClaimActivityRecord;
    attachment: OrgHypercertsClaimAttachmentRecord;
    collection: OrgHypercertsClaimCollectionRecord;
    contributionDetails: OrgHypercertsClaimContributionDetailsRecord;
    contributorInformation: OrgHypercertsClaimContributorInformationRecord;
    evaluation: OrgHypercertsClaimEvaluationRecord;
    measurement: OrgHypercertsClaimMeasurementRecord;
    rights: OrgHypercertsClaimRightsRecord;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsClaimActivityRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$t;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$t;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$t>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$t>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimAttachmentRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$7;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$7;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$7>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$7>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimCollectionRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$u;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$u;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$u>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$u>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimContributionDetailsRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$6;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$6;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$6>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$6>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimContributorInformationRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$5;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$5;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$5>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$5>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimEvaluationRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$4;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$4;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$4>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$4>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimMeasurementRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$3;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$3;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$3>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$3>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsClaimRightsRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$2;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$2;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$2>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$2>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsFundingNS {
    _client: XrpcClient;
    receipt: OrgHypercertsFundingReceiptRecord;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsFundingReceiptRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$1;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$1;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$1>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$1>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class OrgHypercertsHelperNS {
    _client: XrpcClient;
    workScopeTag: OrgHypercertsHelperWorkScopeTagRecord;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsHelperWorkScopeTagRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    delete(params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>, headers?: Record<string, string>): Promise<void>;
}
declare class PubNS {
    _client: XrpcClient;
    leaflet: PubLeafletNS;
    constructor(client: XrpcClient);
}
declare class PubLeafletNS {
    _client: XrpcClient;
    blocks: PubLeafletBlocksNS;
    pages: PubLeafletPagesNS;
    richtext: PubLeafletRichtextNS;
    constructor(client: XrpcClient);
}
declare class PubLeafletBlocksNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
}
declare class PubLeafletPagesNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
}
declare class PubLeafletRichtextNS {
    _client: XrpcClient;
    constructor(client: XrpcClient);
}

export { AppBskyNS, AppBskyRichtextNS, AppCertifiedBadgeAward, AppCertifiedBadgeAwardRecord, AppCertifiedBadgeDefinition, AppCertifiedBadgeDefinitionRecord, AppCertifiedBadgeNS, AppCertifiedBadgeResponse, AppCertifiedBadgeResponseRecord, defs$2 as AppCertifiedDefs, AppCertifiedLocationRecord, AppCertifiedNS, defs as AppGainforestDwcDefs, AppGainforestDwcEvent, AppGainforestDwcEventRecord, AppGainforestDwcMeasurement, AppGainforestDwcMeasurementRecord, AppGainforestDwcNS, AppGainforestDwcOccurrence, AppGainforestDwcOccurrenceRecord, defs$1 as AppGainforestEvaluatorDefs, AppGainforestEvaluatorEvaluation, AppGainforestEvaluatorEvaluationRecord, AppGainforestEvaluatorNS, AppGainforestEvaluatorService, AppGainforestEvaluatorServiceRecord, AppGainforestEvaluatorSubscription, AppGainforestEvaluatorSubscriptionRecord, AppGainforestNS, AppGainforestOrganizationDefaultSiteRecord, AppGainforestOrganizationGetIndexedOrganizations, AppGainforestOrganizationInfoRecord, AppGainforestOrganizationLayerRecord, AppGainforestOrganizationNS, AppGainforestOrganizationObservationsDendogram, AppGainforestOrganizationObservationsDendogramRecord, AppGainforestOrganizationObservationsFauna, AppGainforestOrganizationObservationsFaunaRecord, AppGainforestOrganizationObservationsFlora, AppGainforestOrganizationObservationsFloraRecord, AppGainforestOrganizationObservationsMeasuredTreesClusterRecord, AppGainforestOrganizationObservationsNS, AppGainforestOrganizationPredictionsFauna, AppGainforestOrganizationPredictionsFaunaRecord, AppGainforestOrganizationPredictionsFlora, AppGainforestOrganizationPredictionsFloraRecord, AppGainforestOrganizationPredictionsNS, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, ComNS, OrgHypercertsClaimActivityRecord, OrgHypercertsClaimAttachment, OrgHypercertsClaimAttachmentRecord, OrgHypercertsClaimCollectionRecord, OrgHypercertsClaimContributionDetails, OrgHypercertsClaimContributionDetailsRecord, OrgHypercertsClaimContributorInformation, OrgHypercertsClaimContributorInformationRecord, OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, OrgHypercertsFundingNS, OrgHypercertsFundingReceipt, OrgHypercertsFundingReceiptRecord, OrgHypercertsHelperNS, OrgHypercertsHelperWorkScopeTag, OrgHypercertsHelperWorkScopeTagRecord, OrgHypercertsNS, OrgNS, PUB_LEAFLET_PAGES, PubLeafletBlocksNS, PubLeafletNS, PubLeafletPagesNS, PubLeafletRichtextNS, PubNS };
