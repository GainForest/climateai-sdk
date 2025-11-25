import type { ValidationResult } from "@atproto/lexicon";
import { TRPCError } from "@trpc/server";

export const validateRecordOrThrow = <T>(
  record: T,
  { validateRecord }: { validateRecord: (record: T) => ValidationResult<T> }
) => {
  const validation = validateRecord(record);
  if (!validation.success) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: validation.error.message,
      cause: validation.error,
    });
  }
  return record;
};
