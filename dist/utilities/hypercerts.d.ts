import { Ecocert } from '@/types/Ecocert';
import { OrganizationWithActivities } from '@/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs';
import { SupportedPDSDomain } from '@/index';

declare const getEcocertsFromClaimActivities: (activitiesWithOrgInfo: OrganizationWithActivities[], pdsDomain: SupportedPDSDomain) => Ecocert[];

export { getEcocertsFromClaimActivities };
