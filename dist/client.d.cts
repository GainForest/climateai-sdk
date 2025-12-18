import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-CT2sdH2n.cjs';
import { S as SupportedPDSDomain } from './session-C_B9tOsx.cjs';
import '@trpc/server/unstable-core-do-not-import';
import './info-JAV9WD3r.cjs';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-DclFid0x.cjs';
import 'multiformats/cid';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
