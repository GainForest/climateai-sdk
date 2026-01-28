import type { Agent } from "@atproto/api";
import type { ValidationResult } from "@atproto/lexicon";
import { XRPCError } from "@atproto/xrpc";
import { TRPCError } from "@trpc/server";
import { tryCatch } from "@/_internal/lib/tryCatch";
import type { GetRecordResponse, PutRecordResponse } from "./response-types";

/**
 * Base type constraint for ATProto records
 */
type RecordType = Record<string, unknown>;

/**
 * Lexicon validator interface - all lexicon types from lex-api expose this
 */
export type LexiconValidator<T> = {
  validateRecord: (record: unknown) => ValidationResult<T>;
};

/**
 * Error messages with context for user-friendly feedback
 */
const createErrorMessage = {
  fetchFailed: (resource: string) => `Failed to fetch ${resource}.`,
  listFailed: (resource: string) => `Failed to list ${resource}.`,
  createFailed: (resource: string) => `Failed to create ${resource}.`,
  updateFailed: (resource: string) => `Failed to update ${resource}.`,
  deleteFailed: (resource: string) => `Failed to delete ${resource}.`,
  notFound: (resource: string) => `The ${resource} was not found.`,
  invalidData: (resource: string) =>
    `The ${resource} data is invalid or malformed.`,
  unauthorized: () => "You are not authorized to perform this action.",
  unknown: () => "An unexpected error occurred. Please try again.",
};

/**
 * Converts XRPC errors to user-friendly TRPC errors
 */
const handleXrpcError = (error: XRPCError, resource: string): never => {
  if (error.error === "InvalidRequest") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: createErrorMessage.invalidData(resource),
      cause: error,
    });
  }
  if (error.error === "RecordNotFound") {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: createErrorMessage.notFound(resource),
      cause: error,
    });
  }
  if (error.error === "AuthRequired" || error.error === "InvalidToken") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: createErrorMessage.unauthorized(),
      cause: error,
    });
  }
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: createErrorMessage.unknown(),
    cause: error,
  });
};

/**
 * Validates a record against a lexicon schema
 */
const validateRecord = <T>(
  record: unknown,
  validator: LexiconValidator<T>,
  resource: string
): T => {
  let validationResponse: ValidationResult<T>;
  try {
    validationResponse = validator.validateRecord(record);
  } catch (error) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: createErrorMessage.invalidData(resource),
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

/**
 * Handles common error scenarios for ATProto operations
 */
const handleOperationError = (
  error: Error,
  resource: string,
  operation: "fetch" | "list" | "create" | "update" | "delete"
): never => {
  if (error instanceof XRPCError) {
    handleXrpcError(error, resource);
  }
  if (error instanceof TRPCError) {
    throw error;
  }
  const messageMap = {
    fetch: createErrorMessage.fetchFailed,
    list: createErrorMessage.listFailed,
    create: createErrorMessage.createFailed,
    update: createErrorMessage.updateFailed,
    delete: createErrorMessage.deleteFailed,
  };
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: messageMap[operation](resource),
    cause: error,
  });
};

// ============================================================================
// CRUD Operations
// ============================================================================

export type GetRecordParams<T> = {
  agent: Agent;
  collection: string;
  repo: string;
  rkey: string;
  validator: LexiconValidator<T>;
  /** Human-readable resource name for error messages (e.g., "layer", "organization info") */
  resourceName: string;
};

/**
 * Fetches a single record from ATProto, validates it, and returns typed result.
 *
 * @example
 * const result = await getRecord({
 *   agent: getReadAgent(pdsDomain),
 *   collection: "app.gainforest.organization.layer",
 *   repo: did,
 *   rkey: "abc123",
 *   validator: AppGainforestOrganizationLayer,
 *   resourceName: "layer",
 * });
 */
export const getRecord = async <T>({
  agent,
  collection,
  repo,
  rkey,
  validator,
  resourceName,
}: GetRecordParams<T>): Promise<GetRecordResponse<T>> => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.getRecord({ collection, repo, rkey })
  );

  if (error !== null) {
    handleOperationError(error, resourceName, "fetch");
  }

  if (response === null || !response.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.fetchFailed(resourceName),
    });
  }

  const validatedValue = validateRecord(response.data.value, validator, resourceName);

  return {
    uri: response.data.uri,
    cid: response.data.cid,
    value: validatedValue,
  };
};

export type ListRecordsParams<T> = {
  agent: Agent;
  collection: string;
  repo: string;
  validator: LexiconValidator<T>;
  resourceName: string;
  /** If true, silently skip invalid records. If false, throw on first invalid record. Default: true */
  skipInvalid?: boolean;
  limit?: number;
  cursor?: string;
};

export type ListRecordsResponse<T> = {
  records: GetRecordResponse<T>[];
  cursor?: string;
};

/**
 * Lists records from ATProto, validates each, and returns typed results.
 *
 * @example
 * const result = await listRecords({
 *   agent: getReadAgent(pdsDomain),
 *   collection: "app.gainforest.organization.layer",
 *   repo: did,
 *   validator: AppGainforestOrganizationLayer,
 *   resourceName: "layers",
 * });
 */
export const listRecords = async <T>({
  agent,
  collection,
  repo,
  validator,
  resourceName,
  skipInvalid = true,
  limit,
  cursor,
}: ListRecordsParams<T>): Promise<ListRecordsResponse<T>> => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.listRecords({ collection, repo, limit, cursor })
  );

  if (error !== null) {
    handleOperationError(error, resourceName, "list");
  }

  if (response === null || !response.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.listFailed(resourceName),
    });
  }

  const validatedRecords: GetRecordResponse<T>[] = [];

  for (const record of response.data.records) {
    try {
      const validatedValue = validateRecord(record.value, validator, resourceName);
      validatedRecords.push({
        uri: record.uri,
        cid: record.cid,
        value: validatedValue,
      });
    } catch (validationError) {
      if (!skipInvalid) {
        throw validationError;
      }
      // Skip invalid records silently when skipInvalid is true
    }
  }

  return {
    records: validatedRecords,
    cursor: response.data.cursor,
  };
};

export type CreateRecordParams<T extends RecordType> = {
  agent: Agent;
  collection: string;
  repo: string;
  record: T;
  validator: LexiconValidator<T>;
  resourceName: string;
  /** Optional record key. If not provided, ATProto will auto-generate one. */
  rkey?: string;
};

/**
 * Creates a new record in ATProto after validation.
 *
 * @example
 * const result = await createRecord({
 *   agent: await getWriteAgent(pdsDomain),
 *   collection: "app.gainforest.organization.layer",
 *   repo: did,
 *   record: layerData,
 *   validator: AppGainforestOrganizationLayer,
 *   resourceName: "layer",
 * });
 */
export const createRecord = async <T extends RecordType>({
  agent,
  collection,
  repo,
  record,
  validator,
  resourceName,
  rkey,
}: CreateRecordParams<T>): Promise<PutRecordResponse<T>> => {
  // Validate before sending to ensure data integrity
  const validatedRecord = validateRecord(record, validator, resourceName);

  const [response, error] = await tryCatch(
    agent.com.atproto.repo.createRecord({
      collection,
      repo,
      record: validatedRecord as RecordType,
      rkey,
    })
  );

  if (error !== null) {
    handleOperationError(error, resourceName, "create");
  }

  if (response === null || !response.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.createFailed(resourceName),
    });
  }

  return {
    uri: response.data.uri,
    cid: response.data.cid,
    validationStatus: response.data.validationStatus,
    value: validatedRecord,
  };
};

export type PutRecordParams<T extends RecordType> = {
  agent: Agent;
  collection: string;
  repo: string;
  rkey: string;
  record: T;
  validator: LexiconValidator<T>;
  resourceName: string;
};

/**
 * Updates (or creates) a record in ATProto using putRecord (upsert).
 *
 * @example
 * const result = await putRecord({
 *   agent: await getWriteAgent(pdsDomain),
 *   collection: "app.gainforest.organization.layer",
 *   repo: did,
 *   rkey: "abc123",
 *   record: layerData,
 *   validator: AppGainforestOrganizationLayer,
 *   resourceName: "layer",
 * });
 */
export const putRecord = async <T extends RecordType>({
  agent,
  collection,
  repo,
  rkey,
  record,
  validator,
  resourceName,
}: PutRecordParams<T>): Promise<PutRecordResponse<T>> => {
  // Validate before sending
  const validatedRecord = validateRecord(record, validator, resourceName);

  const [response, error] = await tryCatch(
    agent.com.atproto.repo.putRecord({
      collection,
      repo,
      rkey,
      record: validatedRecord as RecordType,
    })
  );

  if (error !== null) {
    handleOperationError(error, resourceName, "update");
  }

  if (response === null || !response.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.updateFailed(resourceName),
    });
  }

  return {
    uri: response.data.uri,
    cid: response.data.cid,
    validationStatus: response.data.validationStatus,
    value: validatedRecord,
  };
};

export type DeleteRecordParams = {
  agent: Agent;
  collection: string;
  repo: string;
  rkey: string;
  resourceName: string;
};

export type DeleteRecordResponse = {
  success: true;
};

/**
 * Deletes a record from ATProto.
 *
 * @example
 * await deleteRecord({
 *   agent: await getWriteAgent(pdsDomain),
 *   collection: "app.gainforest.organization.layer",
 *   repo: did,
 *   rkey: "abc123",
 *   resourceName: "layer",
 * });
 */
export const deleteRecord = async ({
  agent,
  collection,
  repo,
  rkey,
  resourceName,
}: DeleteRecordParams): Promise<DeleteRecordResponse> => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.deleteRecord({ collection, repo, rkey })
  );

  if (error !== null) {
    handleOperationError(error, resourceName, "delete");
  }

  if (response === null || !response.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.deleteFailed(resourceName),
    });
  }

  return { success: true };
};

// ============================================================================
// Convenience: Create or Update (conditional upsert)
// ============================================================================

export type CreateOrUpdateRecordParams<T extends RecordType> = {
  agent: Agent;
  collection: string;
  repo: string;
  record: T;
  validator: LexiconValidator<T>;
  resourceName: string;
  /** If provided, uses putRecord (update). If not, uses createRecord (insert). */
  rkey?: string;
};

/**
 * Creates or updates a record based on whether rkey is provided.
 * - With rkey: uses putRecord (upsert)
 * - Without rkey: uses createRecord (insert with auto-generated rkey)
 */
export const createOrUpdateRecord = async <T extends RecordType>({
  agent,
  collection,
  repo,
  record,
  validator,
  resourceName,
  rkey,
}: CreateOrUpdateRecordParams<T>): Promise<PutRecordResponse<T>> => {
  if (rkey) {
    return putRecord({
      agent,
      collection,
      repo,
      rkey,
      record,
      validator,
      resourceName,
    });
  }
  return createRecord({
    agent,
    collection,
    repo,
    record,
    validator,
    resourceName,
  });
};
