import { Ecocert } from '../types/index.js';
import { Repo } from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import { M as Main } from '../info-BGFSzg3y.js';
import { M as Main$1 } from '../activity-CcsC6-ni.js';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.js';
import { S as SupportedPDSDomain } from '../index-CPSnSCqs.js';
import '../lex-api/util.js';
import '@atproto/lexicon';
import '../blobref-dnAPTT_v.js';
import 'zod';
import '@atproto/api';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
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
