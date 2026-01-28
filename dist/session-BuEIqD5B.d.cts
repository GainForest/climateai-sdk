import { JwtPayload } from '@atproto/oauth-client-node';
import { a as $Typed } from './utils-BtB-jULs.cjs';
import { M as Main$2, B as BlobRef, U as Uri$1, S as SmallBlob, e as LargeBlob, c as SmallImage, L as LargeImage } from './activity-DgaiG8Qy.cjs';
import { z } from 'zod';
import { d as Main, e as Main$1, M as Main$3, a as Main$4, b as Main$5, c as Main$6, U as Uri, I as Image, D as ImageThumbnail } from './collection-iPiupYR_.cjs';
import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';
import { G as GetRecordResponse, P as PutRecordResponse } from './response-types-DkRV5jYn.cjs';
import * as _atproto_api_dist_client_types_com_atproto_server_getSession from '@atproto/api/dist/client/types/com/atproto/server/getSession';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';

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
 * Result of a successful logout
 */
type LogoutResult = {
    success: true;
};

interface StoredSession extends JwtPayload {
    accessJwt: string;
    refreshJwt: string;
    did: string;
    handle: string;
}
declare function getSessionFromRequest(service?: SupportedPDSDomain): Promise<StoredSession | null>;

/**
 * Result of a successful session resume
 */
type ResumeResult = {
    did: string;
    handle: string;
    service: SupportedPDSDomain;
};
/**
 * Helper to create a credential session from stored session data.
 */
declare const resumeCredentialSession: (service: SupportedPDSDomain, sessionData: StoredSession) => Promise<_atproto_api_dist_client_types_com_atproto_server_getSession.Response>;

/**
 * Result of a successful login
 */
type LoginResult = {
    did: string;
    handle: string;
    service: SupportedPDSDomain;
};

declare const supportedDomains: readonly ["climateai.org", "hypercerts.org"];
declare const supportedPDSDomainSchema: z.ZodEnum<{
    "climateai.org": "climateai.org";
    "hypercerts.org": "hypercerts.org";
}>;
type SupportedPDSDomain = (typeof supportedDomains)[number];
declare class GainforestSDK<T extends SupportedPDSDomain> {
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
        getBlobUrl: (did: string, imageData: string | {
            $type: "blob-ref-generator";
            ref: {
                $link: string;
            };
            mimeType: string;
            size: number;
        } | Uri | Image | BlobRef | ImageThumbnail | Uri$1 | SmallBlob | LargeBlob | SmallImage | LargeImage | $Typed<Uri$1 | SmallBlob | LargeBlob | SmallImage | LargeImage> | $Typed<Uri | Image | ImageThumbnail>, pdsDomain: T) => string;
        parseAtUri: (atUri: string) => {
            did: string;
            collection: string;
            rkey: string;
        };
    };
    constructor(_allowedPDSDomains: T[]);
}

export { type DeleteRecordResponse as D, GainforestSDK as G, type LoginResult as L, type OrganizationWithActivities as O, type ResumeResult as R, type SupportedPDSDomain as S, type StoredSession as a, type LogoutResult as b, type GetAllClaimActivitiesResponse as c, type GetAllLocationsResponse as d, getSessionFromRequest as g, resumeCredentialSession as r, supportedPDSDomainSchema as s };
