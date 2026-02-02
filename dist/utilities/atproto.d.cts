import { U as Uri$1, I as Image, f as ImageThumbnail } from '../collection-SgBIeJK4.cjs';
import { U as Uri, a as SmallImage, b as LargeImage, S as SmallBlob, L as LargeBlob } from '../activity-CkQLvIqT.cjs';
import { a as $Typed } from '../utils-BtB-jULs.cjs';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.cjs';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../index-NX02lVa-.cjs';
import 'multiformats/cid';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '../response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import '../config-eXJj8SMU.cjs';
import 'iron-session';

type SupportedImageData = string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob | $Typed<Uri$1 | Image | ImageThumbnail> | Uri$1 | Image | ImageThumbnail;
declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: SupportedImageData, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
