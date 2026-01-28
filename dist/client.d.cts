import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-DYlAoUWF.cjs';
import { S as SupportedPDSDomain } from './session-BuEIqD5B.cjs';
import '@trpc/server/unstable-core-do-not-import';
import './collection-iPiupYR_.cjs';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-DgaiG8Qy.cjs';
import 'multiformats/cid';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
