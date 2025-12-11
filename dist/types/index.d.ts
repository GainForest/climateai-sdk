import { M as Main } from '../activity-CcsC6-ni.js';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.js';
export { P as PutRecordResponse } from '../response-types-a9c2mEQD.js';
import '../lex-api/util.js';
import '@atproto/lexicon';

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
