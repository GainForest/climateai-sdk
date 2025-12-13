// src/client/index.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { customTransformer } from "@/utilities/transformer";
var createTRPCClient = (trpcEndpoint) => createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: trpcEndpoint,
      transformer: customTransformer
    })
  ]
});
export {
  createTRPCClient
};
//# sourceMappingURL=index.js.map