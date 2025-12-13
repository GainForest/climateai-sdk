import * as _trpc_client from '@trpc/client';
import { AppRouter } from '@/server/routers/_app';
import { SupportedPDSDomain } from '@/index';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;

export { createTRPCClient };
