import { Ecocert } from '../types/index.js';
import { Repo } from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import { M as Main } from '../info-CBCS_to1.js';
import { M as Main$1 } from '../activity-C2XJbhf5.js';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.js';
import { S as SupportedPDSDomain } from '../index-eqw1Vpb5.js';
import '@atproto/lexicon';
import '../blobref-CzIHHOw4.js';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

type OrganizationWithActivities = {
    repo: Repo;
    organizationInfo: Main;
    activities: GetRecordResponse<Main$1>[];
};

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
