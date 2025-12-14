import type { AppRouter } from "@/_internal/server/routers/_app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { SupportedPDSDomain } from "@/_internal/index";
import { customTransformer } from "@/_internal/utilities/transform";

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
