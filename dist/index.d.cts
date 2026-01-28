import { S as SupportedPDSDomain, a as StoredSession } from './session-Doi-8fnR.cjs';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './session-Doi-8fnR.cjs';
export { A as AppRouter } from './_app-CtGahXST.cjs';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.cjs';
import 'zod';
import './project-DIS_R7JL.cjs';
import './activity-BWO0-2j_.cjs';
import 'multiformats/cid';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import './response-types-DkRV5jYn.cjs';
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
