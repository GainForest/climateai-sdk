import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { XRPCError } from "@atproto/xrpc";
import { type GetRecordResponse } from "@/_internal/server/utils/response-types";
import { AppCertifiedLocation } from "@/../lex-api";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { xrpcErrorToTRPCError } from "@/_internal/server/utils/classify-xrpc-error";
import { TRPCError } from "@trpc/server";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";

export const getCertifiedLocationPure = async <T extends SupportedPDSDomain>(
  did: string,
  rkey: string,
  pdsDomain: T
) => {
  const agent = getReadAgent(pdsDomain);
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.certified.location",
    repo: did,
    rkey: rkey,
  });
  const [response, error] = await tryCatch(getRecordPromise);

  if (error) {
    if (error instanceof XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  }

  if (response.success !== true) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info.",
    });
  }

  validateRecordOrThrow(response.data.value, AppCertifiedLocation);

  return response.data as GetRecordResponse<AppCertifiedLocation.Record>;
};

export const getCertifiedLocationFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        did: z.string(),
        rkey: z.string(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .query(async ({ input }) => {
      return await getCertifiedLocationPure(
        input.did,
        input.rkey,
        input.pdsDomain
      );
    });
};
