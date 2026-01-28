import { S as SupportedPDSDomain, a as StoredSession } from './index-CChY4jWx.cjs';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './index-CChY4jWx.cjs';
export { A as AppRouter } from './_app-CnQrUlce.cjs';
import './utils-BRYtkma9.cjs';
import 'zod';
import './info-B-l-_nUN.cjs';
import './activity-D02N0lQZ.cjs';
import 'multiformats/cid';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.cjs';
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
