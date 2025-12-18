import { S as SupportedPDSDomain, a as StoredSession } from './session-B86fofTy.js';
export { C as ClimateAiSDK, s as supportedPDSDomainSchema } from './session-B86fofTy.js';
export { A as AppRouter } from './_app-Biikaryw.js';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.js';
import 'zod';
import './info-CAW9Nl57.js';
import './activity-DdmMw7Qf.js';
import 'multiformats/cid';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare function createContext<T extends SupportedPDSDomain>(opts?: {
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: StoredSession | null;
}>;

export { SupportedPDSDomain, createContext };
