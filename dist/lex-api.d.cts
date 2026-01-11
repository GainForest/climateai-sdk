import { ComAtprotoRepoListRecords, ComAtprotoRepoGetRecord, ComAtprotoRepoCreateRecord, ComAtprotoRepoPutRecord, ComAtprotoRepoDeleteRecord } from '@atproto/api';
import { L as LexiconDoc, b as LexUserType, V as ValidationResult, $ as $TypedObject, a as $Typed, O as OmitKey, U as Un$Typed } from './utils-BtB-jULs.cjs';
import { B as BlobRef, a as Main$f, A as ActivityWeight, U as Uri, S as SmallBlob$1, M as Main$l } from './activity-D5PT-NMl.cjs';
export { s as ComAtprotoRepoStrongRef, O as OrgHypercertsClaimActivity, d as OrgHypercertsDefs } from './activity-D5PT-NMl.cjs';
import { I as IndexedOrganization, S as SmallBlob, d as Main$g, e as Main$h, M as Main$i, a as Main$j, b as Main$k, c as Main$m } from './info-QcQhGTfG.cjs';
export { A as AppCertifiedLocation, f as AppGainforestCommonDefs, g as AppGainforestOrganizationDefaultSite, h as AppGainforestOrganizationInfo, i as AppGainforestOrganizationLayer, j as AppGainforestOrganizationObservationsMeasuredTreesCluster, O as OrgHypercertsClaimProject, k as PubLeafletBlocksBlockquote, l as PubLeafletBlocksBskyPost, m as PubLeafletBlocksButton, n as PubLeafletBlocksCode, o as PubLeafletBlocksHeader, p as PubLeafletBlocksHorizontalRule, q as PubLeafletBlocksIframe, r as PubLeafletBlocksImage, s as PubLeafletBlocksMath, t as PubLeafletBlocksPage, u as PubLeafletBlocksPoll, v as PubLeafletBlocksText, w as PubLeafletBlocksUnorderedList, x as PubLeafletBlocksWebsite, y as PubLeafletPagesLinearDocument, z as PubLeafletRichtextFacet } from './info-QcQhGTfG.cjs';
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
type Did = string;

type defs_Did = Did;
declare namespace defs {
  export type { defs_Did as Did };
}

interface Main$e {
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
declare function isMain$e<V>(v: V): v is $TypedObject<V, "app.certified.badge.definition", "main">;
declare function validateMain$e<V>(v: V): ValidationResult<Main$e & V>;

declare namespace AppCertifiedBadgeDefinition {
  export { type Main$e as Main, type Main$e as Record, isMain$e as isMain, isMain$e as isRecord, validateMain$e as validateMain, validateMain$e as validateRecord };
}

interface Main$d {
    $type: 'app.certified.badge.award';
    badge: Main$e;
    subject: $Typed<Did> | $Typed<Main$f> | {
        $type: string;
    };
    /** Optional statement explaining the reason for this badge award. */
    note?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$d<V>(v: V): v is $TypedObject<V, "app.certified.badge.award", "main">;
declare function validateMain$d<V>(v: V): ValidationResult<Main$d & V>;

declare namespace AppCertifiedBadgeAward {
  export { type Main$d as Main, type Main$d as Record, isMain$d as isMain, isMain$d as isRecord, validateMain$d as validateMain, validateMain$d as validateRecord };
}

interface Main$c {
    $type: 'app.certified.badge.response';
    badgeAward: Main$d;
    /** The recipient’s response for the badge (accepted or rejected). */
    response: 'accepted' | 'rejected';
    /** Optional relative weight for accepted badges, assigned by the recipient. */
    weight?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$c<V>(v: V): v is $TypedObject<V, "app.certified.badge.response", "main">;
declare function validateMain$c<V>(v: V): ValidationResult<Main$c & V>;

declare namespace AppCertifiedBadgeResponse {
  export { type Main$c as Main, type Main$c as Record, isMain$c as isMain, isMain$c as isRecord, validateMain$c as validateMain, validateMain$c as validateRecord };
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
    $type: 'org.hypercerts.claim.collection';
    /** The title of this collection */
    title: string;
    /** A short description of this collection */
    shortDescription?: string;
    /** Primary avatar image representing this collection across apps and views; typically a square image. */
    avatar?: BlobRef;
    /** The cover photo of this collection. */
    coverPhoto?: BlobRef;
    /** Array of activities with their associated weights in this collection */
    activities: ActivityWeight[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$6<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.collection", "main">;
declare function validateMain$6<V>(v: V): ValidationResult<Main$6 & V>;

declare namespace OrgHypercertsClaimCollection {
  export { type Main$6 as Main, type Main$6 as Record, isMain$6 as isMain, isMain$6 as isRecord, validateMain$6 as validateMain, validateMain$6 as validateRecord };
}

interface Main$5 {
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
declare function isMain$5<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.contribution", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

declare namespace OrgHypercertsClaimContribution {
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
    subject?: Main$f;
    /** DIDs of the evaluators */
    evaluators: Did[];
    /** Evaluation data (URIs or blobs) containing detailed reports or methodology */
    content?: ($Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    })[];
    /** Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement */
    measurements?: Main$f[];
    /** Brief evaluation summary */
    summary: string;
    score?: Score;
    location?: Main$f;
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
    $type: 'org.hypercerts.claim.evidence';
    subject?: Main$f;
    content: $Typed<Uri> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    /** Title to describe the nature of the evidence. */
    title: string;
    /** Short description explaining what this evidence shows. */
    shortDescription?: string;
    /** Longer description describing the evidence in more detail. */
    description?: string;
    /** How this evidence relates to the subject. */
    relationType?: 'supports' | 'challenges' | 'clarifies' | (string & {});
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evidence", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace OrgHypercertsClaimEvidence {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'org.hypercerts.claim.measurement';
    subject?: Main$f;
    /** DIDs of the entity (or entities) that measured this data */
    measurers: Did[];
    /** The metric being measured */
    metric: string;
    /** The measured value */
    value: string;
    /** Short identifier for the measurement methodology */
    methodType?: string;
    /** URI to methodology documentation, standard protocol, or measurement procedure */
    methodURI?: string;
    /** URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets) */
    evidenceURI?: string[];
    location?: Main$f;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.measurement", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace OrgHypercertsClaimMeasurement {
  export { type Main$2 as Main, type Main$2 as Record, isMain$2 as isMain, isMain$2 as isRecord, validateMain$2 as validateMain, validateMain$2 as validateRecord };
}

interface Main$1 {
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
declare function isMain$1<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.rights", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace OrgHypercertsClaimRights {
  export { type Main$1 as Main, type Main$1 as Record, isMain$1 as isMain, isMain$1 as isRecord, validateMain$1 as validateMain, validateMain$1 as validateRecord };
}

interface Main {
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
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.funding.receipt", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

type OrgHypercertsFundingReceipt_Main = Main;
declare const OrgHypercertsFundingReceipt_isMain: typeof isMain;
declare const OrgHypercertsFundingReceipt_validateMain: typeof validateMain;
declare namespace OrgHypercertsFundingReceipt {
  export { type OrgHypercertsFundingReceipt_Main as Main, type Main as Record, OrgHypercertsFundingReceipt_isMain as isMain, isMain as isRecord, OrgHypercertsFundingReceipt_validateMain as validateMain, validateMain as validateRecord };
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
    certified: AppCertifiedNS;
    gainforest: AppGainforestNS;
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
declare class AppCertifiedBadgeDefinitionRecord {
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
declare class AppCertifiedBadgeResponseRecord {
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
declare class AppCertifiedLocationRecord {
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
declare class AppGainforestOrganizationInfoRecord {
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
declare class AppGainforestOrganizationLayerRecord {
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
    project: OrgHypercertsClaimProjectRecord;
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
declare class OrgHypercertsClaimCollectionRecord {
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
declare class OrgHypercertsClaimContributionRecord {
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
declare class OrgHypercertsClaimEvidenceRecord {
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
declare class OrgHypercertsClaimMeasurementRecord {
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
declare class OrgHypercertsClaimProjectRecord {
    _client: XrpcClient;
    constructor(client: XrpcClient);
    list(params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>): Promise<{
        cursor?: string;
        records: {
            uri: string;
            value: Main$m;
        }[];
    }>;
    get(params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>): Promise<{
        uri: string;
        cid: string;
        value: Main$m;
    }>;
    create(params: OmitKey<ComAtprotoRepoCreateRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$m>, headers?: Record<string, string>): Promise<{
        uri: string;
        cid: string;
    }>;
    put(params: OmitKey<ComAtprotoRepoPutRecord.InputSchema, 'collection' | 'record'>, record: Un$Typed<Main$m>, headers?: Record<string, string>): Promise<{
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

export { AppCertifiedBadgeAward, AppCertifiedBadgeAwardRecord, AppCertifiedBadgeDefinition, AppCertifiedBadgeDefinitionRecord, AppCertifiedBadgeNS, AppCertifiedBadgeResponse, AppCertifiedBadgeResponseRecord, defs as AppCertifiedDefs, AppCertifiedLocationRecord, AppCertifiedNS, AppGainforestNS, AppGainforestOrganizationDefaultSiteRecord, AppGainforestOrganizationGetIndexedOrganizations, AppGainforestOrganizationInfoRecord, AppGainforestOrganizationLayerRecord, AppGainforestOrganizationNS, AppGainforestOrganizationObservationsDendogram, AppGainforestOrganizationObservationsDendogramRecord, AppGainforestOrganizationObservationsFauna, AppGainforestOrganizationObservationsFaunaRecord, AppGainforestOrganizationObservationsFlora, AppGainforestOrganizationObservationsFloraRecord, AppGainforestOrganizationObservationsMeasuredTreesClusterRecord, AppGainforestOrganizationObservationsNS, AppGainforestOrganizationPredictionsFauna, AppGainforestOrganizationPredictionsFaunaRecord, AppGainforestOrganizationPredictionsFlora, AppGainforestOrganizationPredictionsFloraRecord, AppGainforestOrganizationPredictionsNS, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, ComNS, OrgHypercertsClaimActivityRecord, OrgHypercertsClaimCollection, OrgHypercertsClaimCollectionRecord, OrgHypercertsClaimContribution, OrgHypercertsClaimContributionRecord, OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, OrgHypercertsClaimEvidence, OrgHypercertsClaimEvidenceRecord, OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, OrgHypercertsClaimProjectRecord, OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, OrgHypercertsFundingNS, OrgHypercertsFundingReceipt, OrgHypercertsFundingReceiptRecord, OrgHypercertsNS, OrgNS, PUB_LEAFLET_PAGES, PubLeafletBlocksNS, PubLeafletNS, PubLeafletPagesNS, PubLeafletRichtextNS, PubNS };
