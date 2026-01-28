import { U as Uri, B as SmallImage, L as LargeImage, S as SmallBlob, C as LargeBlob } from '../project-DIS_R7JL.cjs';
import { a as $Typed } from '../utils-BtB-jULs.cjs';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.cjs';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../session-Doi-8fnR.cjs';
import '../activity-BWO0-2j_.cjs';
import 'multiformats/cid';
import 'zod';
import '@atproto/oauth-client-node';
import '@trpc/server/unstable-core-do-not-import';
import '../response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

export { getBlobUrl, parseAtUri };
