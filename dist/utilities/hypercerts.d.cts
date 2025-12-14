import { Ecocert } from '../types.cjs';
import { Repo } from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '../utils-BtB-jULs.cjs';
import { M as Main } from '../info-JAV9WD3r.cjs';
import { M as Main$1 } from '../activity-DclFid0x.cjs';
import { G as GetRecordResponse } from '../response-types-DkRV5jYn.cjs';
import { S as SupportedPDSDomain } from '../session-BbKVvHt8.cjs';
import 'zod';
import 'multiformats/cid';
import '@atproto/oauth-client-node';
import '../blobref-e8ss-bC-.cjs';
import '@atproto/api';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

type OrganizationWithActivities = {
    repo: Repo;
    organizationInfo: Main;
    activities: GetRecordResponse<Main$1>[];
};

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
