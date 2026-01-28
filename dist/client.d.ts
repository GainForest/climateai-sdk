import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-BKNpJhsF.js';
import { S as SupportedPDSDomain } from './session-BJjwpb2l.js';
import '@trpc/server/unstable-core-do-not-import';
import './project-B5S3nOat.js';
import './utils-BtB-jULs.js';
import 'zod';
import './activity-B4BTvcNK.js';
import 'multiformats/cid';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
