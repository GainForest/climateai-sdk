import { Ecocert } from '../types.cjs';
import '../utils-BRYtkma9.cjs';
import { M as Main } from '../info-B-l-_nUN.cjs';
import { M as Main$1 } from '../activity-D02N0lQZ.cjs';
import { G as GetRecordResponse } from '../response-types-DkRV5jYn.cjs';
import { S as SupportedPDSDomain } from '../index-DeueK3FL.cjs';
import 'zod';
import 'multiformats/cid';
import '../blobref-e8ss-bC-.cjs';
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
