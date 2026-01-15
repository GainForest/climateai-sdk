import { S as SupportedPDSDomain } from './index-BzGUZaX_.cjs';
export { a as StoredSession, g as getSessionFromRequest } from './index-BzGUZaX_.cjs';
import * as _atproto_api_dist_client_types_com_atproto_server_getSession from '@atproto/api/dist/client/types/com/atproto/server/getSession';
import * as _atproto_api from '@atproto/api';
import './utils-BRYtkma9.cjs';
import 'zod';
import './info-B-l-_nUN.cjs';
import './activity-D02N0lQZ.cjs';
import 'multiformats/cid';
import './blobref-e8ss-bC-.cjs';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import './response-types-DkRV5jYn.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

declare const resumeCredentialSession: (service: SupportedPDSDomain) => (session: _atproto_api.AtpSessionData) => Promise<_atproto_api_dist_client_types_com_atproto_server_getSession.Response>;

export { resumeCredentialSession };
