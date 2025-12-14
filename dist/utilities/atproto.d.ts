import { U as Uri, S as SmallImage, L as LargeImage, e as SmallBlob, k as LargeBlob } from '../info-D4RPERNr.js';
import { a as $Typed } from '../utils-BtB-jULs.js';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.js';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../session-BM24r9mL.js';
import '../activity-DdmMw7Qf.js';
import 'multiformats/cid';
import 'zod';
import '@atproto/oauth-client-node';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-a9c2mEQD.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
