import { G as GetRecordResponse, M as Main } from '../response-types-DK33iRKR.cjs';
import '../util-FfahvqOL.cjs';
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
