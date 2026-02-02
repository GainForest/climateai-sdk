import { Ecocert } from '../types.cjs';
import { O as OrganizationWithActivities, S as SupportedPDSDomain } from '../index-NX02lVa-.cjs';
import '../utils-BtB-jULs.cjs';
import 'zod';
import '../activity-CkQLvIqT.cjs';
import 'multiformats/cid';
import '../response-types-DkRV5jYn.cjs';
import '../collection-SgBIeJK4.cjs';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@hypercerts-org/sdk-core';
import '../config-eXJj8SMU.cjs';
import 'iron-session';

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
