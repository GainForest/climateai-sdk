import { Ecocert } from '../types/index.cjs';
import { Repo } from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import { M as Main } from '../info-CKHQe3VC.cjs';
import { M as Main$1 } from '../activity-86GSii7W.cjs';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.cjs';
import { S as SupportedPDSDomain } from '../index-C3AsPOS-.cjs';
import '../lex-api/util.cjs';
import '@atproto/lexicon';
import '../blobref-CzIHHOw4.cjs';
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
