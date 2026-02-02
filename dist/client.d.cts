import * as _trpc_client from '@trpc/client';
import { AppRouter } from './index.cjs';
import { S as SupportedPDSDomain } from './index-NX02lVa-.cjs';
import '@trpc/server/unstable-core-do-not-import';
import './collection-SgBIeJK4.cjs';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-CkQLvIqT.cjs';
import 'multiformats/cid';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import './config-eXJj8SMU.cjs';
import 'iron-session';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
