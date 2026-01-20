import { $ as $Typed } from './utils-BRYtkma9.js';
import { M as Main, a as Main$1, b as Main$2, c as Main$4, d as Main$5, e as Main$6, U as Uri, S as SmallImage, L as LargeImage, f as SmallBlob, g as LargeBlob } from './info-5wTP3IAZ.js';
import { b as BlobRefGenerator } from './blobref-e8ss-bC-.js';
import { z } from 'zod';
import { M as Main$3, B as BlobRef } from './activity-BuClHKQ6.js';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';
import * as _atproto_api_dist_client_types_com_atproto_repo_deleteRecord from '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_putRecord from '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import * as _atproto_api_dist_client_types_com_atproto_sync_listRepos from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import * as _atproto_api_dist_client_types_com_atproto_repo_createRecord from '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import { G as GetRecordResponse, P as PutRecordResponse } from './response-types-DkRV5jYn.js';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
import { JwtPayload } from '@atproto/oauth-client-node';

interface StoredSession extends JwtPayload {
    accessJwt: string;
    refreshJwt: string;
    did: string;
    handle: string;
}
declare function getSessionFromRequest(service?: SupportedPDSDomain): Promise<StoredSession | null>;

declare const supportedDomains: readonly ["climateai.org", "hypercerts.org"];
declare const supportedPDSDomainSchema: z.ZodEnum<{
    "climateai.org": "climateai.org";
    "hypercerts.org": "hypercerts.org";
}>;
type SupportedPDSDomain = (typeof supportedDomains)[number];
declare class ClimateAiSDK<T extends SupportedPDSDomain> {
    allowedPDSDomains: T[];
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
            resume: _trpc_server.TRPCQueryProcedure<{
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
                                createdAt?: string | undefined;
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
                layer: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            rkey: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            uri: string;
                            cid: string | undefined;
                            value: Main$1;
                        };
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            uri: string;
                            cid: string;
                            value: Main$1;
                        }[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            pdsDomain: Record<T, T>[T];
                            rkey?: string | undefined;
                        };
                        output: {
                            uri: string;
                            cid: string;
                            validationStatus: "valid" | "unknown" | (string & {}) | undefined;
                            value: Main$1;
                        };
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
                            activity: {
                                title: string;
                                shortDescription: string;
                                locations: {
                                    uri: string;
                                    cid: string;
                                    $type?: "com.atproto.repo.strongRef" | undefined;
                                }[];
                                workScopes: string[];
                                startDate: string;
                                endDate: string;
                                contributors: string[];
                                description?: string | undefined;
                                project?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            uploads: {
                                image: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                };
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
                            activities: GetRecordResponse<Main$3>[];
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
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            activities: GetRecordResponse<Main$3>[];
                        };
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
                        output: {
                            uri: string;
                            cid: string;
                            value: Main$4;
                        }[];
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
                                createdAt?: string | undefined;
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
            site: {
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
                    output: {
                        sites: GetRecordResponse<Main$5>[];
                        defaultSite: GetRecordResponse<Main$6> | null;
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
                    output: GetRecordResponse<Main$6>;
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
    }>>;
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
            resume: _trpc_server.TRPCQueryProcedure<{
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
                                createdAt?: string | undefined;
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
                layer: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            rkey: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            uri: string;
                            cid: string | undefined;
                            value: Main$1;
                        };
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            uri: string;
                            cid: string;
                            value: Main$1;
                        }[];
                        meta: object;
                    }>;
                    createOrUpdate: _trpc_server.TRPCMutationProcedure<{
                        input: {
                            did: string;
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            pdsDomain: Record<T, T>[T];
                            rkey?: string | undefined;
                        };
                        output: {
                            uri: string;
                            cid: string;
                            validationStatus: "valid" | "unknown" | (string & {}) | undefined;
                            value: Main$1;
                        };
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
                            activity: {
                                title: string;
                                shortDescription: string;
                                locations: {
                                    uri: string;
                                    cid: string;
                                    $type?: "com.atproto.repo.strongRef" | undefined;
                                }[];
                                workScopes: string[];
                                startDate: string;
                                endDate: string;
                                contributors: string[];
                                description?: string | undefined;
                                project?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            uploads: {
                                image: {
                                    name: string;
                                    type: string;
                                    dataBase64: string;
                                };
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
                            activities: GetRecordResponse<Main$3>[];
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
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: {
                            activities: GetRecordResponse<Main$3>[];
                        };
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
                        output: {
                            uri: string;
                            cid: string;
                            value: Main$4;
                        }[];
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
                                createdAt?: string | undefined;
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
            site: {
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
                    output: {
                        sites: GetRecordResponse<Main$5>[];
                        defaultSite: GetRecordResponse<Main$6> | null;
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
                    output: GetRecordResponse<Main$6>;
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
    }>>;
    utilities: {
        getBlobUrl: (did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;
        parseAtUri: (atUri: string) => {
            did: string;
            collection: string;
            rkey: string;
        };
    };
    constructor(_allowedPDSDomains: T[]);
}

export { ClimateAiSDK as C, type SupportedPDSDomain as S, type StoredSession as a, getSessionFromRequest as g, supportedPDSDomainSchema as s };
