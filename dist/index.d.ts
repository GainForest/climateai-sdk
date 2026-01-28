import { S as SupportedPDSDomain, a as StoredSession } from './index-BykF-VMZ.js';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './index-BykF-VMZ.js';
export { A as AppRouter } from './_app-ELiTRlKD.js';
import './utils-BRYtkma9.js';
import 'zod';
import './info-5wTP3IAZ.js';
import './activity-BuClHKQ6.js';
import 'multiformats/cid';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

declare function createContext<T extends SupportedPDSDomain>(opts?: {
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: StoredSession | null;
}>;

export { SupportedPDSDomain, createContext };
