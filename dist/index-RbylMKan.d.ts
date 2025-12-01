import { $ as $Typed } from './util-FfahvqOL.js';
import { U as Uri$1, S as SmallBlob$1, a as SmallImage, L as LargeImage, b as LargeBlob } from './defs-Cn2O3vh_.js';
import { B as BlobRefGenerator } from './blobref-CzIHHOw4.js';
import * as _atproto_lexicon from '@atproto/lexicon';
import * as node_modules__trpc_server_dist_unstable_core_do_not_import_d_1RewV6pM_d_mts from 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
import { U as Uri, S as SmallBlob, G as GetRecordResponse, P as PutRecordResponse, M as Main$4 } from './response-types-KuK1f8zo.js';
import * as _atproto_api_dist_client_types_com_atproto_sync_listRepos from '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import * as _atproto_api_dist_client_types_com_atproto_repo_deleteRecord from '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_putRecord from '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_createRecord from '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import * as _atproto_api_dist_client_types_com_atproto_repo_uploadBlob from '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import * as _trpc_server from '@trpc/server';
import { JwtPayload } from '@atproto/oauth-client-node';
import z, { z as z$1 } from 'zod';

interface Main$3 {
    $type: 'app.certified.location';
    /** The version of the Location Protocol */
    lpVersion: string;
    /** The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system. */
    srs: string;
    /** An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point) */
    locationType: 'coordinate-decimal' | 'geojson-point' | (string & {});
    location: $Typed<Uri> | $Typed<SmallBlob> | {
        $type: string;
    };
    /** Optional name for this location */
    name?: string;
    /** Optional description for this location */
    description?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}

interface Main$2 {
    $type: 'app.gainforest.organization.defaultSite';
    /** The reference to the default site record in the PDS */
    site: string;
    [k: string]: unknown;
}

interface Main$1 {
    $type: 'app.gainforest.organization.site';
    /** The name of the site */
    name: string;
    /** The latitude of the centerpoint of the site */
    lat: string;
    /** The longitude of the centerpoint of the site */
    lon: string;
    /** The area of the site in hectares */
    area: string;
    shapefile: $Typed<Uri$1> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    trees?: $Typed<Uri$1> | $Typed<SmallBlob$1> | {
        $type: string;
    };
    [k: string]: unknown;
}

interface Main {
    $type: 'app.gainforest.organization.info';
    /** The name of the organization or project */
    displayName: string;
    /** The description of the organization or project */
    shortDescription: string;
    /** The long description of the organization or project in markdown */
    longDescription: string;
    coverImage?: SmallImage;
    logo?: SmallImage;
    /** The objectives of the organization or project */
    objectives: ('Conservation' | 'Research' | 'Education' | 'Community' | 'Other')[];
    /** The start date of the organization or project */
    startDate?: string;
    /** The website of the organization or project */
    website?: string;
    /** The country of the organization or project in two letter code (ISO 3166-1 alpha-2) */
    country: string;
    /** The visibility of the organization or project in the Green Globe */
    visibility: 'Public' | 'Hidden';
    [k: string]: unknown;
}

interface StoredSession extends JwtPayload {
    accessJwt: string;
    refreshJwt: string;
    did: string;
    handle: string;
}
declare function getSessionFromRequest(service?: SupportedPDSDomain): Promise<StoredSession | null>;
declare function saveSession(session: StoredSession, service?: SupportedPDSDomain): Promise<string>;
declare function clearSession(service?: SupportedPDSDomain): Promise<void>;

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
                        claims: GetRecordResponse<Main$4>[];
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
            location: {
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
        };
    }>>;
    constructor(_allowedPDSDomains: T[]);
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
                        claims: GetRecordResponse<Main$4>[];
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
            location: {
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
        };
    }>>;
}
type AppRouter<T extends SupportedPDSDomain> = AppRouterFactory<T>["appRouter"];

declare function createContext<T extends SupportedPDSDomain>(opts?: {
    req?: Request;
    allowedPDSDomains: T[];
}): Promise<{
    session: StoredSession | null;
}>;

declare const supportedDomains: readonly ["climateai.org", "hypercerts.org"];
declare const supportedPDSDomainSchema: z$1.ZodEnum<{
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
                        claims: GetRecordResponse<Main$4>[];
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
            location: {
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
                        claims: GetRecordResponse<Main$4>[];
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
            location: {
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
        };
    }>>;
    utilities: {
        getBlobUrl: (did: string, imageData: string | _atproto_lexicon.BlobRef | BlobRefGenerator | $Typed<Uri$1 | SmallImage | LargeImage | SmallBlob$1 | LargeBlob> | Uri$1 | SmallImage | LargeImage | SmallBlob$1 | LargeBlob, pdsUrl: T) => string;
        parseAtUri: (atUri: string) => {
            did: string | undefined;
            rkey: string;
        };
    };
    constructor(_allowedPDSDomains: T[]);
}

export { type AppRouter as A, ClimateAiSDK as C, type Main as M, type SupportedPDSDomain as S, type StoredSession as a, type Main$1 as b, type Main$2 as c, type Main$3 as d, clearSession as e, supportedPDSDomainSchema as f, getSessionFromRequest as g, createContext as h, saveSession as s };
