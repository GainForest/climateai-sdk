import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';
import { M as Main, a as Main$1, b as Main$2, c as Main$3, d as Main$5 } from './info-LubXhrYx.cjs';
import { M as Main$4 } from './activity-DclFid0x.cjs';
import * as _atproto_api_dist_client_types_com_atproto_sync_listRepos from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import * as _atproto_api_dist_client_types_com_atproto_repo_deleteRecord from '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_putRecord from '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_createRecord from '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import { G as GetRecordResponse, P as PutRecordResponse } from './response-types-a9c2mEQD.cjs';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
import { S as SupportedPDSDomain, a as StoredSession } from './session-DkY8h_JF.cjs';
import z from 'zod';

declare class AppRouterFactory<T extends SupportedPDSDomain> {
    allowedPDSDomains: T[];
    allowedPDSDomainSchema: z.ZodEnum<{ [k_1 in T]: k_1; } extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never>;
    appRouter: _trpc_server.TRPCBuiltRouter<{
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
                    did: string;
                    handle: string;
                    service: Record<T, T>[T];
                };
                meta: object;
            }>;
            resume: _trpc_server.TRPCMutationProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: {
                    did: string;
                    handle: string;
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
                                } | undefined;
                            };
                            pdsDomain: Record<T, T>[T];
                            uploads?: {
                                shapefile?: {
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
                measuredTrees: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$3>;
                        meta: object;
                    }>;
                };
            };
        };
        hypercerts: {
            claim: {
                activity: {
                    create: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            activity: {
                                title: string;
                                shortDescription: string;
                                workScopes: string[];
                                startDate: string;
                                endDate: string;
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
                            activities: GetRecordResponse<Main$4>[];
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
                        output: GetRecordResponse<Main$4>;
                        meta: object;
                    }>;
                };
            };
            location: {
                get: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        rkey: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$5>;
                    meta: object;
                }>;
            };
        };
    }>>;
    constructor(_allowedPDSDomains: T[]);
    getServerCaller: () => _trpc_server_unstable_core_do_not_import.DecorateRouterRecord<_trpc_server.TRPCDecorateCreateRouterOptions<{
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
                    did: string;
                    handle: string;
                    service: Record<T, T>[T];
                };
                meta: object;
            }>;
            resume: _trpc_server.TRPCMutationProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: {
                    did: string;
                    handle: string;
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
                                } | undefined;
                            };
                            pdsDomain: Record<T, T>[T];
                            uploads?: {
                                shapefile?: {
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
                measuredTrees: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$3>;
                        meta: object;
                    }>;
                };
            };
        };
        hypercerts: {
            claim: {
                activity: {
                    create: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            activity: {
                                title: string;
                                shortDescription: string;
                                workScopes: string[];
                                startDate: string;
                                endDate: string;
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
                            activities: GetRecordResponse<Main$4>[];
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
                        output: GetRecordResponse<Main$4>;
                        meta: object;
                    }>;
                };
            };
            location: {
                get: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        rkey: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$5>;
                    meta: object;
                }>;
            };
        };
    }>>;
}
type AppRouter<T extends SupportedPDSDomain> = AppRouterFactory<T>["appRouter"];

export type { AppRouter as A };
