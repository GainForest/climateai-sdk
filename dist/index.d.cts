import { S as SupportedPDSDomain, a as StoredSession } from './session-DkY8h_JF.cjs';
export { C as ClimateAiSDK, s as supportedPDSDomainSchema } from './session-DkY8h_JF.cjs';
export { A as AppRouter } from './_app-BvLrntkg.cjs';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.cjs';
import 'zod';
import './info-LubXhrYx.cjs';
import './activity-DclFid0x.cjs';
import 'multiformats/cid';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-a9c2mEQD.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare function createContext<T extends SupportedPDSDomain>(opts?: {
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: StoredSession | null;
}>;

export { SupportedPDSDomain, createContext };
