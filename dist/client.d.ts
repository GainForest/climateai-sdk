import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-Bhr7XX3d.js';
import { S as SupportedPDSDomain } from './index-GNiAPHdX.js';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import './info-5wTP3IAZ.js';
import './utils-BRYtkma9.js';
import 'zod';
import './activity-BuClHKQ6.js';
import 'multiformats/cid';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@atproto/oauth-client-node';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
