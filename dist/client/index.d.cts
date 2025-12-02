import * as _trpc_client from '@trpc/client';
import { S as SupportedPDSDomain, A as AppRouter } from '../index-DqqHAJDq.cjs';
import '../claim-CsQa9nQY.cjs';
import '@atproto/lexicon';
import '../info-DNNfv494.cjs';
import '../blobref-CzIHHOw4.cjs';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-a9c2mEQD.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
