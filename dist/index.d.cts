import { S as SupportedPDSDomain, a as StoredSession } from './session-BuEIqD5B.cjs';
export { G as GainforestSDK, s as supportedPDSDomainSchema } from './session-BuEIqD5B.cjs';
export { A as AppRouter } from './_app-DYlAoUWF.cjs';
import '@atproto/oauth-client-node';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-DgaiG8Qy.cjs';
import 'multiformats/cid';
import './collection-iPiupYR_.cjs';
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
