import * as _trpc_client from '@trpc/client';
import { AppRouter } from './index.js';
import { S as SupportedPDSDomain } from './index-aA-nMHyU.js';
import '@trpc/server/unstable-core-do-not-import';
import './collection-jFp4vEn8.js';
import './utils-BtB-jULs.js';
import 'zod';
import './activity-UF4_S-8v.js';
import 'multiformats/cid';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import './config-eXJj8SMU.js';
import 'iron-session';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
