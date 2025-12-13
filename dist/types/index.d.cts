import { M as Main } from '../activity-86GSii7W.cjs';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.cjs';
export { P as PutRecordResponse } from '../response-types-a9c2mEQD.cjs';
import '../lex-api/util.cjs';
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
