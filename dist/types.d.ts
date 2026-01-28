import './utils-BtB-jULs.js';
import { M as Main } from './activity-B4BTvcNK.js';
import { G as GetRecordResponse } from './response-types-DkRV5jYn.js';
export { P as PutRecordResponse } from './response-types-DkRV5jYn.js';
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
