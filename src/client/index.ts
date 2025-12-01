import type { AppRouter } from "@/server/routers/_app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { SupportedPDSDomain } from "@/index";
import { customTransformer } from "@/utilities/transformer";

export const createTRPCClient = <T extends SupportedPDSDomain>(
  trpcEndpoint: string
) =>
  createTRPCProxyClient<AppRouter<T>>({
    links: [
      httpBatchLink({
        url: trpcEndpoint,
        transformer: customTransformer,
      }),
    ],
  });
