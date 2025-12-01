import { M as Main } from '../claim-D_fBggK-.js';
import { G as GetRecordResponse } from '../response-types-a9c2mEQD.js';
import '../util-CbiaqOMs.js';
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

export type { Ecocert };
