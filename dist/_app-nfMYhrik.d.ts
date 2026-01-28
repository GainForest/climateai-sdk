import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';
import { M as Main, a as Main$1, b as Main$2, c as Main$4, d as Main$5, e as Main$6 } from './collection-DOapNLRU.js';
import { S as SupportedPDSDomain, a as StoredSession, L as LoginResult, R as ResumeResult, b as LogoutResult, O as OrganizationWithActivities, c as GetAllClaimActivitiesResponse, d as GetAllLocationsResponse, D as DeleteRecordResponse } from './session-CVwZsSI7.js';
import { M as Main$3 } from './activity-BHO9ElRW.js';
import { G as GetRecordResponse, P as PutRecordResponse } from './response-types-DkRV5jYn.js';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
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
                    did: string;
                    pdsDomain: Record<T, T>[T];
                    file: {
                        name: string;
                        type: string;
                        dataBase64: string;
                    };
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
                output: LoginResult;
                meta: object;
            }>;
            resume: _trpc_server.TRPCQueryProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: ResumeResult;
                meta: object;
            }>;
            logout: _trpc_server.TRPCMutationProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: LogoutResult;
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
                            info: {
                                displayName: string;
                                shortDescription: string;
                                longDescription: string;
                                objectives: ("Conservation" | "Research" | "Education" | "Community" | "Other")[];
                                country: string;
                                visibility: "Public" | "Unlisted";
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
                                createdAt?: string | undefined;
                            };
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
                layer: {
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
                        output: GetRecordResponse<Main$1>[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            rkey?: string | undefined;
                        };
                        output: PutRecordResponse<Main$1>;
                        meta: object;
                    }>;
                    addToProject: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            projectRkey: string;
                            layerUris: string[];
                            pdsDomain: Record<T, T>[T];
                        };
                        output: boolean;
                        meta: object;
                    }>;
                    removeFromProject: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            projectRkey: string;
                            layerUris: string[];
                            pdsDomain: Record<T, T>[T];
                        };
                        output: boolean;
                        meta: object;
                    }>;
                };
                observations: {
                    measuredTreesCluster: {
                        get: _trpc_server.TRPCQueryProcedure<{
                            input: {
                                did: string;
                                pdsDomain: Record<T, T>[T];
                            };
                            output: GetRecordResponse<Main$2>;
                            meta: object;
                        }>;
                        addToProject: _trpc_server.TRPCMutationProcedure<{
                            input: {
                                did: string;
                                projectRkey: string;
                                measuredTreesClusterUris: string[];
                                pdsDomain: Record<T, T>[T];
                            };
                            output: boolean;
                            meta: object;
                        }>;
                        removeFromProject: _trpc_server.TRPCMutationProcedure<{
                            input: {
                                did: string;
                                projectRkey: string;
                                measuredTreesClusterUris: string[];
                                pdsDomain: Record<T, T>[T];
                            };
                            output: boolean;
                            meta: object;
                        }>;
                    };
                };
            };
        };
        hypercerts: {
            claim: {
                activity: {
                    create: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            activity: {
                                title: string;
                                shortDescription: string;
                                description?: string | undefined;
                                locations?: {
                                    uri: string;
                                    cid: string;
                                    $type?: "com.atproto.repo.strongRef" | undefined;
                                }[] | undefined;
                                workScope?: string | undefined;
                                startDate?: string | undefined;
                                endDate?: string | undefined;
                                contributors?: {
                                    identity: string;
                                    weight?: string | undefined;
                                    role?: string | undefined;
                                }[] | undefined;
                                createdAt?: string | undefined;
                            };
                            uploads?: {
                                image?: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                } | undefined;
                            } | undefined;
                        };
                        output: PutRecordResponse<Main$3>;
                        meta: object;
                    }>;
                    getAllAcrossOrgs: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            pdsDomain: Record<T, T>[T];
                        };
                        output: OrganizationWithActivities[];
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
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetAllClaimActivitiesResponse;
                        meta: object;
                    }>;
                };
                project: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            rkey: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$4>;
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$4>[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            info: {
                                displayName: string;
                                shortDescription: string;
                                longDescription: string;
                                objectives: ("Conservation" | "Research" | "Education" | "Community" | "Other")[];
                                country: string;
                                visibility: "Public" | "Unlisted";
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
                                createdAt?: string | undefined;
                            };
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
                getAll: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetAllLocationsResponse;
                    meta: object;
                }>;
                create: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        site: {
                            name?: string | undefined;
                            description?: string | undefined;
                        };
                        uploads: {
                            shapefile: string | {
                                name: string;
                                type: string;
                                dataBase64: string;
                            };
                        };
                        rkey?: string | undefined;
                    };
                    output: PutRecordResponse<Main$5>;
                    meta: object;
                }>;
                update: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        rkey: string;
                        site: {
                            name?: string | undefined;
                            description?: string | undefined;
                            shapefile?: {
                                $type: "org.hypercerts.defs#smallBlob";
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
                        uploads?: {
                            shapefile?: {
                                name: string;
                                type: string;
                                dataBase64: string;
                            } | undefined;
                        } | undefined;
                    };
                    output: PutRecordResponse<Main$5>;
                    meta: object;
                }>;
                delete: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: DeleteRecordResponse;
                    meta: object;
                }>;
                getDefault: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$6>;
                    meta: object;
                }>;
                setDefault: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: PutRecordResponse<Main$6>;
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
                    did: string;
                    pdsDomain: Record<T, T>[T];
                    file: {
                        name: string;
                        type: string;
                        dataBase64: string;
                    };
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
                output: LoginResult;
                meta: object;
            }>;
            resume: _trpc_server.TRPCQueryProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: ResumeResult;
                meta: object;
            }>;
            logout: _trpc_server.TRPCMutationProcedure<{
                input: {
                    service: Record<T, T>[T];
                };
                output: LogoutResult;
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
                            info: {
                                displayName: string;
                                shortDescription: string;
                                longDescription: string;
                                objectives: ("Conservation" | "Research" | "Education" | "Community" | "Other")[];
                                country: string;
                                visibility: "Public" | "Unlisted";
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
                                createdAt?: string | undefined;
                            };
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
                layer: {
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
                        output: GetRecordResponse<Main$1>[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            rkey?: string | undefined;
                        };
                        output: PutRecordResponse<Main$1>;
                        meta: object;
                    }>;
                    addToProject: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            projectRkey: string;
                            layerUris: string[];
                            pdsDomain: Record<T, T>[T];
                        };
                        output: boolean;
                        meta: object;
                    }>;
                    removeFromProject: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            projectRkey: string;
                            layerUris: string[];
                            pdsDomain: Record<T, T>[T];
                        };
                        output: boolean;
                        meta: object;
                    }>;
                };
                observations: {
                    measuredTreesCluster: {
                        get: _trpc_server.TRPCQueryProcedure<{
                            input: {
                                did: string;
                                pdsDomain: Record<T, T>[T];
                            };
                            output: GetRecordResponse<Main$2>;
                            meta: object;
                        }>;
                        addToProject: _trpc_server.TRPCMutationProcedure<{
                            input: {
                                did: string;
                                projectRkey: string;
                                measuredTreesClusterUris: string[];
                                pdsDomain: Record<T, T>[T];
                            };
                            output: boolean;
                            meta: object;
                        }>;
                        removeFromProject: _trpc_server.TRPCMutationProcedure<{
                            input: {
                                did: string;
                                projectRkey: string;
                                measuredTreesClusterUris: string[];
                                pdsDomain: Record<T, T>[T];
                            };
                            output: boolean;
                            meta: object;
                        }>;
                    };
                };
            };
        };
        hypercerts: {
            claim: {
                activity: {
                    create: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            activity: {
                                title: string;
                                shortDescription: string;
                                description?: string | undefined;
                                locations?: {
                                    uri: string;
                                    cid: string;
                                    $type?: "com.atproto.repo.strongRef" | undefined;
                                }[] | undefined;
                                workScope?: string | undefined;
                                startDate?: string | undefined;
                                endDate?: string | undefined;
                                contributors?: {
                                    identity: string;
                                    weight?: string | undefined;
                                    role?: string | undefined;
                                }[] | undefined;
                                createdAt?: string | undefined;
                            };
                            uploads?: {
                                image?: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                } | undefined;
                            } | undefined;
                        };
                        output: PutRecordResponse<Main$3>;
                        meta: object;
                    }>;
                    getAllAcrossOrgs: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            pdsDomain: Record<T, T>[T];
                        };
                        output: OrganizationWithActivities[];
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
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetAllClaimActivitiesResponse;
                        meta: object;
                    }>;
                };
                project: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            rkey: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$4>;
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$4>[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                            info: {
                                displayName: string;
                                shortDescription: string;
                                longDescription: string;
                                objectives: ("Conservation" | "Research" | "Education" | "Community" | "Other")[];
                                country: string;
                                visibility: "Public" | "Unlisted";
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
                                createdAt?: string | undefined;
                            };
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
                getAll: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetAllLocationsResponse;
                    meta: object;
                }>;
                create: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        site: {
                            name?: string | undefined;
                            description?: string | undefined;
                        };
                        uploads: {
                            shapefile: string | {
                                name: string;
                                type: string;
                                dataBase64: string;
                            };
                        };
                        rkey?: string | undefined;
                    };
                    output: PutRecordResponse<Main$5>;
                    meta: object;
                }>;
                update: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        rkey: string;
                        site: {
                            name?: string | undefined;
                            description?: string | undefined;
                            shapefile?: {
                                $type: "org.hypercerts.defs#smallBlob";
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
                        uploads?: {
                            shapefile?: {
                                name: string;
                                type: string;
                                dataBase64: string;
                            } | undefined;
                        } | undefined;
                    };
                    output: PutRecordResponse<Main$5>;
                    meta: object;
                }>;
                delete: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: DeleteRecordResponse;
                    meta: object;
                }>;
                getDefault: _trpc_server.TRPCQueryProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                    };
                    output: GetRecordResponse<Main$6>;
                    meta: object;
                }>;
                setDefault: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: PutRecordResponse<Main$6>;
                    meta: object;
                }>;
            };
        };
    }>>;
}
type AppRouter<T extends SupportedPDSDomain> = AppRouterFactory<T>["appRouter"];

export type { AppRouter as A };
