import { S as SupportedPDSDomain, a as StoredSession } from './session-BJjwpb2l.js';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './session-BJjwpb2l.js';
export { A as AppRouter } from './_app-BKNpJhsF.js';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.js';
import 'zod';
import './project-B5S3nOat.js';
import './activity-B4BTvcNK.js';
import 'multiformats/cid';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare function createContext<T extends SupportedPDSDomain>(opts?: {
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: StoredSession | null;
}>;

export { SupportedPDSDomain, createContext };
