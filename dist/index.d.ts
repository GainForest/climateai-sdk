import { S as SupportedPDSDomain, a as StoredSession } from './session-CVwZsSI7.js';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './session-CVwZsSI7.js';
export { A as AppRouter } from './_app-nfMYhrik.js';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.js';
import 'zod';
import './activity-BHO9ElRW.js';
import 'multiformats/cid';
import './collection-DOapNLRU.js';
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
