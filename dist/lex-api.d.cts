import { ComAtprotoRepoListRecords, ComAtprotoRepoGetRecord, ComAtprotoRepoCreateRecord, ComAtprotoRepoPutRecord, ComAtprotoRepoDeleteRecord } from '@atproto/api';
import { L as LexiconDoc, b as LexUserType, V as ValidationResult, $ as $TypedObject, a as $Typed, O as OmitKey, U as Un$Typed } from './utils-BtB-jULs.cjs';
import { S as SmallImage, I as IndexedOrganization, e as SmallBlob, d as Main$f, b as Main$g, M as Main$h, a as Main$i, c as Main$j } from './info-LubXhrYx.cjs';
export { A as AppCertifiedLocation, f as AppGainforestCommonDefs, g as AppGainforestOrganizationDefaultSite, h as AppGainforestOrganizationInfo, i as AppGainforestOrganizationObservationsMeasuredTreesCluster, j as AppGainforestOrganizationSite } from './info-LubXhrYx.cjs';
import { U as Uri, S as SmallBlob$1, a as Main$e, M as Main$k } from './activity-DclFid0x.cjs';
export { s as ComAtprotoRepoStrongRef, O as OrgHypercertsClaimActivity, d as OrgHypercertsDefs } from './activity-DclFid0x.cjs';
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

interface Main$d {
    $type: 'app.gainforest.organization.draft.ecocert';
    /** The title of the ecocert */
    title: string;
    coverImage: SmallImage | null;
    /** The work scopes of the ecocert */
    workScopes: string[];
    /** The start date of the work */
    workStartDate: string;
    /** The end date of the work */
    workEndDate: string;
    /** The description of the ecocert in markdown */
    description: string;
    /** The short description of the ecocert in markdown */
    shortDescription: string;
    /** The contributors of the ecocert in markdown */
    contributors: string[];
    /** The reference to the site record in the PDS */
    site: string;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$d<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.draft.ecocert", "main">;
declare function validateMain$d<V>(v: V): ValidationResult<Main$d & V>;

declare namespace AppGainforestOrganizationDraftEcocert {
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
    $type: 'app.gainforest.organization.layer';
    /** The name of the site */
    name: string;
    /** The type of the layer */
    type: 'geojson_points' | 'geojson_points_trees' | 'geojson_line' | 'choropleth' | 'choropleth_shannon' | 'raster_tif' | 'tms_tile';
    /** The URI of the layer */
    uri: string;
    /** The description of the layer */
    description?: string;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$c<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.layer", "main">;
declare function validateMain$c<V>(v: V): ValidationResult<Main$c & V>;

declare namespace AppGainforestOrganizationLayer {
  export { type Main$c as Main, type Main$c as Record, isMain$c as isMain, isMain$c as isRecord, validateMain$c as validateMain, validateMain$c as validateRecord };
}

interface Main$b {
    $type: 'app.gainforest.organization.observations.dendogram';
    dendogram: SmallBlob;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$b<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.dendogram", "main">;
declare function validateMain$b<V>(v: V): ValidationResult<Main$b & V>;

declare namespace AppGainforestOrganizationObservationsDendogram {
  export { type Main$b as Main, type Main$b as Record, isMain$b as isMain, isMain$b as isRecord, validateMain$b as validateMain, validateMain$b as validateRecord };
}

interface Main$a {
    $type: 'app.gainforest.organization.observations.fauna';
    /** An array of GBIF taxon keys for each fauna observation */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$a<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.fauna", "main">;
declare function validateMain$a<V>(v: V): ValidationResult<Main$a & V>;

declare namespace AppGainforestOrganizationObservationsFauna {
  export { type Main$a as Main, type Main$a as Record, isMain$a as isMain, isMain$a as isRecord, validateMain$a as validateMain, validateMain$a as validateRecord };
}

interface Main$9 {
    $type: 'app.gainforest.organization.observations.flora';
    /** An array of GBIF taxon keys for each flora observation */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$9<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.flora", "main">;
declare function validateMain$9<V>(v: V): ValidationResult<Main$9 & V>;

declare namespace AppGainforestOrganizationObservationsFlora {
  export { type Main$9 as Main, type Main$9 as Record, isMain$9 as isMain, isMain$9 as isRecord, validateMain$9 as validateMain, validateMain$9 as validateRecord };
}

interface Main$8 {
    $type: 'app.gainforest.organization.predictions.fauna';
    /** An array of GBIF taxon keys for each fauna prediction */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$8<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.predictions.fauna", "main">;
declare function validateMain$8<V>(v: V): ValidationResult<Main$8 & V>;

declare namespace AppGainforestOrganizationPredictionsFauna {
  export { type Main$8 as Main, type Main$8 as Record, isMain$8 as isMain, isMain$8 as isRecord, validateMain$8 as validateMain, validateMain$8 as validateRecord };
}

interface Main$7 {
    $type: 'app.gainforest.organization.predictions.flora';
    /** An array of GBIF taxon keys for each flora prediction */
    gbifTaxonKeys: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$7<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.predictions.flora", "main">;
declare function validateMain$7<V>(v: V): ValidationResult<Main$7 & V>;

declare namespace AppGainforestOrganizationPredictionsFlora {
  export { type Main$7 as Main, type Main$7 as Record, isMain$7 as isMain, isMain$7 as isRecord, validateMain$7 as validateMain, validateMain$7 as validateRecord };
}

interface Main$6 {
    $type: 'app.gainforest.organization.project';
    /** The name of the site */
    name: string;
    /** The description of the project in markdown */
    description?: string;
    /** The short description of the project */
    shortDescription: string;
    /** An array of at-uris pointing to the records of the ecocerts related to the project */
    ecocerts: string[];
    /** An array of at-uris pointing to the records of the layers related to the project */
    layers: string[];
    /** An array of at-uris pointing to the records of the sites related to the project */
    sites: string[];
    /** An array of at-uris pointing to the records of the measured trees clusters related to the project */
    measuredTreesClusters: string[];
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$6<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.project", "main">;
declare function validateMain$6<V>(v: V): ValidationResult<Main$6 & V>;

declare namespace AppGainforestOrganizationProject {
  export { type Main$6 as Main, type Main$6 as Record, isMain$6 as isMain, isMain$6 as isRecord, validateMain$6 as validateMain, validateMain$6 as validateRecord };
}

interface Main$5 {
    $type: 'org.hypercerts.claim.collection';
    /** The title of this collection */
    title: string;
    /** A short description of this collection */
    shortDescription?: string;
    coverPhoto?: $Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    /** Array of claims with their associated weights in this collection */
    claims: ClaimItem[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$5<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.collection", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

interface ClaimItem {
    $type?: 'org.hypercerts.claim.collection#claimItem';
    claim: Main$e;
    /** The weight/importance of this hypercert claim in the collection (a percentage from 0-100, stored as a string to avoid float precision issues). The total claim weights should add up to 100. */
    weight: string;
}
declare function isClaimItem<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.collection", "claimItem">;
declare function validateClaimItem<V>(v: V): ValidationResult<ClaimItem & V>;

type OrgHypercertsClaimCollection_ClaimItem = ClaimItem;
declare const OrgHypercertsClaimCollection_isClaimItem: typeof isClaimItem;
declare const OrgHypercertsClaimCollection_validateClaimItem: typeof validateClaimItem;
declare namespace OrgHypercertsClaimCollection {
  export { type OrgHypercertsClaimCollection_ClaimItem as ClaimItem, type Main$5 as Main, type Main$5 as Record, OrgHypercertsClaimCollection_isClaimItem as isClaimItem, isMain$5 as isMain, isMain$5 as isRecord, OrgHypercertsClaimCollection_validateClaimItem as validateClaimItem, validateMain$5 as validateMain, validateMain$5 as validateRecord };
}

interface Main$4 {
    $type: 'org.hypercerts.claim.contribution';
    /** Role or title of the contributor(s). */
    role?: string;
    /** List of the contributors (names, pseudonyms, or DIDs). If multiple contributors are stored in the same hypercertContribution, then they would have the exact same role. */
    contributors: string[];
    /** What the contribution concretely achieved */
    description?: string;
    /** When this contribution started. This should be a subset of the hypercert timeframe. */
    startDate?: string;
    /** When this contribution finished.  This should be a subset of the hypercert timeframe. */
    endDate?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$4<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.contribution", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;

declare namespace OrgHypercertsClaimContribution {
  export { type Main$4 as Main, type Main$4 as Record, isMain$4 as isMain, isMain$4 as isRecord, validateMain$4 as validateMain, validateMain$4 as validateRecord };
}

interface Main$3 {
    $type: 'org.hypercerts.claim.evaluation';
    subject: Main$e;
    /** DIDs of the evaluators */
    evaluators: string[];
    /** Evaluation data (URIs or blobs) containing detailed reports or methodology */
    evaluations?: ($Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    })[];
    /** Brief evaluation summary */
    summary: string;
    location?: Main$e;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evaluation", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace OrgHypercertsClaimEvaluation {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'org.hypercerts.claim.evidence';
    activity?: Main$e;
    content: $Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    /** Title to describe the nature of the evidence */
    title: string;
    /** Short description explaining what this evidence demonstrates or proves */
    shortDescription?: string;
    /** Longer description describing the impact claim evidence. */
    description?: string;
    /** Client-declared timestamp when this hypercert claim was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evidence", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace OrgHypercertsClaimEvidence {
  export { type Main$2 as Main, type Main$2 as Record, isMain$2 as isMain, isMain$2 as isRecord, validateMain$2 as validateMain, validateMain$2 as validateRecord };
}

interface Main$1 {
    $type: 'org.hypercerts.claim.measurement';
    activity: Main$e;
    /** DIDs of the entity (or entities) that measured this data */
    measurers: string[];
    /** The metric being measured */
    metric: string;
    /** The measured value */
    value: string;
    /** Short identifier for the measurement methodology */
    measurementMethodType?: string;
    /** URI to methodology documentation, standard protocol, or measurement procedure */
    measurementMethodURI?: string;
    /** URIs to supporting evidence or data */
    evidenceURI?: string[];
    location?: Main$e;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.measurement", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace OrgHypercertsClaimMeasurement {
  export { type Main$1 as Main, type Main$1 as Record, isMain$1 as isMain, isMain$1 as isRecord, validateMain$1 as validateMain, validateMain$1 as validateRecord };
}

interface Main {
    $type: 'org.hypercerts.claim.rights';
    /** Full name of the rights */
    rightsName: string;
    /** Short rights identifier for easier search */
    rightsType: string;
    /** Description of the rights of this hypercert */
    rightsDescription: string;
    attachment?: $Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.rights", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

type OrgHypercertsClaimRights_Main = Main;
declare const OrgHypercertsClaimRights_isMain: typeof isMain;
declare const OrgHypercertsClaimRights_validateMain: typeof validateMain;
declare namespace OrgHypercertsClaimRights {
  export { type OrgHypercertsClaimRights_Main as Main, type Main as Record, OrgHypercertsClaimRights_isMain as isMain, isMain as isRecord, OrgHypercertsClaimRights_validateMain as validateMain, validateMain as validateRecord };
}

/**
 * The following lines are added by lex-api-mod.ts to fix build errors.
 */

declare class AtpBaseClient extends XrpcClient {
    app: AppNS;
    com: ComNS;
    org: OrgNS;
    constructor(options: FetchHandler | FetchHandlerOptions);
    /** @deprecated use `this` instead */
    get xrpc(): XrpcClient;
}
declare class AppNS {
    _client: XrpcClient;
    certified: AppCertifiedNS;
    gainforest: AppGainforestNS;
    constructor(client: XrpcClient);
}
declare class AppCertifiedNS {
    _client: XrpcClient;
    location: AppCertifiedLocationRecord;
    constructor(client: XrpcClient);
}
declare class AppCertifiedLocationRecord {
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
declare class AppGainforestNS {
    _client: XrpcClient;
    organization: AppGainforestOrganizationNS;
    constructor(client: XrpcClient);
}
declare class AppGainforestOrganizationNS {
    _client: XrpcClient;
    defaultSite: AppGainforestOrganizationDefaultSiteRecord;
    info: AppGainforestOrganizationInfoRecord;
    layer: AppGainforestOrganizationLayerRecord;
    project: AppGainforestOrganizationProjectRecord;
    site: AppGainforestOrganizationSiteRecord;
    draft: AppGainforestOrganizationDraftNS;
    observations: AppGainforestOrganizationObservationsNS;
    predictions: AppGainforestOrganizationPredictionsNS;
    constructor(client: XrpcClient);
    getIndexedOrganizations(params?: QueryParams, opts?: CallOptions): Promise<Response$1>;
}
declare class AppGainforestOrganizationDraftNS {
    _client: XrpcClient;
    ecocert: AppGainforestOrganizationDraftEcocertRecord;
    constructor(client: XrpcClient);
}
declare class AppGainforestOrganizationDraftEcocertRecord {
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
declare class AppGainforestOrganizationObservationsFaunaRecord {
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
declare class AppGainforestOrganizationObservationsFloraRecord {
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
declare class AppGainforestOrganizationObservationsMeasuredTreesClusterRecord {
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
declare class AppGainforestOrganizationPredictionsFloraRecord {
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
declare class AppGainforestOrganizationDefaultSiteRecord {
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
declare class AppGainforestOrganizationInfoRecord {
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
declare class AppGainforestOrganizationLayerRecord {
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
declare class AppGainforestOrganizationProjectRecord {
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
declare class AppGainforestOrganizationSiteRecord {
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
    constructor(client: XrpcClient);
}
declare class OrgHypercertsClaimNS {
    _client: XrpcClient;
    activity: OrgHypercertsClaimActivityRecord;
    collection: OrgHypercertsClaimCollectionRecord;
    contribution: OrgHypercertsClaimContributionRecord;
    evaluation: OrgHypercertsClaimEvaluationRecord;
    evidence: OrgHypercertsClaimEvidenceRecord;
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
declare class OrgHypercertsClaimCollectionRecord {
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
declare class OrgHypercertsClaimContributionRecord {
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
declare class OrgHypercertsClaimEvaluationRecord {
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
declare class OrgHypercertsClaimEvidenceRecord {
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
declare class OrgHypercertsClaimMeasurementRecord {
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
declare class OrgHypercertsClaimRightsRecord {
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

export { AppCertifiedLocationRecord, AppCertifiedNS, AppGainforestNS, AppGainforestOrganizationDefaultSiteRecord, AppGainforestOrganizationDraftEcocert, AppGainforestOrganizationDraftEcocertRecord, AppGainforestOrganizationDraftNS, AppGainforestOrganizationGetIndexedOrganizations, AppGainforestOrganizationInfoRecord, AppGainforestOrganizationLayer, AppGainforestOrganizationLayerRecord, AppGainforestOrganizationNS, AppGainforestOrganizationObservationsDendogram, AppGainforestOrganizationObservationsDendogramRecord, AppGainforestOrganizationObservationsFauna, AppGainforestOrganizationObservationsFaunaRecord, AppGainforestOrganizationObservationsFlora, AppGainforestOrganizationObservationsFloraRecord, AppGainforestOrganizationObservationsMeasuredTreesClusterRecord, AppGainforestOrganizationObservationsNS, AppGainforestOrganizationPredictionsFauna, AppGainforestOrganizationPredictionsFaunaRecord, AppGainforestOrganizationPredictionsFlora, AppGainforestOrganizationPredictionsFloraRecord, AppGainforestOrganizationPredictionsNS, AppGainforestOrganizationProject, AppGainforestOrganizationProjectRecord, AppGainforestOrganizationSiteRecord, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, ComNS, OrgHypercertsClaimActivityRecord, OrgHypercertsClaimCollection, OrgHypercertsClaimCollectionRecord, OrgHypercertsClaimContribution, OrgHypercertsClaimContributionRecord, OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, OrgHypercertsClaimEvidence, OrgHypercertsClaimEvidenceRecord, OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, OrgHypercertsNS, OrgNS };
