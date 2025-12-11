import { M as Main } from '../activity-C2XJbhf5.cjs';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.cjs';
export { P as PutRecordResponse } from '../response-types-a9c2mEQD.cjs';
import '@atproto/lexicon';

type Ecocert = {
    repo: {
        did: string;
    };
    organizationInfo: {
        name: string;
        logoUrl: string | null;
    };
    claim: GetRecordResponse<Main>;
};

export { type Ecocert, GetRecordResponse };
