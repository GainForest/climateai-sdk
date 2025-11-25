import { OrgHypercertsClaimClaim } from "@/../lex-api";
import type { GetRecordResponse } from "@/server/utils/response-types";

export type Ecocert = {
  repo: {
    did: string;
  };
  organizationInfo: {
    name: string;
    logoUrl: string | null;
  };
  claim: GetRecordResponse<OrgHypercertsClaimClaim.Record>;
};
