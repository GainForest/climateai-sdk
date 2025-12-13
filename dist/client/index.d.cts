import * as _trpc_client from '@trpc/client';
import { S as SupportedPDSDomain, A as AppRouter } from '../index-H9nozGt2.cjs';
import '../lex-api/util.cjs';
import '@atproto/lexicon';
import '../info-CKHQe3VC.cjs';
import '../activity-86GSii7W.cjs';
import '../blobref-dnAPTT_v.cjs';
import 'zod';
import '@atproto/api';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
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
