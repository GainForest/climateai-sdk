import type { AppRouter } from "@/server/routers/_app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
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

export const createTRPCReactApi = <T extends SupportedPDSDomain>() => {
  return createTRPCReact<AppRouter<T>>({});
};
