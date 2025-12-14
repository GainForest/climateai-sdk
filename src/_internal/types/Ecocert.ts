import { OrgHypercertsClaimActivity } from "@/../lex-api";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";

export type Ecocert = {
  repo: {
    did: string;
  };
  organizationInfo: {
    name: string;
    logoUrl: string | null;
  };
  claimActivity: GetRecordResponse<OrgHypercertsClaimActivity.Record>;
};
