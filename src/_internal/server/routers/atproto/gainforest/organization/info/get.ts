import { publicProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { XRPCError } from "@atproto/xrpc";
import type { GetRecordResponse } from "@/_internal/server/utils/response-types";
import { AppGainforestOrganizationInfo } from "@/../lex-api";
import { getReadAgent } from "@/_internal/server/utils/agent";
import { xrpcErrorToTRPCError } from "@/_internal/server/utils/classify-xrpc-error";
import { TRPCError } from "@trpc/server";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";

export const getOrganizationInfoPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
) => {
  const agent = getReadAgent(pdsDomain);
  console.log("FETCHING_ORG_INFO:", JSON.stringify({ did, pdsDomain }));
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.gainforest.organization.info",
    repo: did,
    rkey: "self",
  });
  const [response, error] = await tryCatch(getRecordPromise);

  if (error) {
    if (error instanceof XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      console.log("FETCHING_ORG_INFO_ERROR:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  }

  if (response.success !== true) {
    console.log("FETCHING_ORG_INFO_ERROR: response.success is not true");
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info.",
    });
  }

  validateRecordOrThrow(response.data.value, AppGainforestOrganizationInfo);

  console.log("FETCHING_ORG_INFO_SUCCESS");
  return response.data as GetRecordResponse<AppGainforestOrganizationInfo.Record>;
};

export const getOrganizationInfoFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(z.object({ did: z.string(), pdsDomain: allowedPDSDomainSchema }))
    .query(async ({ input }) => {
      return await getOrganizationInfoPure(input.did, input.pdsDomain);
    });
};
