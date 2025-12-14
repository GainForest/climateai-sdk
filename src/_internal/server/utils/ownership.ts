import { parseAtUri } from "@/_internal/utilities/atproto";
import { TRPCError } from "@trpc/server";

export const checkOwnershipByAtUri = (atUri: string, userDid: string) => {
  const { did } = parseAtUri(atUri);
  if (did !== userDid) {
    return false;
  }
  return true;
};
