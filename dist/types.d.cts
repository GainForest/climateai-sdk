import './utils-BtB-jULs.cjs';
import { M as Main } from './activity-DclFid0x.cjs';
import { G as GetRecordResponse } from './response-types-a9c2mEQD.cjs';
export { P as PutRecordResponse } from './response-types-a9c2mEQD.cjs';
import 'zod';
import 'multiformats/cid';

type Ecocert = {
    repo: {
        did: string;
    };
    organizationInfo: {
        name: string;
        logoUrl: string | null;
    };
    claimActivity: GetRecordResponse<Main>;
};

export { type Ecocert, GetRecordResponse };
