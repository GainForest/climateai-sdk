import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-BTOYop4C.cjs';
import { S as SupportedPDSDomain } from './session-CwvbAJac.cjs';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import './info-QcQhGTfG.cjs';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-D5PT-NMl.cjs';
import 'multiformats/cid';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
