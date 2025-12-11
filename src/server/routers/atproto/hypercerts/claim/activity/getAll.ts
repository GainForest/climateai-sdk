import { publicProcedure } from "@/server/trpc";
import { z } from "zod";
import type { GetRecordResponse } from "@/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { OrgHypercertsClaimActivity } from "@/../lex-api";
import { tryCatch } from "@/lib/tryCatch";
import { XRPCError } from "@atproto/xrpc";
import { getReadAgent } from "@/server/utils/agent";
import { xrpcErrorToTRPCError } from "@/server/utils/classify-xrpc-error";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/index";

export const getAllClaimActivitiesPure = async <T extends SupportedPDSDomain>(
  did: string,
  pdsDomain: T
) => {
  const activityNSID: OrgHypercertsClaimActivity.Record["$type"] =
    "org.hypercerts.claim.activity";
  const agent = getReadAgent(pdsDomain);
  const [listClaimActivitiesResponse, errorListClaimActivities] =
    await tryCatch(
      agent.com.atproto.repo.listRecords({
        collection: activityNSID,
        repo: did,
      })
    );

  if (errorListClaimActivities) {
    if (errorListClaimActivities instanceof XRPCError) {
      const trpcError = xrpcErrorToTRPCError(errorListClaimActivities);
      throw trpcError;
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred.",
    });
  } else if (listClaimActivitiesResponse.success !== true) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred.",
    });
  }

  const validRecords = listClaimActivitiesResponse.data.records
    .map((record) => {
      try {
        validateRecordOrThrow(record.value, OrgHypercertsClaimActivity);
        return record;
      } catch {
        return null;
      }
    })
    .filter(
      (record) => record !== null
    ) as GetRecordResponse<OrgHypercertsClaimActivity.Record>[];

  return {
    activities: validRecords,
  };
};

export const getAllClaimActivitiesFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(
      z.object({
        did: z.string(),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .query(async ({ input }) => {
      return await getAllClaimActivitiesPure(input.did, input.pdsDomain);
    });
};
