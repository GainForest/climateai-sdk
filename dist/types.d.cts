import './utils-BRYtkma9.cjs';
import { M as Main } from './activity-D02N0lQZ.cjs';
import { G as GetRecordResponse } from './response-types-DkRV5jYn.cjs';
export { P as PutRecordResponse } from './response-types-DkRV5jYn.cjs';
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
