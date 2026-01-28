import { Ecocert } from '../types.js';
import { O as OrganizationWithActivities, S as SupportedPDSDomain } from '../session-CVwZsSI7.js';
import '../utils-BtB-jULs.js';
import 'zod';
import '../activity-BHO9ElRW.js';
import 'multiformats/cid';
import '../response-types-DkRV5jYn.js';
import '@atproto/oauth-client-node';
import '../collection-DOapNLRU.js';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/server/getSession';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
