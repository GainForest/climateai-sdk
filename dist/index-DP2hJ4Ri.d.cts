<<<<<<<< HEAD:dist/index-DP2hJ4Ri.d.cts
import { a as $Typed } from './utils-BtB-jULs.cjs';
import { M as Main$2, B as BlobRef, U as Uri$1, S as SmallBlob, L as LargeBlob, a as SmallImage, b as LargeImage } from './activity-CkQLvIqT.cjs';
========
import { A as AppSessionData } from './config-eXJj8SMU.cjs';
import { $ as $Typed } from './utils-BRYtkma9.cjs';
import { M as Main, a as Main$1, b as Main$2, c as Main$4, d as Main$5, e as Main$6, U as Uri, S as SmallImage, L as LargeImage, f as SmallBlob, g as LargeBlob } from './info-B-l-_nUN.cjs';
import { b as BlobRefGenerator } from './blobref-e8ss-bC-.cjs';
>>>>>>>> ef1aab8 (feat: rename ClimateAiSDK to GainForestSDK and accept HypercertsATProtoSDK in constructor):dist/index-C8RDCH-U.d.cts
import { z } from 'zod';
import { M as Main, a as Main$1, b as Main$3, c as Main$4, d as Main$5, e as Main$6, U as Uri, I as Image, f as ImageThumbnail } from './collection-SgBIeJK4.cjs';
import * as node_modules__trpc_server_dist_unstable_core_do_not_import_d_1RewV6pM_d_mts from 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
import { G as GetRecordResponse, P as PutRecordResponse } from './response-types-DkRV5jYn.cjs';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
import { ATProtoSDK } from '@hypercerts-org/sdk-core';

<<<<<<<< HEAD:dist/index-DP2hJ4Ri.d.cts
type DeleteRecordResponse = {
    success: true;
};

/**
 * Response type for getAllLocations
 */
type GetAllLocationsResponse = {
    locations: GetRecordResponse<Main>[];
    defaultLocation: GetRecordResponse<Main$1> | null;
};

/**
 * Response type for getAllClaimActivities
 */
type GetAllClaimActivitiesResponse = {
    activities: GetRecordResponse<Main$2>[];
};

/**
 * Organization with its activities
 */
type OrganizationWithActivities = {
    repo: {
        did: string;
    };
    organizationInfo: Main$3;
    activities: GetRecordResponse<Main$2>[];
};

/**
 * Creates the tRPC context for each request.
 * Apps must provide the ATProto SDK instance configured with their stores.
 *
 * @param opts.sdk - The ATProto SDK instance (required for authenticated operations)
 * @param opts.req - Optional request object
 * @param opts.allowedPDSDomains - List of allowed PDS domains
 */
declare function createContext<T extends SupportedPDSDomain>(opts: {
    sdk: ATProtoSDK;
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: AppSessionData;
    sdk: ATProtoSDK;
}>;
========
>>>>>>>> ef1aab8 (feat: rename ClimateAiSDK to GainForestSDK and accept HypercertsATProtoSDK in constructor):dist/index-C8RDCH-U.d.cts
type TrpcContext = {
    session: AppSessionData;
    sdk: ATProtoSDK;
};

declare const supportedDomains: readonly ["climateai.org", "gainforest.id"];
declare const supportedPDSDomainSchema: z.ZodEnum<{
    "climateai.org": "climateai.org";
    "gainforest.id": "gainforest.id";
}>;
type SupportedPDSDomain = (typeof supportedDomains)[number];
<<<<<<<< HEAD:dist/index-DP2hJ4Ri.d.cts
declare class GainforestSDK<T extends SupportedPDSDomain> {
========
declare class GainForestSDK<T extends SupportedPDSDomain> {
>>>>>>>> ef1aab8 (feat: rename ClimateAiSDK to GainForestSDK and accept HypercertsATProtoSDK in constructor):dist/index-C8RDCH-U.d.cts
    allowedPDSDomains: T[];
    appRouter: _trpc_server.TRPCBuiltRouter<{
        ctx: TrpcContext;
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
        gainforest: {
            organization: {
                info: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$3>;
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
                        output: PutRecordResponse<Main$3>;
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
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            rkey?: string | undefined;
                        };
                        output: PutRecordResponse<Main$4>;
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
                            output: GetRecordResponse<Main$5>;
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
                        output: PutRecordResponse<Main$2>;
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
                        output: GetRecordResponse<Main$2>;
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
                        output: GetRecordResponse<Main$6>;
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$6>[];
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
                        output: PutRecordResponse<Main$3>;
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
                    output: GetRecordResponse<Main>;
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
                    output: PutRecordResponse<Main>;
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
                    output: PutRecordResponse<Main>;
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
                    output: GetRecordResponse<Main$1>;
                    meta: object;
                }>;
                setDefault: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: PutRecordResponse<Main$1>;
                    meta: object;
                }>;
            };
        };
    }>>;
    getServerCaller: () => node_modules__trpc_server_dist_unstable_core_do_not_import_d_1RewV6pM_d_mts.DecorateRouterRecord<_trpc_server.TRPCDecorateCreateRouterOptions<{
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
        gainforest: {
            organization: {
                info: {
                    get: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$3>;
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
                        output: PutRecordResponse<Main$3>;
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
                            layer: {
                                name: string;
                                type: "geojson_points" | "geojson_points_trees" | "geojson_line" | "choropleth" | "choropleth_shannon" | "raster_tif" | "tms_tile";
                                uri: string;
                                description?: string | undefined;
                                createdAt?: string | undefined;
                            };
                            rkey?: string | undefined;
                        };
                        output: PutRecordResponse<Main$4>;
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
                            output: GetRecordResponse<Main$5>;
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
                        output: PutRecordResponse<Main$2>;
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
                        output: GetRecordResponse<Main$2>;
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
                        output: GetRecordResponse<Main$6>;
                        meta: object;
                    }>;
                    getAll: _trpc_server.TRPCQueryProcedure<{
                        input: {
                            did: string;
                            pdsDomain: Record<T, T>[T];
                        };
                        output: GetRecordResponse<Main$6>[];
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
                        output: PutRecordResponse<Main$3>;
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
                    output: GetRecordResponse<Main>;
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
                    output: PutRecordResponse<Main>;
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
                    output: PutRecordResponse<Main>;
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
                    output: GetRecordResponse<Main$1>;
                    meta: object;
                }>;
                setDefault: _trpc_server.TRPCMutationProcedure<{
                    input: {
                        did: string;
                        pdsDomain: Record<T, T>[T];
                        locationAtUri: string;
                    };
                    output: PutRecordResponse<Main$1>;
                    meta: object;
                }>;
            };
        };
    }>>;
    utilities: {
        getBlobUrl: (did: string, imageData: string | Uri | Image | BlobRef | ImageThumbnail | Uri$1 | SmallBlob | LargeBlob | SmallImage | LargeImage | {
            $type: "blob-ref-generator";
            ref: {
                $link: string;
            };
            mimeType: string;
            size: number;
        } | $Typed<Uri$1 | SmallBlob | LargeBlob | SmallImage | LargeImage> | $Typed<Uri | Image | ImageThumbnail>, pdsDomain: T) => string;
        parseAtUri: (atUri: string) => {
            did: string;
            collection: string;
            rkey: string;
        };
    };
    private sdk;
    constructor(_allowedPDSDomains: T[], sdk: ATProtoSDK);
    /**
     * Creates a tRPC context using the stored SDK instance.
     *
     * @param opts.req - Optional request object
     * @returns The tRPC context
     */
    createContext: (opts?: {
        req?: Request;
    }) => Promise<{
        session: AppSessionData;
        sdk: ATProtoSDK;
    }>;
}

<<<<<<<< HEAD:dist/index-DP2hJ4Ri.d.cts
export { type DeleteRecordResponse as D, type GetAllClaimActivitiesResponse as G, type OrganizationWithActivities as O, type SupportedPDSDomain as S, type TrpcContext as T, type GetAllLocationsResponse as a, GainforestSDK as b, createContext as c, supportedPDSDomainSchema as s };
========
export { GainForestSDK as G, type SupportedPDSDomain as S, type TrpcContext as T, supportedPDSDomainSchema as s };
>>>>>>>> ef1aab8 (feat: rename ClimateAiSDK to GainForestSDK and accept HypercertsATProtoSDK in constructor):dist/index-C8RDCH-U.d.cts
