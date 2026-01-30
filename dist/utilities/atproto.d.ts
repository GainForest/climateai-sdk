import { U as Uri, S as SmallImage, L as LargeImage, f as SmallBlob, g as LargeBlob } from '../info-5wTP3IAZ.js';
import { $ as $Typed } from '../utils-BRYtkma9.js';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.js';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../index-CgHM_GBe.js';
import '../activity-BuClHKQ6.js';
import 'multiformats/cid';
import 'zod';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import '../config-eXJj8SMU.js';
import 'iron-session';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
