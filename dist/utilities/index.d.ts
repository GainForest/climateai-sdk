import { U as Uri, S as SmallImage, L as LargeImage, a as SmallBlob, b as LargeBlob } from '../info-D0jX-Dge.js';
import { $ as $Typed } from '../claim-CsQa9nQY.js';
import { B as BlobRefGenerator } from '../blobref-CzIHHOw4.js';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../index-Hnnn5Xwg.js';
import '@atproto/lexicon';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-a9c2mEQD.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string | undefined;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
