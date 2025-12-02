import { M as Main } from '../claim-CsQa9nQY.cjs';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.cjs';
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
