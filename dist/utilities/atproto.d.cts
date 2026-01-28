import { U as Uri$1, I as Image, D as ImageThumbnail } from '../collection-iPiupYR_.cjs';
import { U as Uri, c as SmallImage, L as LargeImage, S as SmallBlob, e as LargeBlob } from '../activity-DgaiG8Qy.cjs';
import { a as $Typed } from '../utils-BtB-jULs.cjs';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.cjs';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../session-BuEIqD5B.cjs';
import 'multiformats/cid';
import 'zod';
import '@atproto/oauth-client-node';
import '@trpc/server/unstable-core-do-not-import';
import '../response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

type SupportedImageData = string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob | $Typed<Uri$1 | Image | ImageThumbnail> | Uri$1 | Image | ImageThumbnail;
declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: SupportedImageData, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
