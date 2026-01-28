import * as _trpc_client from '@trpc/client';
import { A as AppRouter } from './_app-CtGahXST.cjs';
import { S as SupportedPDSDomain } from './session-Doi-8fnR.cjs';
import '@trpc/server/unstable-core-do-not-import';
import './project-DIS_R7JL.cjs';
import './utils-BtB-jULs.cjs';
import 'zod';
import './activity-BWO0-2j_.cjs';
import 'multiformats/cid';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';
import './blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
