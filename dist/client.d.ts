import * as _trpc_client from '@trpc/client';
import { AppRouter } from './index.js';
import { S as SupportedPDSDomain } from './index-CgHM_GBe.js';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
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
import '@hypercerts-org/sdk-core';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import './config-eXJj8SMU.js';
import 'iron-session';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
