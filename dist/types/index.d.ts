import { G as GetRecordResponse, M as Main } from '../response-types-KuK1f8zo.js';
import '../util-FfahvqOL.js';
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
