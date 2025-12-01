import { $ as $Typed } from './util-FfahvqOL.js';
import { BlobRef } from '@atproto/lexicon';

/** Object containing a URI to external data */
interface Uri {
    $type?: 'org.hypercerts.defs#uri';
    /** URI to external data */
    uri: string;
}
/** Object containing a blob to external data */
interface SmallBlob {
    $type?: 'org.hypercerts.defs#smallBlob';
    /** Blob to external data (up to 10MB) */
    blob: BlobRef;
}
/** Object containing a small image */
interface SmallImage {
    $type?: 'org.hypercerts.defs#smallImage';
    /** Image (up to 5MB) */
    image: BlobRef;
}

interface Main$1 {
    $type?: 'com.atproto.repo.strongRef';
    uri: string;
    cid: string;
}

interface Main {
    $type: 'org.hypercerts.claim.claim';
    /** Title of the hypercert */
    title: string;
    /** Short blurb of the impact work done. */
    shortDescription: string;
    /** Optional longer description of the impact work done. */
    description?: string;
    image?: $Typed<Uri> | $Typed<SmallImage> | {
        $type: string;
    };
    /** Scope of the work performed */
    workScope: string;
    /** When the work began */
    workTimeFrameFrom: string;
    /** When the work ended */
    workTimeFrameTo: string;
    /** Supporting evidence, documentation, or external data URIs */
    evidence?: Main$1[];
    /** A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contributions */
    contributions?: Main$1[];
    rights?: Main$1;
    location?: Main$1;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}

type GetRecordResponse<T> = {
    value: T;
    uri: string;
    cid: string;
};
type PutRecordResponse<T> = {
    uri: string;
    cid: string;
    commit?: string;
    validationStatus: "unknown" | (string & {}) | undefined;
    value: T;
};

export type { GetRecordResponse as G, Main as M, PutRecordResponse as P, SmallBlob as S, Uri as U };
