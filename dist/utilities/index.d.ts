import { U as Uri, S as SmallImage, L as LargeImage, a as SmallBlob, b as LargeBlob } from '../defs-Cx3i2lOk.js';
import { $ as $Typed } from '../util-CbiaqOMs.js';
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
