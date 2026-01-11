import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-KXFulesx.js';
import { S as SupportedPDSDomain } from './session-D3BcCfum.js';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import './info-Bvuof6ha.js';
import './utils-BtB-jULs.js';
import 'zod';
import './activity-CvP9hZKL.js';
import 'multiformats/cid';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import './blobref-e8ss-bC-.js';
import '@atproto/api';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
