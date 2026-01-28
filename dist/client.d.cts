import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-BLvPb6Vj.cjs';
import { S as SupportedPDSDomain } from './index-CULRM_IA.cjs';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import './info-B-l-_nUN.cjs';
import './utils-BRYtkma9.cjs';
import 'zod';
import './activity-D02N0lQZ.cjs';
import 'multiformats/cid';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@atproto/oauth-client-node';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
