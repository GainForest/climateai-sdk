import { U as Uri$1, I as Image, f as ImageThumbnail } from '../collection-jFp4vEn8.js';
import { U as Uri, a as SmallImage, b as LargeImage, S as SmallBlob, L as LargeBlob } from '../activity-UF4_S-8v.js';
import { a as $Typed } from '../utils-BtB-jULs.js';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.js';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../index-aA-nMHyU.js';
import 'multiformats/cid';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '../response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import '../config-eXJj8SMU.js';
import 'iron-session';

type SupportedImageData = string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob | $Typed<Uri$1 | Image | ImageThumbnail> | Uri$1 | Image | ImageThumbnail;
declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: SupportedImageData, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
