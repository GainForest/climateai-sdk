import { U as Uri, a as SmallImage, L as LargeImage, S as SmallBlob, b as LargeBlob } from '../defs-Cn2O3vh_.js';
import { $ as $Typed } from '../util-FfahvqOL.js';
import { B as BlobRefGenerator } from '../blobref-CzIHHOw4.js';
import { BlobRef } from '@atproto/api';
import '@atproto/lexicon';
import 'zod';

declare const getBlobUrl: <T extends string>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsUrl: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string | undefined;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
