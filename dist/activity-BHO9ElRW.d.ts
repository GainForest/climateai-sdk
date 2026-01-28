import { $ as $TypedObject, V as ValidationResult, a as $Typed } from './utils-BtB-jULs.js';
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

interface Main$2 {
    $type?: 'com.atproto.repo.strongRef';
    uri: string;
    cid: string;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "com.atproto.repo.strongRef", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace strongRef {
  export { type Main$2 as Main, isMain$2 as isMain, validateMain$2 as validateMain };
}

/** Annotation of a sub-string within rich text. */
interface Main$1 {
    $type?: 'app.bsky.richtext.facet';
    index: ByteSlice;
    features: ($Typed<Mention> | $Typed<Link> | $Typed<Tag> | {
        $type: string;
    })[];
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "app.bsky.richtext.facet", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;
/** Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID. */
interface Mention {
    $type?: 'app.bsky.richtext.facet#mention';
    did: string;
}
declare function isMention<V>(v: V): v is $TypedObject<V, "app.bsky.richtext.facet", "mention">;
declare function validateMention<V>(v: V): ValidationResult<Mention & V>;
/** Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL. */
interface Link {
    $type?: 'app.bsky.richtext.facet#link';
    uri: string;
}
declare function isLink<V>(v: V): v is $TypedObject<V, "app.bsky.richtext.facet", "link">;
declare function validateLink<V>(v: V): ValidationResult<Link & V>;
/** Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags'). */
interface Tag {
    $type?: 'app.bsky.richtext.facet#tag';
    tag: string;
}
declare function isTag<V>(v: V): v is $TypedObject<V, "app.bsky.richtext.facet", "tag">;
declare function validateTag<V>(v: V): ValidationResult<Tag & V>;
/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
interface ByteSlice {
    $type?: 'app.bsky.richtext.facet#byteSlice';
    byteStart: number;
    byteEnd: number;
}
declare function isByteSlice<V>(v: V): v is $TypedObject<V, "app.bsky.richtext.facet", "byteSlice">;
declare function validateByteSlice<V>(v: V): ValidationResult<ByteSlice & V>;

type facet_ByteSlice = ByteSlice;
type facet_Link = Link;
type facet_Mention = Mention;
type facet_Tag = Tag;
declare const facet_isByteSlice: typeof isByteSlice;
declare const facet_isLink: typeof isLink;
declare const facet_isMention: typeof isMention;
declare const facet_isTag: typeof isTag;
declare const facet_validateByteSlice: typeof validateByteSlice;
declare const facet_validateLink: typeof validateLink;
declare const facet_validateMention: typeof validateMention;
declare const facet_validateTag: typeof validateTag;
declare namespace facet {
  export { type facet_ByteSlice as ByteSlice, type facet_Link as Link, type Main$1 as Main, type facet_Mention as Mention, type facet_Tag as Tag, facet_isByteSlice as isByteSlice, facet_isLink as isLink, isMain$1 as isMain, facet_isMention as isMention, facet_isTag as isTag, facet_validateByteSlice as validateByteSlice, facet_validateLink as validateLink, validateMain$1 as validateMain, facet_validateMention as validateMention, facet_validateTag as validateTag };
}

interface Main {
    $type: 'org.hypercerts.claim.activity';
    /** Title of the hypercert. */
    title: string;
    /** Short summary of this activity claim, suitable for previews and list views. Rich text annotations may be provided via `shortDescriptionFacets`. */
    shortDescription: string;
    /** Rich text annotations for `shortDescription` (mentions, URLs, hashtags, etc). */
    shortDescriptionFacets?: Main$1[];
    /** Optional longer description of this activity claim, including context or interpretation. Rich text annotations may be provided via `descriptionFacets`. */
    description?: string;
    /** Rich text annotations for `description` (mentions, URLs, hashtags, etc). */
    descriptionFacets?: Main$1[];
    image?: $Typed<Uri> | $Typed<SmallImage> | {
        $type: string;
    };
    workScope?: $Typed<Main$2> | $Typed<WorkScopeString> | {
        $type: string;
    };
    /** When the work began */
    startDate?: string;
    /** When the work ended */
    endDate?: string;
    /** An array of contributor objects, each containing contributor information, weight, and contribution details. */
    contributors?: Contributor[];
    rights?: Main$2;
    /** An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location. */
    locations?: Main$2[];
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

interface Contributor {
    $type?: 'org.hypercerts.claim.activity#contributor';
    contributorIdentity: $Typed<ContributorIdentity> | $Typed<Main$2> | {
        $type: string;
    };
    /** The relative weight/importance of this contribution (stored as a string to avoid float precision issues). Must be a positive numeric value. Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed. */
    contributionWeight?: string;
    contributionDetails?: $Typed<ContributorRole> | $Typed<Main$2> | {
        $type: string;
    };
}
declare function isContributor<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "contributor">;
declare function validateContributor<V>(v: V): ValidationResult<Contributor & V>;
/** Contributor information as a string (DID or identifier). */
interface ContributorIdentity {
    $type?: 'org.hypercerts.claim.activity#contributorIdentity';
    /** The contributor identity string (DID or identifier). */
    identity: string;
}
declare function isContributorIdentity<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "contributorIdentity">;
declare function validateContributorIdentity<V>(v: V): ValidationResult<ContributorIdentity & V>;
/** Contribution details as a string. */
interface ContributorRole {
    $type?: 'org.hypercerts.claim.activity#contributorRole';
    /** The contribution role or details. */
    role: string;
}
declare function isContributorRole<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "contributorRole">;
declare function validateContributorRole<V>(v: V): ValidationResult<ContributorRole & V>;
/** A free-form string describing the work scope for simple or legacy scopes. */
interface WorkScopeString {
    $type?: 'org.hypercerts.claim.activity#workScopeString';
    /** The work scope description string. */
    scope: string;
}
declare function isWorkScopeString<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.activity", "workScopeString">;
declare function validateWorkScopeString<V>(v: V): ValidationResult<WorkScopeString & V>;

type OrgHypercertsClaimActivity_Contributor = Contributor;
type OrgHypercertsClaimActivity_ContributorIdentity = ContributorIdentity;
type OrgHypercertsClaimActivity_ContributorRole = ContributorRole;
type OrgHypercertsClaimActivity_Main = Main;
type OrgHypercertsClaimActivity_WorkScopeString = WorkScopeString;
declare const OrgHypercertsClaimActivity_isContributor: typeof isContributor;
declare const OrgHypercertsClaimActivity_isContributorIdentity: typeof isContributorIdentity;
declare const OrgHypercertsClaimActivity_isContributorRole: typeof isContributorRole;
declare const OrgHypercertsClaimActivity_isMain: typeof isMain;
declare const OrgHypercertsClaimActivity_isWorkScopeString: typeof isWorkScopeString;
declare const OrgHypercertsClaimActivity_validateContributor: typeof validateContributor;
declare const OrgHypercertsClaimActivity_validateContributorIdentity: typeof validateContributorIdentity;
declare const OrgHypercertsClaimActivity_validateContributorRole: typeof validateContributorRole;
declare const OrgHypercertsClaimActivity_validateMain: typeof validateMain;
declare const OrgHypercertsClaimActivity_validateWorkScopeString: typeof validateWorkScopeString;
declare namespace OrgHypercertsClaimActivity {
  export { type OrgHypercertsClaimActivity_Contributor as Contributor, type OrgHypercertsClaimActivity_ContributorIdentity as ContributorIdentity, type OrgHypercertsClaimActivity_ContributorRole as ContributorRole, type OrgHypercertsClaimActivity_Main as Main, type Main as Record, type OrgHypercertsClaimActivity_WorkScopeString as WorkScopeString, OrgHypercertsClaimActivity_isContributor as isContributor, OrgHypercertsClaimActivity_isContributorIdentity as isContributorIdentity, OrgHypercertsClaimActivity_isContributorRole as isContributorRole, OrgHypercertsClaimActivity_isMain as isMain, isMain as isRecord, OrgHypercertsClaimActivity_isWorkScopeString as isWorkScopeString, OrgHypercertsClaimActivity_validateContributor as validateContributor, OrgHypercertsClaimActivity_validateContributorIdentity as validateContributorIdentity, OrgHypercertsClaimActivity_validateContributorRole as validateContributorRole, OrgHypercertsClaimActivity_validateMain as validateMain, validateMain as validateRecord, OrgHypercertsClaimActivity_validateWorkScopeString as validateWorkScopeString };
}

export { BlobRef as B, type LargeImage as L, type Main as M, OrgHypercertsClaimActivity as O, type SmallBlob as S, type Uri as U, type Main$2 as a, type Main$1 as b, type SmallImage as c, defs as d, type LargeBlob as e, facet as f, strongRef as s };
