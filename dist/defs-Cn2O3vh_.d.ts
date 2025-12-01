import { BlobRef } from '@atproto/lexicon';

/** Object containing a URI to external data */
interface Uri {
    $type?: 'app.gainforest.common.defs#uri';
    /** URI to external data */
    uri: string;
}
/** Object containing a blob to external data */
interface SmallBlob {
    $type?: 'app.gainforest.common.defs#smallBlob';
    /** Blob to external data (up to 10MB) */
    blob: BlobRef;
}
/** Object containing a blob to external data */
interface LargeBlob {
    $type?: 'app.gainforest.common.defs#largeBlob';
    /** Blob to external data (up to 100MB) */
    blob: BlobRef;
}
/** Object containing a small image */
interface SmallImage {
    $type?: 'app.gainforest.common.defs#smallImage';
    /** Image (up to 5MB) */
    image: BlobRef;
}
/** Object containing a large image */
interface LargeImage {
    $type?: 'app.gainforest.common.defs#largeImage';
    /** Image (up to 10MB) */
    image: BlobRef;
}

export type { LargeImage as L, SmallBlob as S, Uri as U, SmallImage as a, LargeBlob as b };
