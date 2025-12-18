import { Ecocert } from '../types.js';
import { Repo } from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '../utils-BtB-jULs.js';
import { M as Main } from '../info-CAW9Nl57.js';
import { M as Main$1 } from '../activity-DdmMw7Qf.js';
import { G as GetRecordResponse } from '../response-types-DkRV5jYn.js';
import { S as SupportedPDSDomain } from '../session-B86fofTy.js';
import 'zod';
import 'multiformats/cid';
import '@atproto/oauth-client-node';
import '../blobref-e8ss-bC-.js';
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
