import type { ValidationResult } from "@atproto/lexicon";
import { TRPCError } from "@trpc/server";

export const validateRecordOrThrow = <T>(
  record: unknown,
  {
    validateRecord,
  }: { validateRecord: (record: unknown) => ValidationResult<T> }
) => {
  let validationResponse;
  try {
    validationResponse = validateRecord(record);
  } catch (error) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Invalid record",
      cause: error,
    });
  }
  if (!validationResponse.success) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: validationResponse.error.message,
      cause: validationResponse.error,
    });
  }
  return validationResponse.value;
};
