import { Ecocert } from '../types.cjs';
import { O as OrganizationWithActivities, S as SupportedPDSDomain } from '../session-BuEIqD5B.cjs';
import '../utils-BtB-jULs.cjs';
import 'zod';
import '../activity-DgaiG8Qy.cjs';
import 'multiformats/cid';
import '../response-types-DkRV5jYn.cjs';
import '@atproto/oauth-client-node';
import '../collection-iPiupYR_.cjs';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
