import * as _trpc_client from '@trpc/client';
import { AppRouter } from './index.cjs';
import { S as SupportedPDSDomain } from './index-DP2hJ4Ri.cjs';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
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
