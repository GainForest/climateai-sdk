import { S as SupportedPDSDomain, a as StoredSession } from './index-EggIplvQ.js';
export { g as getSessionFromRequest } from './index-EggIplvQ.js';
import * as _atproto_api_dist_client_types_com_atproto_server_getSession from '@atproto/api/dist/client/types/com/atproto/server/getSession';
import './utils-BRYtkma9.js';
import 'zod';
import './info-5wTP3IAZ.js';
import './activity-BuClHKQ6.js';
import 'multiformats/cid';
import './blobref-e8ss-bC-.js';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.js';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

declare const resumeCredentialSession: (service: SupportedPDSDomain, sessionData: StoredSession) => Promise<_atproto_api_dist_client_types_com_atproto_server_getSession.Response>;

export { StoredSession, resumeCredentialSession };
