import { ComAtprotoRepoListRecords, ComAtprotoRepoGetRecord, ComAtprotoRepoCreateRecord, ComAtprotoRepoPutRecord, ComAtprotoRepoDeleteRecord } from '@atproto/api';
import { HeadersMap, XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc';
import { a as Main$6, b as $TypedObject, $ as $Typed, U as Uri, S as SmallBlob, O as OmitKey, c as Un$Typed, M as Main$c } from '../claim-CsQa9nQY.js';
export { s as ComAtprotoRepoStrongRef, d as OrgHypercertsClaimClaim, e as OrgHypercertsDefs } from '../claim-CsQa9nQY.js';
import { I as IndexedOrganization, f as Main$7, d as Main$8, M as Main$9, e as Main$a, c as Main$b } from '../info-wmz5wtzF.js';
export { A as AppCertifiedLocation, g as AppGainforestCommonDefs, h as AppGainforestOrganizationDefaultSite, i as AppGainforestOrganizationInfo, j as AppGainforestOrganizationMeasuredTrees, k as AppGainforestOrganizationSite } from '../info-wmz5wtzF.js';
import { ValidationResult } from '@atproto/lexicon';

interface Main$5 {
    $type: 'org.hypercerts.claim.contribution';
    hypercert: Main$6;
    /** Role or title of the contributor(s). */
    role?: string;
    /** List of the contributors (names, pseudonyms, or DIDs). If multiple contributors are stored in the same hypercertContribution, then they would have the exact same role. */
    contributors: string[];
    /** What the contribution concretely achieved */
    description?: string;
    /** When this contribution started. This should be a subset of the hypercert timeframe. */
    workTimeframeFrom?: string;
    /** When this contribution finished.  This should be a subset of the hypercert timeframe. */
    workTimeframeTo?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$5<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.contribution", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

declare namespace OrgHypercertsClaimContribution {
  export { type Main$5 as Main, type Main$5 as Record, isMain$5 as isMain, isMain$5 as isRecord, validateMain$5 as validateMain, validateMain$5 as validateRecord };
}

interface Main$4 {
    $type: 'org.hypercerts.claim.evaluation';
    subject: Main$6;
    /** DIDs of the evaluators */
    evaluators: string[];
    /** Evaluation data (URIs or blobs) containing detailed reports or methodology */
    evaluations?: ($Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    })[];
    /** Brief evaluation summary */
    summary: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$4<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.evaluation", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;

declare namespace OrgHypercertsClaimEvaluation {
  export { type Main$4 as Main, type Main$4 as Record, isMain$4 as isMain, isMain$4 as isRecord, validateMain$4 as validateMain, validateMain$4 as validateRecord };
}

interface Main$3 {
    $type: 'org.hypercerts.claim.evidence';
    content: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    /** Optional title to describe the nature of the evidence */
    title?: string;
    /** Short description explaining what this evidence demonstrates or proves */
    shortDescription: string;
    /** Optional longer description describing the impact claim evidence. */
    description?: string;
    /** Client-declared timestamp when this hypercert claim was originally created */
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
    hypercert: Main$6;
    /** DIDs of the entity (or entities) that measured this data */
    measurers: string[];
    /** The metric being measured */
    metric: string;
    /** The measured value */
    value: string;
    /** URI to methodology documentation, standard protocol, or measurement procedure */
    measurementMethodURI?: string;
    /** URIs to supporting evidence or data */
    evidenceURI?: string[];
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
    $type: 'org.hypercerts.collection';
    /** The title of this collection */
    title: string;
    /** A short description of this collection */
    shortDescription?: string;
    coverPhoto?: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    /** Array of claims with their associated weights in this collection */
    claims: ClaimItem[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.collection", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

interface ClaimItem {
    $type?: 'org.hypercerts.collection#claimItem';
    claim: Main$6;
    /** The weight/importance of this hypercert claim in the collection (a percentage from 0-100, stored as a string to avoid float precision issues). The total claim weights should add up to 100. */
    weight: string;
}
declare function isClaimItem<V>(v: V): v is $TypedObject<V, "org.hypercerts.collection", "claimItem">;
declare function validateClaimItem<V>(v: V): ValidationResult<ClaimItem & V>;

type OrgHypercertsCollection_ClaimItem = ClaimItem;
type OrgHypercertsCollection_Main = Main;
declare const OrgHypercertsCollection_isClaimItem: typeof isClaimItem;
declare const OrgHypercertsCollection_isMain: typeof isMain;
declare const OrgHypercertsCollection_validateClaimItem: typeof validateClaimItem;
declare const OrgHypercertsCollection_validateMain: typeof validateMain;
declare namespace OrgHypercertsCollection {
  export { type OrgHypercertsCollection_ClaimItem as ClaimItem, type OrgHypercertsCollection_Main as Main, type Main as Record, OrgHypercertsCollection_isClaimItem as isClaimItem, OrgHypercertsCollection_isMain as isMain, isMain as isRecord, OrgHypercertsCollection_validateClaimItem as validateClaimItem, OrgHypercertsCollection_validateMain as validateMain, validateMain as validateRecord };
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
interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
declare function toKnownErr(e: any): any;

type AppGainforestOrganizationGetIndexedOrganizations_CallOptions = CallOptions;
type AppGainforestOrganizationGetIndexedOrganizations_InputSchema = InputSchema;
type AppGainforestOrganizationGetIndexedOrganizations_OutputSchema = OutputSchema;
type AppGainforestOrganizationGetIndexedOrganizations_QueryParams = QueryParams;
type AppGainforestOrganizationGetIndexedOrganizations_Response = Response;
declare const AppGainforestOrganizationGetIndexedOrganizations_toKnownErr: typeof toKnownErr;
declare namespace AppGainforestOrganizationGetIndexedOrganizations {
  export { type AppGainforestOrganizationGetIndexedOrganizations_CallOptions as CallOptions, type AppGainforestOrganizationGetIndexedOrganizations_InputSchema as InputSchema, type AppGainforestOrganizationGetIndexedOrganizations_OutputSchema as OutputSchema, type AppGainforestOrganizationGetIndexedOrganizations_QueryParams as QueryParams, type AppGainforestOrganizationGetIndexedOrganizations_Response as Response, AppGainforestOrganizationGetIndexedOrganizations_toKnownErr as toKnownErr };
}

/**
 * The following lines are added by lex-api-mod.ts to fix build errors.
 */

declare class AtpBaseClient extends XrpcClient {
    app: AppNS;
    org: OrgNS;
    com: ComNS;
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
declare class AppGainforestNS {
    _client: XrpcClient;
    organization: AppGainforestOrganizationNS;
    constructor(client: XrpcClient);
}
declare class AppGainforestOrganizationNS {
    _client: XrpcClient;
    defaultSite: AppGainforestOrganizationDefaultSiteRecord;
    info: AppGainforestOrganizationInfoRecord;
    measuredTrees: AppGainforestOrganizationMeasuredTreesRecord;
    site: AppGainforestOrganizationSiteRecord;
    constructor(client: XrpcClient);
    getIndexedOrganizations(params?: QueryParams, opts?: CallOptions): Promise<Response>;
}
declare class AppGainforestOrganizationDefaultSiteRecord {
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
declare class AppGainforestOrganizationInfoRecord {
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
declare class AppGainforestOrganizationMeasuredTreesRecord {
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
declare class AppGainforestOrganizationSiteRecord {
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
declare class OrgNS {
    _client: XrpcClient;
    hypercerts: OrgHypercertsNS;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsNS {
    _client: XrpcClient;
    collection: OrgHypercertsCollectionRecord;
    claim: OrgHypercertsClaimNS;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsClaimNS {
    _client: XrpcClient;
    claim: OrgHypercertsClaimClaimRecord;
    contribution: OrgHypercertsClaimContributionRecord;
    evaluation: OrgHypercertsClaimEvaluationRecord;
    evidence: OrgHypercertsClaimEvidenceRecord;
    measurement: OrgHypercertsClaimMeasurementRecord;
    rights: OrgHypercertsClaimRightsRecord;
    constructor(client: XrpcClient);
}
declare class OrgHypercertsClaimClaimRecord {
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
declare class OrgHypercertsCollectionRecord {
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

export { AppCertifiedLocationRecord, AppCertifiedNS, AppGainforestNS, AppGainforestOrganizationDefaultSiteRecord, AppGainforestOrganizationGetIndexedOrganizations, AppGainforestOrganizationInfoRecord, AppGainforestOrganizationMeasuredTreesRecord, AppGainforestOrganizationNS, AppGainforestOrganizationSiteRecord, AppNS, AtpBaseClient, ComAtprotoNS, ComAtprotoRepoNS, ComNS, OrgHypercertsClaimClaimRecord, OrgHypercertsClaimContribution, OrgHypercertsClaimContributionRecord, OrgHypercertsClaimEvaluation, OrgHypercertsClaimEvaluationRecord, OrgHypercertsClaimEvidence, OrgHypercertsClaimEvidenceRecord, OrgHypercertsClaimMeasurement, OrgHypercertsClaimMeasurementRecord, OrgHypercertsClaimNS, OrgHypercertsClaimRights, OrgHypercertsClaimRightsRecord, OrgHypercertsCollection, OrgHypercertsCollectionRecord, OrgHypercertsNS, OrgNS };
