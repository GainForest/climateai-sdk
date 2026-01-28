import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-nfMYhrik.js';
import { S as SupportedPDSDomain } from './session-CVwZsSI7.js';
import '@trpc/server/unstable-core-do-not-import';
import './collection-DOapNLRU.js';
import './utils-BtB-jULs.js';
import 'zod';
import './activity-BHO9ElRW.js';
import 'multiformats/cid';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
