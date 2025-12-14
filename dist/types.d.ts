import './utils-BtB-jULs.js';
import { M as Main } from './activity-DdmMw7Qf.js';
import { G as GetRecordResponse } from './response-types-a9c2mEQD.js';
export { P as PutRecordResponse } from './response-types-a9c2mEQD.js';
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
