import { a as Main } from '../../claim-ZxCHJfe5.cjs';
import { G as GetRecordResponse } from '../../response-types-a9c2mEQD.cjs';
import '../../util-B5oZwPdx.cjs';
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
