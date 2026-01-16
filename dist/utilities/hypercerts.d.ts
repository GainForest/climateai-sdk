import { Ecocert } from '../types.js';
import '../utils-BRYtkma9.js';
import { M as Main } from '../info-5wTP3IAZ.js';
import { M as Main$1 } from '../activity-BuClHKQ6.js';
import { G as GetRecordResponse } from '../response-types-DkRV5jYn.js';
import { S as SupportedPDSDomain } from '../index-GNiAPHdX.js';
import 'zod';
import 'multiformats/cid';
import '../blobref-e8ss-bC-.js';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

type OrganizationWithActivities = {
    repo: {
        did: string;
    };
    organizationInfo: Main;
    activities: GetRecordResponse<Main$1>[];
};

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
