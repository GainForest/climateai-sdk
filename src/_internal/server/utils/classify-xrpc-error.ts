import { XRPCError } from "@atproto/xrpc";
import { TRPCError } from "@trpc/server";

export const xrpcErrorToTRPCError = (error: XRPCError): TRPCError => {
  if (error.error === "InvalidRequest") {
    return new TRPCError({
      code: "BAD_REQUEST",
      message: "This resource does not exist.",
    });
  } else if (error.error === "RecordNotFound") {
    return new TRPCError({
      code: "NOT_FOUND",
      message: "The resource you are looking for does not exist.",
    });
  } else {
    console.error("xrpc error could not be classified by trpc. error:", error);
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred.",
    });
  }
};
