import * as node_modules__trpc_react_query_dist_getQueryKey_d_CruH3ncI_d_mts from 'node_modules/@trpc/react-query/dist/getQueryKey.d-CruH3ncI.d.mts';
import { M as Main, a as Main$1, b as Main$2, c as Main$4 } from '../info-qqTZyivl.cjs';
import { M as Main$3 } from '../claim-CeQVbJ5a.cjs';
import * as _atproto_api_dist_client_types_com_atproto_sync_listRepos from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import * as _atproto_api_dist_client_types_com_atproto_repo_deleteRecord from '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_putRecord from '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_createRecord from '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import { G as GetRecordResponse, P as PutRecordResponse } from '../response-types-a9c2mEQD.cjs';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
import { S as SupportedPDSDomain, A as AppRouter, a as StoredSession } from '../index-BsJjDmyL.cjs';
import * as _trpc_react_query from '@trpc/react-query';
import * as _trpc_client from '@trpc/client';
import '../util-CbiaqOMs.cjs';
import '@atproto/lexicon';
import '../defs-BfYv75nX.cjs';
import '../blobref-CzIHHOw4.cjs';
import 'zod';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
import '@atproto/oauth-client-node';

declare const createTRPCClient: <T extends SupportedPDSDomain>(trpcEndpoint: string) => _trpc_client.TRPCClient<AppRouter<T>>;
declare const createTRPCReactApi: <T extends SupportedPDSDomain>() => _trpc_react_query.CreateTRPCReactBase<AppRouter<T>, unknown> & node_modules__trpc_react_query_dist_getQueryKey_d_CruH3ncI_d_mts.DecorateRouterRecord<{
    ctx: {
        session: StoredSession | null;
    };
    meta: object;
    errorShape: _trpc_server.TRPCDefaultErrorShape;
    transformer: true;
}, _trpc_server.TRPCDecorateCreateRouterOptions<{
    health: _trpc_server.TRPCQueryProcedure<{
        input: void;
        output: {
            status: string;
        };
        meta: object;
    }>;
    common: {
        uploadFileAsBlob: _trpc_server.TRPCMutationProcedure<{
            input: {
                file: {
                    name: string;
                    type: string;
                    dataBase64: string;
                };
                pdsDomain: Record<T, T>[T];
            };
            output: _atproto_api_dist_client_types_com_atproto_repo_uploadBlob.OutputSchema;
            meta: object;
        }>;
    };
    auth: {
        login: _trpc_server.TRPCMutationProcedure<{
            input: {
                handlePrefix: string;
                service: Record<T, T>[T];
                password: string;
            };
            output: {
                context: StoredSession;
                service: Record<T, T>[T];
            };
            meta: object;
        }>;
        resume: _trpc_server.TRPCMutationProcedure<{
            input: {
                service: Record<T, T>[T];
            };
            output: {
                context: StoredSession;
                service: Record<T, T>[T];
            };
            meta: object;
        }>;
        logout: _trpc_server.TRPCMutationProcedure<{
            input: {
                service: Record<T, T>[T];
            };
            output: {
                success: boolean;
            };
            meta: object;
        }>;
    };
    gainforest: {
        organization: {
            info: {
                get: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main>;
                    meta: object;
                }>;
                createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            info: {
                                displayName: string;
                                shortDescription: string;
                                longDescription: string;
                                objectives: ("Conservation" | "Research" | "Education" | "Community" | "Other")[];
                                country: string;
                                visibility: "Public" | "Hidden";
                                website?: string | undefined;
                                logo?: {
                                    $type: "blob-ref-generator";
                                    ref: {
                                        $link: string;
                                    };
                                    mimeType: string;
                                    size: number;
                                } | undefined;
                                coverImage?: {
                                    $type: "blob-ref-generator";
                                    ref: {
                                        $link: string;
                                    };
                                    mimeType: string;
                                    size: number;
                                } | undefined;
                                startDate?: string | undefined;
                            };
                            pdsDomain: Record<T, T>[T];
                            uploads?: {
                                logo?: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                } | undefined;
                                coverImage?: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                } | undefined;
                            } | undefined;
                        };
                        output: PutRecordResponse<Main>;
                        meta: object;
                    }>;
                    meta: object;
                }>;
            };
            site: {
                get: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        rkey: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$1>;
                    meta: object;
                }>;
                getAll: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: {
                        sites: GetRecordResponse<Main$1>[];
                        defaultSite: GetRecordResponse<Main$2> | null;
                    };
                    meta: object;
                }>;
                create: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        site: {
                            name: string;
                        };
                        uploads: {
                            shapefile: string | {
                                name: string;
                                type: string;
                                dataBase64: string;
                            };
                        };
                        pdsDomain: Record<T, T>[T];
                        rkey?: string | undefined;
                    };
                    output: _atproto_api_dist_client_types_com_atproto_repo_createRecord.OutputSchema;
                    meta: object;
                }>;
                update: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        rkey: string;
                        site: {
                            name: string;
                            lat: string;
                            lon: string;
                            area: string;
                            shapefile?: {
                                $type: "app.gainforest.common.defs#smallBlob";
                                blob: {
                                    $type: "blob-ref-generator";
                                    ref: {
                                        $link: string;
                                    };
                                    mimeType: string;
                                    size: number;
                                };
                            } | {
                                $type: "app.gainforest.common.defs#uri";
                                uri: string;
                            } | undefined;
                        };
                        pdsDomain: Record<T, T>[T];
                        uploads?: {
                            shapefile?: string | {
                                name: string;
                                type: string;
                                dataBase64: string;
                            } | undefined;
                        } | undefined;
                    };
                    output: _atproto_api_dist_client_types_com_atproto_repo_putRecord.OutputSchema;
                    meta: object;
                }>;
                delete: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        siteAtUri: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: _atproto_api_dist_client_types_com_atproto_repo_deleteRecord.OutputSchema;
                    meta: object;
                }>;
                getDefault: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$2>;
                    meta: object;
                }>;
                setDefault: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        siteAtUri: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: _atproto_api_dist_client_types_com_atproto_repo_putRecord.OutputSchema;
                    meta: object;
                }>;
            };
        };
    };
    hypercerts: {
        claim: {
            create: _trpc_server.TRPCMutationProcedure<{
                input: {
                    claim: {
                        title: string;
                        shortDescription: string;
                        workScope: string[];
                        workTimeFrameFrom: string;
                        workTimeFrameTo: string;
                        description?: string | undefined;
                    };
                    uploads: {
                        image: {
                            name: string;
                            type: string;
                            dataBase64: string;
                        };
                        contributors: string[];
                        siteAtUri: string;
                    };
                    pdsDomain: Record<T, T>[T];
                };
                output: _atproto_api_dist_client_types_com_atproto_repo_createRecord.Response;
                meta: object;
            }>;
            getAllAcrossOrgs: _trpc_server.TRPCQueryProcedure<{
                input: {
                    pdsDomain: Record<T, T>[T];
                };
                output: {
                    repo: _atproto_api_dist_client_types_com_atproto_sync_listRepos.Repo;
                    claims: GetRecordResponse<Main$3>[];
                    organizationInfo: Main;
                }[];
                meta: object;
            }>;
            get: _trpc_server.TRPCQueryProcedure<{
                input: {
                    did: string;
                    rkey: string;
                    pdsDomain: Record<T, T>[T];
                };
                output: GetRecordResponse<Main$3>;
                meta: object;
            }>;
        };
        location: {
            get: _trpc_server.TRPCQueryProcedure<{
                input: {
                    did: string;
                    rkey: string;
                    pdsDomain: Record<T, T>[T];
                };
                output: GetRecordResponse<Main$4>;
                meta: object;
            }>;
        };
    };
}>>;

export { createTRPCClient, createTRPCReactApi };
