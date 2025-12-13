import { OrgHypercertsClaimActivity } from '@/../lex-api';
import { GetRecordResponse } from '@/server/utils/response-types';
export { GetRecordResponse, PutRecordResponse } from '@/server/utils/response-types';

type Ecocert = {
    repo: {
        did: string;
    };
    organizationInfo: {
        name: string;
        logoUrl: string | null;
    };
    claimActivity: GetRecordResponse<OrgHypercertsClaimActivity.Record>;
};

export type { Ecocert };
