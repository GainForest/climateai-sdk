import { U as Uri, S as SmallImage, L as LargeImage, g as SmallBlob, o as LargeBlob } from '../info-JAV9WD3r.cjs';
import { a as $Typed } from '../utils-BtB-jULs.cjs';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.cjs';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../session-BbKVvHt8.cjs';
import '../activity-DclFid0x.cjs';
import 'multiformats/cid';
import 'zod';
import '@atproto/oauth-client-node';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
