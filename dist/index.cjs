'use strict';

var z8 = require('zod');
var api = require('@atproto/api');
var server = require('@trpc/server');
var headers = require('next/headers');
var jose = require('jose');
var superjson = require('superjson');
var cid = require('multiformats/cid');
var xrpc = require('@atproto/xrpc');
var lexicon = require('@atproto/lexicon');
var turf = require('@turf/turf');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var z8__default = /*#__PURE__*/_interopDefault(z8);
var superjson__default = /*#__PURE__*/_interopDefault(superjson);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof api.BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
  if (isBlobRef) {
    const ref = imageData.ref;
    const cid = typeof ref === "string" ? ref : ref?.$link ?? String(ref);
    const encodedCid = encodeURIComponent(cid);
    return `https://${pdsDomain}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }
  if (imageData.$type === "app.gainforest.common.defs#uri") {
    const uri = imageData.uri;
    return uri;
  }
  if (imageData.$type === "app.gainforest.common.defs#smallBlob" || imageData.$type === "app.gainforest.common.defs#largeBlob") {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsDomain);
  }
  if (imageData.$type === "app.gainforest.common.defs#smallImage" || imageData.$type === "app.gainforest.common.defs#largeImage") {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsDomain);
  }
  if ("blob" in imageData) {
    const blob = imageData.blob;
    return getBlobUrl(did, blob, pdsDomain);
  }
  if ("image" in imageData) {
    const image = imageData.image;
    return getBlobUrl(did, image, pdsDomain);
  }
  if ("uri" in imageData) {
    const uri = imageData.uri;
    return uri;
  }
  const imageDataTypeCheck = imageData;
  return imageDataTypeCheck;
};

// src/_internal/utilities/atproto/parseAtUri.ts
var parseAtUri = (atUri) => {
  let cleanedAtUri = atUri.replace("at://", "");
  const splitUri = cleanedAtUri.split("/");
  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";
  return { did, collection, rkey };
};

// src/_internal/lib/tryCatch.ts
var tryCatch = async (promise) => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
var resumePure = async (service) => {
  const session = await getSessionFromRequest(service);
  if (!session) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "No active session found. Please log in."
    });
  }
  const credentialSession = new api.CredentialSession(
    new URL(`https://${service}`)
  );
  const [resumeSessionResult, resumeSessionError] = await tryCatch(
    credentialSession.resumeSession({
      accessJwt: session.accessJwt,
      refreshJwt: session.refreshJwt,
      handle: session.handle,
      did: session.did,
      active: true
    })
  );
  if (resumeSessionError !== null) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session. Please log in again.",
      cause: resumeSessionError
    });
  }
  if (resumeSessionResult === null || !resumeSessionResult.success) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session. Please log in again."
    });
  }
  return {
    did: resumeSessionResult.data.did,
    handle: resumeSessionResult.data.handle,
    service
  };
};
var resumeFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z8__default.default.object({
      service: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    return resumePure(input.service);
  });
};

// src/_internal/server/session.ts
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function encrypt(payload) {
  return await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(SECRET_KEY);
}
async function decrypt(token) {
  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
async function getSessionFromRequest(service = "climateai.org") {
  const cookieStore = await headers.cookies();
  const encryptedSession = cookieStore.get(`${service}_session`);
  if (!encryptedSession) {
    return null;
  }
  return await decrypt(encryptedSession.value);
}
async function saveSession(session, service = "climateai.org") {
  const cookieStore = await headers.cookies();
  const encrypted = await encrypt(session);
  cookieStore.set(`${service}_session`, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return encrypted;
}
async function clearSession(service = "climateai.org") {
  const cookieStore = await headers.cookies();
  cookieStore.delete(`${service}_session`);
}
var BlobRefGeneratorSchema = z8__default.default.object({
  $type: z8__default.default.literal("blob-ref-generator"),
  ref: z8__default.default.object({
    $link: z8__default.default.string()
  }),
  mimeType: z8__default.default.string(),
  size: z8__default.default.number()
});
var toBlobRef = (input) => {
  const validCID = cid.CID.parse(
    input.ref.$link
  );
  return api.BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size
  });
};
var toBlobRefGenerator = (blobRef) => {
  const json = blobRef.toJSON();
  return {
    $type: "blob-ref-generator",
    ref: json.ref,
    mimeType: json.mimeType,
    size: json.size
  };
};

// src/_internal/lib/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Set) && !(value instanceof Map);
};

// src/_internal/utilities/transform/index.ts
var _serialize = (data) => {
  return JSON.parse(JSON.stringify(data));
};
var _deserialize = (data) => {
  const isObj = isObject(data);
  if (!isObj) {
    if (Array.isArray(data)) {
      return data.map(_deserialize);
    }
    return data;
  }
  if ("$type" in data && data.$type === "blob" && "ref" in data) {
    try {
      return toBlobRef(data);
    } catch {
      return data;
    }
  }
  const obj = data;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, _deserialize(value)])
  );
};
var customTransformer = {
  serialize: (object) => {
    const atprotoSerialized = _serialize(object);
    const serializedObject = superjson__default.default.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = superjson__default.default.deserialize(object);
    const deserializedObject = _deserialize(superjsonDeserialized);
    return deserializedObject;
  }
};

// src/_internal/server/trpc.ts
async function createContext(opts) {
  const session = opts?.req ? await getSessionFromRequest(opts.allowedPDSDomains[0]) : null;
  return {
    session
  };
}
var t = server.initTRPC.context().create({
  transformer: customTransformer
});
var createTRPCRouter = t.router;
var publicProcedure = t.procedure;
var protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in"
    });
  }
  return next({ ctx });
});
var getReadAgent = (pdsDomain) => {
  return new api.Agent({
    service: new URL(`https://${pdsDomain}`)
  });
};
var getWriteAgent = async (pdsDomain) => {
  const session = await getSessionFromRequest(pdsDomain);
  if (!session)
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized."
    });
  const credentialSession = new api.CredentialSession(
    new URL(`https://${pdsDomain}`)
  );
  const result = await credentialSession.resumeSession({
    accessJwt: session.accessJwt,
    refreshJwt: session.refreshJwt,
    handle: session.handle,
    did: session.did,
    active: true
  });
  if (!result.success)
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "Failed to resume session."
    });
  return new api.Agent(credentialSession);
};

// src/_internal/server/utils/procedure-factories.ts
function createDidQueryFactory(handler) {
  return (allowedPDSDomainSchema) => publicProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(({ input }) => handler(input.did, input.pdsDomain));
}
function createDidRkeyQueryFactory(handler) {
  return (allowedPDSDomainSchema) => publicProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      rkey: z8.z.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(({ input }) => handler(input.did, input.rkey, input.pdsDomain));
}
function createMutationFactory(additionalInput, handler) {
  return (allowedPDSDomainSchema) => protectedProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      pdsDomain: allowedPDSDomainSchema,
      ...additionalInput
    })
  ).mutation(async ({ input }) => {
    const typedInput = input;
    const agent = await getWriteAgent(typedInput.pdsDomain);
    return handler(agent, typedInput);
  });
}
var FileGeneratorSchema = z8__default.default.object({
  name: z8__default.default.string(),
  type: z8__default.default.string(),
  dataBase64: z8__default.default.string()
});
var toFile = async (fileGenerator) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  return file;
};

// src/_internal/server/routers/atproto/common/uploadFileAsBlob.ts
var uploadFileAsBlobPure = async (file, agent) => {
  let fileToUpload;
  if (file instanceof File) {
    fileToUpload = file;
  } else {
    fileToUpload = await toFile(file);
  }
  const [response, error] = await tryCatch(agent.uploadBlob(fileToUpload));
  if (error !== null) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file.",
      cause: error
    });
  }
  if (response === null || response.success !== true) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file."
    });
  }
  return response.data;
};
var uploadFileAsBlobFactory = createMutationFactory(
  {
    file: FileGeneratorSchema
  },
  (agent, input) => uploadFileAsBlobPure(input.file, agent)
);
var loginPure = async (handlePrefix, password, service) => {
  const session = new api.CredentialSession(new URL(`https://${service}`));
  const [result, error] = await tryCatch(
    session.login({
      identifier: `${handlePrefix}.${service}`,
      password
    })
  );
  if (error !== null) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "Login failed. Please check your credentials.",
      cause: error
    });
  }
  if (result === null || !result.success) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "Login failed. Please check your credentials."
    });
  }
  const context = {
    accessJwt: result.data.accessJwt,
    refreshJwt: result.data.refreshJwt,
    did: result.data.did,
    handle: result.data.handle
  };
  await saveSession(context, service);
  return {
    did: context.did,
    handle: context.handle,
    service
  };
};
var loginFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z8__default.default.object({
      handlePrefix: z8__default.default.string().regex(/^[a-zA-Z0-9-]+$/),
      // alphanumerics and hyphens only
      service: allowedPDSDomainSchema,
      password: z8__default.default.string()
    })
  ).mutation(async ({ input }) => {
    return loginPure(input.handlePrefix, input.password, input.service);
  });
};
var logoutPure = async (service) => {
  await clearSession(service);
  return { success: true };
};
var logoutFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z8__default.default.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    return logoutPure(input.service);
  });
};

// lex-api/util.ts
function isObject2(v) {
  return v != null && typeof v === "object";
}
function is$type($type, id9, hash) {
  return hash === "main" ? $type === id9 : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id9.length + 1 + hash.length && $type.charCodeAt(id9.length) === 35 && $type.startsWith(id9) && $type.endsWith(hash)
  );
}
function is$typed(v, id9, hash) {
  return isObject2(v) && "$type" in v && is$type(v.$type, id9, hash);
}
function maybe$typed(v, id9, hash) {
  return isObject2(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id9, hash) : true);
}

// lex-api/lexicons.ts
var schemaDict = {
  AppCertifiedBadgeAward: {
    lexicon: 1,
    id: "app.certified.badge.award",
    defs: {
      main: {
        type: "record",
        description: "Records a badge award to a user, project, or activity claim.",
        key: "tid",
        record: {
          type: "object",
          required: ["badge", "subject", "createdAt"],
          properties: {
            badge: {
              type: "ref",
              ref: "lex:app.certified.badge.definition",
              description: "Reference to the badge definition for this award."
            },
            subject: {
              type: "union",
              description: "Entity the badge award is for (either an account DID or any specific AT Protocol record), e.g. a user, a project, or a specific activity claim.",
              refs: [
                "lex:app.certified.defs#did",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            note: {
              type: "string",
              description: "Optional statement explaining the reason for this badge award."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedBadgeDefinition: {
    lexicon: 1,
    id: "app.certified.badge.definition",
    defs: {
      main: {
        type: "record",
        description: "Defines a badge that can be awarded via badge award records to users, projects, or activity claims.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "badgeType", "icon", "createdAt"],
          properties: {
            badgeType: {
              type: "string",
              description: "Category of the badge (e.g. endorsement, participation, affiliation)."
            },
            title: {
              type: "string",
              description: "Human-readable title of the badge."
            },
            icon: {
              type: "blob",
              description: "Icon representing the badge, stored as a blob for compact visual display.",
              accept: [
                "image/png",
                "image/jpeg",
                "image/webp",
                "image/svg+xml"
              ],
              maxSize: 1048576
            },
            description: {
              type: "string",
              description: "Optional short statement describing what the badge represents."
            },
            allowedIssuers: {
              type: "array",
              description: "Optional allowlist of DIDs allowed to issue this badge. If omitted, anyone may issue it.",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              }
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedBadgeResponse: {
    lexicon: 1,
    id: "app.certified.badge.response",
    defs: {
      main: {
        type: "record",
        description: "Recipient response to a badge award.",
        key: "tid",
        record: {
          type: "object",
          required: ["badgeAward", "response", "createdAt"],
          properties: {
            badgeAward: {
              type: "ref",
              ref: "lex:app.certified.badge.award",
              description: "Reference to the badge award."
            },
            response: {
              type: "string",
              enum: ["accepted", "rejected"],
              description: "The recipient\u2019s response for the badge (accepted or rejected)."
            },
            weight: {
              type: "string",
              description: "Optional relative weight for accepted badges, assigned by the recipient."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppCertifiedDefs: {
    lexicon: 1,
    id: "app.certified.defs",
    description: "Common type definitions used across certified protocols.",
    defs: {
      did: {
        type: "string",
        format: "did",
        description: "A Decentralized Identifier (DID) string."
      }
    }
  },
  AppCertifiedLocation: {
    lexicon: 1,
    id: "app.certified.location",
    defs: {
      main: {
        type: "record",
        description: "A location reference",
        key: "tid",
        record: {
          type: "object",
          required: [
            "lpVersion",
            "srs",
            "locationType",
            "location",
            "createdAt"
          ],
          properties: {
            lpVersion: {
              type: "string",
              description: "The version of the Location Protocol",
              maxLength: 10
            },
            srs: {
              type: "string",
              format: "uri",
              description: "The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system.",
              maxLength: 100
            },
            locationType: {
              type: "string",
              description: "An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point)",
              knownValues: ["coordinate-decimal", "geojson-point"],
              maxLength: 20
            },
            location: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "The location of where the work was performed as a URI or blob."
            },
            name: {
              type: "string",
              description: "Optional name for this location",
              maxLength: 1e3,
              maxGraphemes: 100
            },
            description: {
              type: "string",
              description: "Optional description for this location",
              maxLength: 2e3,
              maxGraphemes: 500
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  AppGainforestCommonDefs: {
    lexicon: 1,
    id: "app.gainforest.common.defs",
    defs: {
      uri: {
        type: "object",
        required: ["uri"],
        description: "Object containing a URI to external data",
        properties: {
          uri: {
            type: "string",
            format: "uri",
            maxGraphemes: 1024,
            description: "URI to external data"
          }
        }
      },
      smallBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 10485760,
            description: "Blob to external data (up to 10MB)"
          }
        }
      },
      largeBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 104857600,
            description: "Blob to external data (up to 100MB)"
          }
        }
      },
      smallImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a small image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 5242880,
            description: "Image (up to 5MB)"
          }
        }
      },
      largeImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a large image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 10485760,
            description: "Image (up to 10MB)"
          }
        }
      },
      indexedOrganization: {
        type: "object",
        required: ["id", "name"],
        properties: {
          id: {
            type: "string",
            format: "uri",
            description: "The URI of the organization"
          },
          name: {
            type: "string",
            description: "The name of the organization"
          }
        }
      }
    }
  },
  AppGainforestOrganizationDefaultSite: {
    lexicon: 1,
    id: "app.gainforest.organization.defaultSite",
    defs: {
      main: {
        type: "record",
        description: "A declaration of the default site for an organization",
        key: "literal:self",
        record: {
          type: "object",
          required: ["site", "createdAt"],
          properties: {
            site: {
              type: "string",
              format: "at-uri",
              description: "The reference to the default site record in the PDS"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationGetIndexedOrganizations: {
    lexicon: 1,
    id: "app.gainforest.organization.getIndexedOrganizations",
    defs: {
      main: {
        type: "query",
        description: "Get all organizations to view initially on map",
        parameters: {
          type: "params",
          properties: {}
        },
        output: {
          encoding: "application/json",
          schema: {
            type: "object",
            required: ["organizations"],
            properties: {
              organizations: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.gainforest.common.defs#indexedOrganization"
                }
              }
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationInfo: {
    lexicon: 1,
    id: "app.gainforest.organization.info",
    defs: {
      main: {
        type: "record",
        description: "A declaration of an organization or project",
        key: "literal:self",
        record: {
          type: "object",
          required: [
            "displayName",
            "shortDescription",
            "longDescription",
            "objectives",
            "country",
            "visibility",
            "createdAt"
          ],
          properties: {
            displayName: {
              type: "string",
              description: "The name of the organization or project",
              minLength: 8,
              maxLength: 255
            },
            shortDescription: {
              type: "string",
              description: "The description of the organization or project",
              minLength: 50,
              maxLength: 2e3
            },
            longDescription: {
              type: "string",
              description: "The long description of the organization or project in richtext",
              minLength: 50,
              maxLength: 5e3
            },
            coverImage: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallImage",
              description: "Cover image for the organization"
            },
            logo: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallImage",
              description: "Logo for the organization"
            },
            objectives: {
              type: "array",
              description: "The objectives of the organization or project",
              items: {
                type: "string",
                enum: [
                  "Conservation",
                  "Research",
                  "Education",
                  "Community",
                  "Other"
                ]
              }
            },
            startDate: {
              type: "string",
              description: "The start date of the organization or project",
              format: "datetime"
            },
            website: {
              type: "string",
              description: "The website of the organization or project",
              format: "uri"
            },
            country: {
              type: "string",
              description: "The country of the organization or project in two letter code (ISO 3166-1 alpha-2)"
            },
            visibility: {
              type: "string",
              description: "The visibility of the organization or project in the Green Globe",
              enum: ["Public", "Hidden"]
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationLayer: {
    lexicon: 1,
    id: "app.gainforest.organization.layer",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a layer for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["name", "type", "uri", "createdAt"],
          properties: {
            name: {
              type: "string",
              description: "The name of the site"
            },
            type: {
              type: "string",
              description: "The type of the layer",
              enum: [
                "geojson_points",
                "geojson_points_trees",
                "geojson_line",
                "choropleth",
                "choropleth_shannon",
                "raster_tif",
                "tms_tile"
              ]
            },
            uri: {
              type: "string",
              format: "uri",
              description: "The URI of the layer"
            },
            description: {
              type: "string",
              description: "The description of the layer"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsDendogram: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.dendogram",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a dendogram observation for an organization",
        key: "literal:self",
        record: {
          type: "object",
          required: ["dendogram", "createdAt"],
          properties: {
            dendogram: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallBlob",
              description: "An SVG of the dendogram uploaded as blob"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsFauna: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.fauna",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a fauna observation for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each fauna observation",
              items: {
                type: "string",
                description: "The GBIF taxon key of the fauna observation"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsFlora: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.flora",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a flora observation for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each flora observation",
              items: {
                type: "string",
                description: "The GBIF taxon key of the flora observation"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationObservationsMeasuredTreesCluster: {
    lexicon: 1,
    id: "app.gainforest.organization.observations.measuredTreesCluster",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a measured trees cluster for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["shapefile", "createdAt"],
          properties: {
            shapefile: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallBlob",
              description: "A blob pointing to a shapefile of the measured trees cluster"
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationPredictionsFauna: {
    lexicon: 1,
    id: "app.gainforest.organization.predictions.fauna",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a fauna prediction for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each fauna prediction",
              items: {
                type: "string",
                description: "The GBIF taxon key of the fauna prediction"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  AppGainforestOrganizationPredictionsFlora: {
    lexicon: 1,
    id: "app.gainforest.organization.predictions.flora",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a flora prediction for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["gbifTaxonKeys", "createdAt"],
          properties: {
            gbifTaxonKeys: {
              type: "array",
              description: "An array of GBIF taxon keys for each flora prediction",
              items: {
                type: "string",
                description: "The GBIF taxon key of the flora prediction"
              }
            },
            createdAt: {
              type: "string",
              description: "The date and time of the creation of the record",
              format: "datetime"
            }
          }
        }
      }
    }
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: "com.atproto.repo.strongRef",
    description: "A URI with a content-hash fingerprint.",
    defs: {
      main: {
        type: "object",
        required: ["uri", "cid"],
        properties: {
          uri: {
            type: "string",
            format: "at-uri"
          },
          cid: {
            type: "string",
            format: "cid"
          }
        }
      }
    }
  },
  OrgHypercertsClaimActivity: {
    lexicon: 1,
    id: "org.hypercerts.claim.activity",
    defs: {
      main: {
        type: "record",
        description: "A hypercert record tracking impact work.",
        key: "any",
        record: {
          type: "object",
          required: [
            "title",
            "shortDescription",
            "createdAt",
            "startDate",
            "endDate"
          ],
          properties: {
            title: {
              type: "string",
              description: "Title of the hypercert.",
              maxLength: 256
            },
            shortDescription: {
              type: "string",
              description: "Short blurb of the impact work done.",
              maxLength: 3e3,
              maxGraphemes: 300
            },
            description: {
              type: "string",
              description: "Optional longer description of the impact work done.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            image: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallImage"
              ],
              description: "The hypercert visual representation as a URI or image blob."
            },
            workScope: {
              type: "ref",
              ref: "lex:org.hypercerts.claim.activity#workScope"
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "When the work began"
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "When the work ended"
            },
            contributions: {
              type: "array",
              description: "A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              }
            },
            rights: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the rights that this hypercert has. The record referenced must conform with the lexicon org.hypercerts.claim.rights."
            },
            locations: {
              type: "array",
              description: "An array of strong references to the location where activity was performed. The record referenced must conform with the lexicon app.certified.location.",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              }
            },
            project: {
              type: "string",
              format: "at-uri",
              description: "A reference (AT-URI) to the project record that this activity is part of. The record referenced must conform with the lexicon org.hypercerts.claim.project. This activity must also be referenced by the project, establishing a bidirectional link."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      },
      workScope: {
        type: "object",
        description: "Logical scope of the work using label-based conditions. All labels in `withinAllOf` must apply; at least one label in `withinAnyOf` must apply if provided; no label in `withinNoneOf` may apply.",
        properties: {
          withinAllOf: {
            type: "array",
            description: "Labels that MUST all hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          withinAnyOf: {
            type: "array",
            description: "Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          withinNoneOf: {
            type: "array",
            description: "Labels that MUST NOT hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
          }
        }
      },
      activityWeight: {
        type: "object",
        required: ["activity", "weight"],
        properties: {
          activity: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef",
            description: "A strong reference to a hypercert activity record. This activity must conform to the lexicon org.hypercerts.claim.activity"
          },
          weight: {
            type: "string",
            description: "The relative weight/importance of this hypercert activity (stored as a string to avoid float precision issues). Weights can be any positive numeric values and do not need to sum to a specific total; normalization can be performed by the consuming application as needed."
          }
        }
      }
    }
  },
  OrgHypercertsClaimCollection: {
    lexicon: 1,
    id: "org.hypercerts.claim.collection",
    defs: {
      main: {
        type: "record",
        description: "A collection/group of hypercerts that have a specific property.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "activities", "createdAt"],
          properties: {
            title: {
              type: "string",
              description: "The title of this collection",
              maxLength: 800,
              maxGraphemes: 80
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "A short description of this collection"
            },
            avatar: {
              type: "blob",
              description: "Primary avatar image representing this collection across apps and views; typically a square image.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            coverPhoto: {
              type: "blob",
              description: "The cover photo of this collection.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            activities: {
              type: "array",
              description: "Array of activities with their associated weights in this collection",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.activity#activityWeight"
              }
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimContribution: {
    lexicon: 1,
    id: "org.hypercerts.claim.contribution",
    defs: {
      main: {
        type: "record",
        description: "A contribution made toward a hypercert's impact.",
        key: "tid",
        record: {
          type: "object",
          required: ["contributors", "createdAt"],
          properties: {
            role: {
              type: "string",
              description: "Role or title of the contributor(s).",
              maxLength: 100
            },
            contributors: {
              type: "array",
              description: "List of the contributors (names, pseudonyms, or DIDs). If multiple contributors are stored in the same hypercertContribution, then they would have the exact same role.",
              items: {
                type: "string"
              }
            },
            description: {
              type: "string",
              description: "What the contribution concretely achieved",
              maxLength: 2e3,
              maxGraphemes: 500
            },
            startDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution started. This should be a subset of the hypercert timeframe."
            },
            endDate: {
              type: "string",
              format: "datetime",
              description: "When this contribution finished.  This should be a subset of the hypercert timeframe."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimEvaluation: {
    lexicon: 1,
    id: "org.hypercerts.claim.evaluation",
    defs: {
      score: {
        type: "object",
        description: "Overall score for an evaluation on a numeric scale.",
        required: ["min", "max", "value"],
        properties: {
          min: {
            type: "integer",
            description: "Minimum value of the scale, e.g. 0 or 1."
          },
          max: {
            type: "integer",
            description: "Maximum value of the scale, e.g. 5 or 10."
          },
          value: {
            type: "integer",
            description: "Score within the inclusive range [min, max]."
          }
        }
      },
      main: {
        type: "record",
        description: "An evaluation of a hypercert record (e.g. an activity and its impact).",
        key: "tid",
        record: {
          type: "object",
          required: ["evaluators", "summary", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to what is being evaluated. (e.g activity, measurement, contribution, etc.)"
            },
            evaluators: {
              type: "array",
              description: "DIDs of the evaluators",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              },
              maxLength: 1e3
            },
            content: {
              type: "array",
              description: "Evaluation data (URIs or blobs) containing detailed reports or methodology",
              items: {
                type: "union",
                refs: [
                  "lex:org.hypercerts.defs#uri",
                  "lex:org.hypercerts.defs#smallBlob"
                ]
              },
              maxLength: 100
            },
            measurements: {
              type: "array",
              description: "Optional references to the measurements that contributed to this evaluation. The record(s) referenced must conform with the lexicon org.hypercerts.claim.measurement ",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              maxLength: 100
            },
            summary: {
              type: "string",
              description: "Brief evaluation summary",
              maxLength: 5e3,
              maxGraphemes: 1e3
            },
            score: {
              type: "ref",
              ref: "lex:org.hypercerts.claim.evaluation#score",
              description: "Optional overall score for this evaluation on a numeric scale."
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "An optional reference for georeferenced evaluations. The record referenced must conform with the lexicon app.certified.location."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimEvidence: {
    lexicon: 1,
    id: "org.hypercerts.claim.evidence",
    defs: {
      main: {
        type: "record",
        description: "A piece of evidence related to a hypercert record (e.g. an activity, project, claim, or evaluation). Evidence may support, clarify, or challenge the referenced subject.",
        key: "tid",
        record: {
          type: "object",
          required: ["content", "title", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the record this evidence relates to (e.g. an activity, project, claim, or evaluation)."
            },
            content: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "A piece of evidence (URI or blob) related to the subject record; it may support, clarify, or challenge a hypercert claim."
            },
            title: {
              type: "string",
              maxLength: 256,
              description: "Title to describe the nature of the evidence."
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "Short description explaining what this evidence shows."
            },
            description: {
              type: "string",
              description: "Longer description describing the evidence in more detail.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            relationType: {
              type: "string",
              description: "How this evidence relates to the subject.",
              knownValues: ["supports", "challenges", "clarifies"]
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimMeasurement: {
    lexicon: 1,
    id: "org.hypercerts.claim.measurement",
    defs: {
      main: {
        type: "record",
        description: "Measurement data related to a hypercert record (e.g. an activity and its impact).",
        key: "tid",
        record: {
          type: "object",
          required: ["measurers", "metric", "value", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the record this measurement refers to (e.g. an activity, project, or claim)."
            },
            measurers: {
              type: "array",
              description: "DIDs of the entity (or entities) that measured this data",
              items: {
                type: "ref",
                ref: "lex:app.certified.defs#did"
              },
              maxLength: 100
            },
            metric: {
              type: "string",
              description: "The metric being measured",
              maxLength: 500
            },
            value: {
              type: "string",
              description: "The measured value",
              maxLength: 500
            },
            methodType: {
              type: "string",
              description: "Short identifier for the measurement methodology",
              maxLength: 30
            },
            methodURI: {
              type: "string",
              format: "uri",
              description: "URI to methodology documentation, standard protocol, or measurement procedure"
            },
            evidenceURI: {
              type: "array",
              description: "URIs to related evidence or underlying data (e.g. org.hypercerts.claim.evidence records or raw datasets)",
              items: {
                type: "string",
                format: "uri"
              },
              maxLength: 50
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the location where the measurement was taken. The record referenced must conform with the lexicon app.certified.location"
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimProject: {
    lexicon: 1,
    id: "org.hypercerts.claim.project",
    defs: {
      main: {
        type: "record",
        description: "A project that can include multiple activities, each of which may be linked to at most one project.",
        key: "tid",
        record: {
          type: "object",
          required: ["title", "shortDescription", "createdAt"],
          properties: {
            title: {
              type: "string",
              description: "Title of this project",
              maxLength: 800,
              maxGraphemes: 80
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "Short summary of this project, suitable for previews and list views."
            },
            description: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument#main",
              description: "Rich-text description of this project, represented as a Leaflet linear document."
            },
            avatar: {
              type: "blob",
              description: "Primary avatar image representing this project across apps and views; typically a square logo or project identity image.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            coverPhoto: {
              type: "blob",
              description: "The cover photo of this project.",
              accept: ["image/png", "image/jpeg"],
              maxSize: 1e6
            },
            activities: {
              type: "array",
              description: "Array of activities with their associated weights in this project",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.activity#activityWeight"
              }
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to a location record describing where the work for this project took place. The referenced record must conform to the app.certified.location lexicon."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsClaimRights: {
    lexicon: 1,
    id: "org.hypercerts.claim.rights",
    defs: {
      main: {
        type: "record",
        description: "Describes the rights that a contributor and/or an owner has, such as whether the hypercert can be sold, transferred, and under what conditions.",
        key: "tid",
        record: {
          type: "object",
          required: [
            "rightsName",
            "rightsType",
            "rightsDescription",
            "createdAt"
          ],
          properties: {
            rightsName: {
              type: "string",
              description: "Full name of the rights",
              maxLength: 100
            },
            rightsType: {
              type: "string",
              description: "Short rights identifier for easier search",
              maxLength: 10
            },
            rightsDescription: {
              type: "string",
              description: "Description of the rights of this hypercert"
            },
            attachment: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "An attachment to define the rights further, e.g. a legal document."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      }
    }
  },
  OrgHypercertsDefs: {
    lexicon: 1,
    id: "org.hypercerts.defs",
    defs: {
      uri: {
        type: "object",
        required: ["uri"],
        description: "Object containing a URI to external data",
        properties: {
          uri: {
            type: "string",
            format: "uri",
            maxGraphemes: 1024,
            description: "URI to external data"
          }
        }
      },
      smallBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 10485760,
            description: "Blob to external data (up to 10MB)"
          }
        }
      },
      largeBlob: {
        type: "object",
        required: ["blob"],
        description: "Object containing a blob to external data",
        properties: {
          blob: {
            type: "blob",
            accept: ["*/*"],
            maxSize: 104857600,
            description: "Blob to external data (up to 100MB)"
          }
        }
      },
      smallImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a small image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 5242880,
            description: "Image (up to 5MB)"
          }
        }
      },
      largeImage: {
        type: "object",
        required: ["image"],
        description: "Object containing a large image",
        properties: {
          image: {
            type: "blob",
            accept: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            maxSize: 10485760,
            description: "Image (up to 10MB)"
          }
        }
      }
    }
  },
  OrgHypercertsFundingReceipt: {
    lexicon: 1,
    id: "org.hypercerts.funding.receipt",
    defs: {
      main: {
        type: "record",
        description: "Records a funding receipt for a payment from one user to another user. It may be recorded by the recipient, by the sender, or by a third party. The sender may remain anonymous.",
        key: "tid",
        record: {
          type: "object",
          required: ["from", "to", "amount", "currency", "createdAt"],
          properties: {
            from: {
              type: "ref",
              ref: "lex:app.certified.defs#did",
              description: "DID of the sender who transferred the funds. Leave empty if sender wants to stay anonymous."
            },
            to: {
              type: "string",
              description: "The recipient of the funds. Can be identified by DID or a clear-text name."
            },
            amount: {
              type: "string",
              description: "Amount of funding received."
            },
            currency: {
              type: "string",
              description: "Currency of the payment (e.g. EUR, USD, ETH)."
            },
            paymentRail: {
              type: "string",
              description: "How the funds were transferred (e.g. bank_transfer, credit_card, onchain, cash, check, payment_processor)."
            },
            paymentNetwork: {
              type: "string",
              description: "Optional network within the payment rail (e.g. arbitrum, ethereum, sepa, visa, paypal)."
            },
            transactionId: {
              type: "string",
              description: "Identifier of the underlying payment transaction (e.g. bank reference, onchain transaction hash, or processor-specific ID). Use paymentNetwork to specify the network where applicable."
            },
            for: {
              type: "string",
              format: "at-uri",
              description: "Optional reference to the activity, project, or organization this funding relates to."
            },
            notes: {
              type: "string",
              description: "Optional notes or additional context for this funding receipt.",
              maxLength: 500
            },
            occurredAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp when the payment occurred."
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this receipt record was created."
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksBlockquote: {
    lexicon: 1,
    id: "pub.leaflet.blocks.blockquote",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksBskyPost: {
    lexicon: 1,
    id: "pub.leaflet.blocks.bskyPost",
    defs: {
      main: {
        type: "object",
        required: ["postRef"],
        properties: {
          postRef: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      }
    }
  },
  PubLeafletBlocksButton: {
    lexicon: 1,
    id: "pub.leaflet.blocks.button",
    defs: {
      main: {
        type: "object",
        required: ["text", "url"],
        properties: {
          text: {
            type: "string"
          },
          url: {
            type: "string",
            format: "uri"
          }
        }
      }
    }
  },
  PubLeafletBlocksCode: {
    lexicon: 1,
    id: "pub.leaflet.blocks.code",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          language: {
            type: "string"
          },
          syntaxHighlightingTheme: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksHeader: {
    lexicon: 1,
    id: "pub.leaflet.blocks.header",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          level: {
            type: "integer",
            minimum: 1,
            maximum: 6
          },
          plaintext: {
            type: "string"
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksHorizontalRule: {
    lexicon: 1,
    id: "pub.leaflet.blocks.horizontalRule",
    defs: {
      main: {
        type: "object",
        required: [],
        properties: {}
      }
    }
  },
  PubLeafletBlocksIframe: {
    lexicon: 1,
    id: "pub.leaflet.blocks.iframe",
    defs: {
      main: {
        type: "object",
        required: ["url"],
        properties: {
          url: {
            type: "string",
            format: "uri"
          },
          height: {
            type: "integer",
            minimum: 16,
            maximum: 1600
          }
        }
      }
    }
  },
  PubLeafletBlocksImage: {
    lexicon: 1,
    id: "pub.leaflet.blocks.image",
    defs: {
      main: {
        type: "object",
        required: ["image", "aspectRatio"],
        properties: {
          image: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          alt: {
            type: "string",
            description: "Alt text description of the image, for accessibility."
          },
          aspectRatio: {
            type: "ref",
            ref: "lex:pub.leaflet.blocks.image#aspectRatio"
          }
        }
      },
      aspectRatio: {
        type: "object",
        required: ["width", "height"],
        properties: {
          width: {
            type: "integer"
          },
          height: {
            type: "integer"
          }
        }
      }
    }
  },
  PubLeafletBlocksMath: {
    lexicon: 1,
    id: "pub.leaflet.blocks.math",
    defs: {
      main: {
        type: "object",
        required: ["tex"],
        properties: {
          tex: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksPage: {
    lexicon: 1,
    id: "pub.leaflet.blocks.page",
    defs: {
      main: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string"
          }
        }
      }
    }
  },
  PubLeafletBlocksPoll: {
    lexicon: 1,
    id: "pub.leaflet.blocks.poll",
    defs: {
      main: {
        type: "object",
        required: ["pollRef"],
        properties: {
          pollRef: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef"
          }
        }
      }
    }
  },
  PubLeafletBlocksText: {
    lexicon: 1,
    id: "pub.leaflet.blocks.text",
    defs: {
      main: {
        type: "object",
        required: ["plaintext"],
        properties: {
          plaintext: {
            type: "string"
          },
          textSize: {
            type: "string",
            enum: ["default", "small", "large"]
          },
          facets: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.richtext.facet"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksUnorderedList: {
    lexicon: 1,
    id: "pub.leaflet.blocks.unorderedList",
    defs: {
      main: {
        type: "object",
        required: ["children"],
        properties: {
          children: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.blocks.unorderedList#listItem"
            }
          }
        }
      },
      listItem: {
        type: "object",
        required: ["content"],
        properties: {
          content: {
            type: "union",
            refs: [
              "lex:pub.leaflet.blocks.text",
              "lex:pub.leaflet.blocks.header",
              "lex:pub.leaflet.blocks.image"
            ]
          },
          children: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.blocks.unorderedList#listItem"
            }
          }
        }
      }
    }
  },
  PubLeafletBlocksWebsite: {
    lexicon: 1,
    id: "pub.leaflet.blocks.website",
    defs: {
      main: {
        type: "object",
        required: ["src"],
        properties: {
          previewImage: {
            type: "blob",
            accept: ["image/*"],
            maxSize: 1e6
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          src: {
            type: "string",
            format: "uri"
          }
        }
      }
    }
  },
  PubLeafletPagesLinearDocument: {
    lexicon: 1,
    id: "pub.leaflet.pages.linearDocument",
    defs: {
      main: {
        type: "object",
        required: ["blocks"],
        properties: {
          id: {
            type: "string"
          },
          blocks: {
            type: "array",
            items: {
              type: "ref",
              ref: "lex:pub.leaflet.pages.linearDocument#block"
            }
          }
        }
      },
      block: {
        type: "object",
        required: ["block"],
        properties: {
          block: {
            type: "union",
            refs: [
              "lex:pub.leaflet.blocks.iframe",
              "lex:pub.leaflet.blocks.text",
              "lex:pub.leaflet.blocks.blockquote",
              "lex:pub.leaflet.blocks.header",
              "lex:pub.leaflet.blocks.image",
              "lex:pub.leaflet.blocks.unorderedList",
              "lex:pub.leaflet.blocks.website",
              "lex:pub.leaflet.blocks.math",
              "lex:pub.leaflet.blocks.code",
              "lex:pub.leaflet.blocks.horizontalRule",
              "lex:pub.leaflet.blocks.bskyPost",
              "lex:pub.leaflet.blocks.page",
              "lex:pub.leaflet.blocks.poll",
              "lex:pub.leaflet.blocks.button"
            ]
          },
          alignment: {
            type: "string",
            knownValues: [
              "lex:pub.leaflet.pages.linearDocument#textAlignLeft",
              "lex:pub.leaflet.pages.linearDocument#textAlignCenter",
              "lex:pub.leaflet.pages.linearDocument#textAlignRight",
              "lex:pub.leaflet.pages.linearDocument#textAlignJustify"
            ]
          }
        }
      },
      textAlignLeft: {
        type: "token"
      },
      textAlignCenter: {
        type: "token"
      },
      textAlignRight: {
        type: "token"
      },
      textAlignJustify: {
        type: "token"
      },
      quote: {
        type: "object",
        required: ["start", "end"],
        properties: {
          start: {
            type: "ref",
            ref: "lex:pub.leaflet.pages.linearDocument#position"
          },
          end: {
            type: "ref",
            ref: "lex:pub.leaflet.pages.linearDocument#position"
          }
        }
      },
      position: {
        type: "object",
        required: ["block", "offset"],
        properties: {
          block: {
            type: "array",
            items: {
              type: "integer"
            }
          },
          offset: {
            type: "integer"
          }
        }
      }
    }
  },
  PubLeafletRichtextFacet: {
    lexicon: 1,
    id: "pub.leaflet.richtext.facet",
    defs: {
      main: {
        type: "object",
        description: "Annotation of a sub-string within rich text.",
        required: ["index", "features"],
        properties: {
          index: {
            type: "ref",
            ref: "lex:pub.leaflet.richtext.facet#byteSlice"
          },
          features: {
            type: "array",
            items: {
              type: "union",
              refs: [
                "lex:pub.leaflet.richtext.facet#link",
                "lex:pub.leaflet.richtext.facet#didMention",
                "lex:pub.leaflet.richtext.facet#atMention",
                "lex:pub.leaflet.richtext.facet#code",
                "lex:pub.leaflet.richtext.facet#highlight",
                "lex:pub.leaflet.richtext.facet#underline",
                "lex:pub.leaflet.richtext.facet#strikethrough",
                "lex:pub.leaflet.richtext.facet#id",
                "lex:pub.leaflet.richtext.facet#bold",
                "lex:pub.leaflet.richtext.facet#italic"
              ]
            }
          }
        }
      },
      byteSlice: {
        type: "object",
        description: "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
        required: ["byteStart", "byteEnd"],
        properties: {
          byteStart: {
            type: "integer",
            minimum: 0
          },
          byteEnd: {
            type: "integer",
            minimum: 0
          }
        }
      },
      link: {
        type: "object",
        description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
        required: ["uri"],
        properties: {
          uri: {
            type: "string"
          }
        }
      },
      didMention: {
        type: "object",
        description: "Facet feature for mentioning a did.",
        required: ["did"],
        properties: {
          did: {
            type: "string",
            format: "did"
          }
        }
      },
      atMention: {
        type: "object",
        description: "Facet feature for mentioning an AT URI.",
        required: ["atURI"],
        properties: {
          atURI: {
            type: "string",
            format: "uri"
          }
        }
      },
      code: {
        type: "object",
        description: "Facet feature for inline code.",
        required: [],
        properties: {}
      },
      highlight: {
        type: "object",
        description: "Facet feature for highlighted text.",
        required: [],
        properties: {}
      },
      underline: {
        type: "object",
        description: "Facet feature for underline markup",
        required: [],
        properties: {}
      },
      strikethrough: {
        type: "object",
        description: "Facet feature for strikethrough markup",
        required: [],
        properties: {}
      },
      id: {
        type: "object",
        description: "Facet feature for an identifier. Used for linking to a segment",
        required: [],
        properties: {
          id: {
            type: "string"
          }
        }
      },
      bold: {
        type: "object",
        description: "Facet feature for bold text",
        required: [],
        properties: {}
      },
      italic: {
        type: "object",
        description: "Facet feature for italic text",
        required: [],
        properties: {}
      }
    }
  }
};
var schemas = Object.values(schemaDict);
var lexicons = new lexicon.Lexicons(schemas);
function validate(v, id9, hash, requiredType) {
  return (requiredType ? is$typed : maybe$typed)(v, id9, hash) ? lexicons.validate(`${id9}#${hash}`, v) : {
    success: false,
    error: new lexicon.ValidationError(
      `Must be an object with "${hash === "main" ? id9 : `${id9}#${hash}`}" $type property`
    )
  };
}

// lex-api/types/app/certified/location.ts
var location_exports = {};
__export(location_exports, {
  isMain: () => isMain,
  isRecord: () => isMain,
  validateMain: () => validateMain,
  validateRecord: () => validateMain
});
var is$typed2 = is$typed;
var validate2 = validate;
var id = "app.certified.location";
var hashMain = "main";
function isMain(v) {
  return is$typed2(v, id, hashMain);
}
function validateMain(v) {
  return validate2(v, id, hashMain, true);
}

// lex-api/types/app/gainforest/organization/defaultSite.ts
var defaultSite_exports = {};
__export(defaultSite_exports, {
  isMain: () => isMain2,
  isRecord: () => isMain2,
  validateMain: () => validateMain2,
  validateRecord: () => validateMain2
});
var is$typed3 = is$typed;
var validate3 = validate;
var id2 = "app.gainforest.organization.defaultSite";
var hashMain2 = "main";
function isMain2(v) {
  return is$typed3(v, id2, hashMain2);
}
function validateMain2(v) {
  return validate3(v, id2, hashMain2, true);
}

// lex-api/types/app/gainforest/organization/info.ts
var info_exports = {};
__export(info_exports, {
  isMain: () => isMain3,
  isRecord: () => isMain3,
  validateMain: () => validateMain3,
  validateRecord: () => validateMain3
});
var is$typed4 = is$typed;
var validate4 = validate;
var id3 = "app.gainforest.organization.info";
var hashMain3 = "main";
function isMain3(v) {
  return is$typed4(v, id3, hashMain3);
}
function validateMain3(v) {
  return validate4(v, id3, hashMain3, true);
}

// lex-api/types/app/gainforest/organization/layer.ts
var layer_exports = {};
__export(layer_exports, {
  isMain: () => isMain4,
  isRecord: () => isMain4,
  validateMain: () => validateMain4,
  validateRecord: () => validateMain4
});
var is$typed5 = is$typed;
var validate5 = validate;
var id4 = "app.gainforest.organization.layer";
var hashMain4 = "main";
function isMain4(v) {
  return is$typed5(v, id4, hashMain4);
}
function validateMain4(v) {
  return validate5(v, id4, hashMain4, true);
}

// lex-api/types/app/gainforest/organization/observations/measuredTreesCluster.ts
var measuredTreesCluster_exports = {};
__export(measuredTreesCluster_exports, {
  isMain: () => isMain5,
  isRecord: () => isMain5,
  validateMain: () => validateMain5,
  validateRecord: () => validateMain5
});
var is$typed6 = is$typed;
var validate6 = validate;
var id5 = "app.gainforest.organization.observations.measuredTreesCluster";
var hashMain5 = "main";
function isMain5(v) {
  return is$typed6(v, id5, hashMain5);
}
function validateMain5(v) {
  return validate6(v, id5, hashMain5, true);
}

// lex-api/types/org/hypercerts/claim/activity.ts
var activity_exports = {};
__export(activity_exports, {
  isActivityWeight: () => isActivityWeight,
  isMain: () => isMain6,
  isRecord: () => isMain6,
  isWorkScope: () => isWorkScope,
  validateActivityWeight: () => validateActivityWeight,
  validateMain: () => validateMain6,
  validateRecord: () => validateMain6,
  validateWorkScope: () => validateWorkScope
});
var is$typed7 = is$typed;
var validate7 = validate;
var id6 = "org.hypercerts.claim.activity";
var hashMain6 = "main";
function isMain6(v) {
  return is$typed7(v, id6, hashMain6);
}
function validateMain6(v) {
  return validate7(v, id6, hashMain6, true);
}
var hashWorkScope = "workScope";
function isWorkScope(v) {
  return is$typed7(v, id6, hashWorkScope);
}
function validateWorkScope(v) {
  return validate7(v, id6, hashWorkScope);
}
var hashActivityWeight = "activityWeight";
function isActivityWeight(v) {
  return is$typed7(v, id6, hashActivityWeight);
}
function validateActivityWeight(v) {
  return validate7(v, id6, hashActivityWeight);
}

// lex-api/types/org/hypercerts/claim/contribution.ts
var contribution_exports = {};
__export(contribution_exports, {
  isMain: () => isMain7,
  isRecord: () => isMain7,
  validateMain: () => validateMain7,
  validateRecord: () => validateMain7
});
var is$typed8 = is$typed;
var validate8 = validate;
var id7 = "org.hypercerts.claim.contribution";
var hashMain7 = "main";
function isMain7(v) {
  return is$typed8(v, id7, hashMain7);
}
function validateMain7(v) {
  return validate8(v, id7, hashMain7, true);
}

// lex-api/types/org/hypercerts/claim/project.ts
var project_exports = {};
__export(project_exports, {
  isMain: () => isMain8,
  isRecord: () => isMain8,
  validateMain: () => validateMain8,
  validateRecord: () => validateMain8
});
var is$typed9 = is$typed;
var validate9 = validate;
var id8 = "org.hypercerts.claim.project";
var hashMain8 = "main";
function isMain8(v) {
  return is$typed9(v, id8, hashMain8);
}
function validateMain8(v) {
  return validate9(v, id8, hashMain8, true);
}
var createErrorMessage = {
  fetchFailed: (resource) => `Failed to fetch ${resource}.`,
  listFailed: (resource) => `Failed to list ${resource}.`,
  createFailed: (resource) => `Failed to create ${resource}.`,
  updateFailed: (resource) => `Failed to update ${resource}.`,
  deleteFailed: (resource) => `Failed to delete ${resource}.`,
  notFound: (resource) => `The ${resource} was not found.`,
  invalidData: (resource) => `The ${resource} data is invalid or malformed.`,
  unauthorized: () => "You are not authorized to perform this action.",
  unknown: () => "An unexpected error occurred. Please try again."
};
var handleXrpcError = (error, resource) => {
  if (error.error === "InvalidRequest") {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: createErrorMessage.invalidData(resource),
      cause: error
    });
  }
  if (error.error === "RecordNotFound") {
    throw new server.TRPCError({
      code: "NOT_FOUND",
      message: createErrorMessage.notFound(resource),
      cause: error
    });
  }
  if (error.error === "AuthRequired" || error.error === "InvalidToken") {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: createErrorMessage.unauthorized(),
      cause: error
    });
  }
  throw new server.TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: createErrorMessage.unknown(),
    cause: error
  });
};
var validateRecord = (record, validator, resource) => {
  let validationResponse;
  try {
    validationResponse = validator.validateRecord(record);
  } catch (error) {
    throw new server.TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: createErrorMessage.invalidData(resource),
      cause: error
    });
  }
  if (!validationResponse.success) {
    throw new server.TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: validationResponse.error.message,
      cause: validationResponse.error
    });
  }
  return validationResponse.value;
};
var handleOperationError = (error, resource, operation) => {
  if (error instanceof xrpc.XRPCError) {
    handleXrpcError(error, resource);
  }
  if (error instanceof server.TRPCError) {
    throw error;
  }
  const messageMap = {
    fetch: createErrorMessage.fetchFailed,
    list: createErrorMessage.listFailed,
    create: createErrorMessage.createFailed,
    update: createErrorMessage.updateFailed,
    delete: createErrorMessage.deleteFailed
  };
  throw new server.TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: messageMap[operation](resource),
    cause: error
  });
};
var getRecord = async ({
  agent,
  collection,
  repo,
  rkey,
  validator,
  resourceName
}) => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.getRecord({ collection, repo, rkey })
  );
  if (error !== null) {
    handleOperationError(error, resourceName, "fetch");
  }
  if (response === null || !response.success) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.fetchFailed(resourceName)
    });
  }
  const validatedValue = validateRecord(response.data.value, validator, resourceName);
  return {
    uri: response.data.uri,
    cid: response.data.cid,
    value: validatedValue
  };
};
var listRecords = async ({
  agent,
  collection,
  repo,
  validator,
  resourceName,
  skipInvalid = true,
  limit,
  cursor
}) => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.listRecords({ collection, repo, limit, cursor })
  );
  if (error !== null) {
    handleOperationError(error, resourceName, "list");
  }
  if (response === null || !response.success) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.listFailed(resourceName)
    });
  }
  const validatedRecords = [];
  for (const record of response.data.records) {
    try {
      const validatedValue = validateRecord(record.value, validator, resourceName);
      validatedRecords.push({
        uri: record.uri,
        cid: record.cid,
        value: validatedValue
      });
    } catch (validationError) {
      if (!skipInvalid) {
        throw validationError;
      }
    }
  }
  return {
    records: validatedRecords,
    cursor: response.data.cursor
  };
};
var createRecord = async ({
  agent,
  collection,
  repo,
  record,
  validator,
  resourceName,
  rkey
}) => {
  const validatedRecord = validateRecord(record, validator, resourceName);
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.createRecord({
      collection,
      repo,
      record: validatedRecord,
      rkey
    })
  );
  if (error !== null) {
    handleOperationError(error, resourceName, "create");
  }
  if (response === null || !response.success) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.createFailed(resourceName)
    });
  }
  return {
    uri: response.data.uri,
    cid: response.data.cid,
    validationStatus: response.data.validationStatus,
    value: validatedRecord
  };
};
var putRecord = async ({
  agent,
  collection,
  repo,
  rkey,
  record,
  validator,
  resourceName
}) => {
  const validatedRecord = validateRecord(record, validator, resourceName);
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.putRecord({
      collection,
      repo,
      rkey,
      record: validatedRecord
    })
  );
  if (error !== null) {
    handleOperationError(error, resourceName, "update");
  }
  if (response === null || !response.success) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.updateFailed(resourceName)
    });
  }
  return {
    uri: response.data.uri,
    cid: response.data.cid,
    validationStatus: response.data.validationStatus,
    value: validatedRecord
  };
};
var deleteRecord = async ({
  agent,
  collection,
  repo,
  rkey,
  resourceName
}) => {
  const [response, error] = await tryCatch(
    agent.com.atproto.repo.deleteRecord({ collection, repo, rkey })
  );
  if (error !== null) {
    handleOperationError(error, resourceName, "delete");
  }
  if (response === null || !response.success) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: createErrorMessage.deleteFailed(resourceName)
    });
  }
  return { success: true };
};
var createOrUpdateRecord = async ({
  agent,
  collection,
  repo,
  record,
  validator,
  resourceName,
  rkey
}) => {
  if (rkey) {
    return putRecord({
      agent,
      collection,
      repo,
      rkey,
      record,
      validator,
      resourceName
    });
  }
  return createRecord({
    agent,
    collection,
    repo,
    record,
    validator,
    resourceName
  });
};

// src/_internal/server/routers/atproto/gainforest/organization/info/get.ts
var COLLECTION = "app.gainforest.organization.info";
var RESOURCE_NAME = "organization info";
var getOrganizationInfoPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    rkey: "self",
    validator: info_exports,
    resourceName: RESOURCE_NAME
  });
};
var getOrganizationInfoFactory = createDidQueryFactory(getOrganizationInfoPure);

// src/_internal/server/routers/atproto/hypercerts/location/get.ts
var COLLECTION2 = "app.certified.location";
var RESOURCE_NAME2 = "location";
var getLocationPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION2,
    repo: did,
    rkey,
    validator: location_exports,
    resourceName: RESOURCE_NAME2
  });
};
var getLocationFactory = createDidRkeyQueryFactory(getLocationPure);

// src/_internal/server/routers/atproto/hypercerts/location/getDefault.ts
var COLLECTION3 = "app.gainforest.organization.defaultSite";
var RESOURCE_NAME3 = "default location";
var getDefaultLocationPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION3,
    repo: did,
    rkey: "self",
    validator: defaultSite_exports,
    resourceName: RESOURCE_NAME3
  });
};
var getDefaultLocationFactory = createDidQueryFactory(getDefaultLocationPure);

// src/_internal/server/routers/atproto/gainforest/organization/observations/measuredTreesCluster/get.ts
var COLLECTION4 = "app.gainforest.organization.observations.measuredTreesCluster";
var RESOURCE_NAME4 = "measured trees cluster";
var getMeasuredTreesClusterPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION4,
    repo: did,
    rkey: "self",
    validator: measuredTreesCluster_exports,
    resourceName: RESOURCE_NAME4
  });
};
var getMeasuredTreesFactory = createDidQueryFactory(getMeasuredTreesClusterPure);
var StrongRefSchema = z8__default.default.object({
  $type: z8__default.default.literal("com.atproto.repo.strongRef").optional(),
  uri: z8__default.default.string().regex(/^at:\/\//),
  cid: z8__default.default.string()
});

// src/_internal/server/utils/ownership.ts
var checkOwnershipByAtUri = (atUri, userDid) => {
  const { did } = parseAtUri(atUri);
  if (did !== userDid) {
    return false;
  }
  return true;
};

// src/_internal/server/routers/atproto/hypercerts/claim/activity/create.ts
var ACTIVITY_COLLECTION = "org.hypercerts.claim.activity";
var CONTRIBUTION_COLLECTION = "org.hypercerts.claim.contribution";
var ClaimActivityInputSchema = z8__default.default.object({
  title: z8__default.default.string().min(1, "Title is required"),
  shortDescription: z8__default.default.string().min(1, "Short description is required"),
  description: z8__default.default.string().optional(),
  locations: StrongRefSchema.array().min(1, "At least one location is required"),
  project: z8__default.default.string().optional(),
  workScopes: z8__default.default.array(z8__default.default.string()).min(1, "At least one work scope is required"),
  startDate: z8__default.default.string(),
  endDate: z8__default.default.string(),
  contributors: z8__default.default.array(z8__default.default.string()).min(1, "At least one contributor is required"),
  createdAt: z8__default.default.string().optional()
});
var ClaimActivityUploadsSchema = z8__default.default.object({
  image: FileGeneratorSchema
});
var uploadFile = async (fileGenerator, agent) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file);
  return toBlobRefGenerator(response.data.blob);
};
var createClaimActivityPure = async (agent, activityInput, uploads) => {
  const did = agent.did;
  if (!did) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action."
    });
  }
  for (const location of activityInput.locations) {
    if (!checkOwnershipByAtUri(location.uri, did)) {
      throw new server.TRPCError({
        code: "FORBIDDEN",
        message: "One of the locations being referenced is not owned by you."
      });
    }
  }
  if (activityInput.project) {
    if (!checkOwnershipByAtUri(activityInput.project, did)) {
      throw new server.TRPCError({
        code: "FORBIDDEN",
        message: "The project being referenced is not owned by you."
      });
    }
  }
  const [imageBlobRef, uploadError] = await tryCatch(
    uploadFile(uploads.image, agent)
  );
  if (uploadError !== null || !imageBlobRef) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload the activity image.",
      cause: uploadError
    });
  }
  const activity = {
    $type: ACTIVITY_COLLECTION,
    title: activityInput.title,
    shortDescription: activityInput.shortDescription,
    description: activityInput.description,
    image: {
      $type: "org.hypercerts.defs#smallImage",
      image: toBlobRef(imageBlobRef)
    },
    location: activityInput.locations,
    project: activityInput.project,
    workScope: {
      $type: "org.hypercerts.claim.activity#workScope",
      withinAnyOf: activityInput.workScopes
    },
    startDate: activityInput.startDate,
    endDate: activityInput.endDate,
    createdAt: activityInput.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
  };
  const activityResult = await createRecord({
    agent,
    collection: ACTIVITY_COLLECTION,
    repo: did,
    record: activity,
    validator: activity_exports,
    resourceName: "claim activity"
  });
  const contribution = {
    $type: CONTRIBUTION_COLLECTION,
    hypercert: {
      $type: "com.atproto.repo.strongRef",
      uri: activityResult.uri,
      cid: activityResult.cid
    },
    role: "Contributor",
    contributors: activityInput.contributors,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const [, contributionError] = await tryCatch(
    createRecord({
      agent,
      collection: CONTRIBUTION_COLLECTION,
      repo: did,
      record: contribution,
      validator: contribution_exports,
      resourceName: "contribution"
    })
  );
  if (contributionError !== null) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create the contribution record.",
      cause: contributionError
    });
  }
  return activityResult;
};
var createClaimActivityFactory = createMutationFactory(
  {
    activity: ClaimActivityInputSchema,
    uploads: ClaimActivityUploadsSchema
  },
  (agent, input) => createClaimActivityPure(agent, input.activity, input.uploads)
);
var COLLECTION5 = "app.gainforest.organization.info";
var RESOURCE_NAME5 = "organization info";
var ObjectivesSchema = z8__default.default.enum([
  "Conservation",
  "Research",
  "Education",
  "Community",
  "Other"
]);
var VisibilitySchema = z8__default.default.enum(["Public", "Hidden"]);
var OrganizationInfoInputSchema = z8__default.default.object({
  displayName: z8__default.default.string().min(1, "Display name is required"),
  shortDescription: z8__default.default.string().min(1, "Short description is required"),
  longDescription: z8__default.default.string().min(1, "Long description is required"),
  website: z8__default.default.string().url("Website must be a valid URL").optional(),
  logo: BlobRefGeneratorSchema.optional(),
  coverImage: BlobRefGeneratorSchema.optional(),
  objectives: z8__default.default.array(ObjectivesSchema).min(1, "At least one objective is required"),
  startDate: z8__default.default.string().datetime().optional(),
  country: z8__default.default.string().min(1, "Country is required"),
  visibility: VisibilitySchema,
  createdAt: z8__default.default.string().datetime().optional()
});
var OrganizationInfoUploadsSchema = z8__default.default.object({
  logo: FileGeneratorSchema.optional(),
  coverImage: FileGeneratorSchema.optional()
});
var createOrUpdateOrganizationInfoPure = async (agent, did, infoInput, uploads) => {
  const logoBlob = uploads?.logo ? (await uploadFileAsBlobPure(uploads.logo, agent)).blob : infoInput.logo ? toBlobRef(infoInput.logo) : void 0;
  const coverImageBlob = uploads?.coverImage ? (await uploadFileAsBlobPure(uploads.coverImage, agent)).blob : infoInput.coverImage ? toBlobRef(infoInput.coverImage) : void 0;
  const info = {
    $type: COLLECTION5,
    displayName: infoInput.displayName,
    shortDescription: infoInput.shortDescription,
    longDescription: infoInput.longDescription,
    website: infoInput.website,
    logo: logoBlob ? { $type: "app.gainforest.common.defs#smallImage", image: logoBlob } : void 0,
    coverImage: coverImageBlob ? { $type: "app.gainforest.common.defs#smallImage", image: coverImageBlob } : void 0,
    objectives: infoInput.objectives,
    startDate: infoInput.startDate,
    country: infoInput.country,
    visibility: infoInput.visibility,
    createdAt: infoInput.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
  };
  return putRecord({
    agent,
    collection: COLLECTION5,
    repo: did,
    rkey: "self",
    record: info,
    validator: info_exports,
    resourceName: RESOURCE_NAME5
  });
};
var createOrUpdateOrganizationInfoFactory = createMutationFactory(
  {
    info: OrganizationInfoInputSchema,
    uploads: OrganizationInfoUploadsSchema.optional()
  },
  (agent, input) => createOrUpdateOrganizationInfoPure(agent, input.did, input.info, input.uploads)
);
var COLLECTION6 = "app.gainforest.organization.layer";
var RESOURCE_NAME6 = "layer";
var LayerTypeSchema = z8__default.default.enum([
  "geojson_points",
  "geojson_points_trees",
  "geojson_line",
  "choropleth",
  "choropleth_shannon",
  "raster_tif",
  "tms_tile"
]);
var LayerInputSchema = z8__default.default.object({
  name: z8__default.default.string().min(1, "Layer name is required"),
  type: LayerTypeSchema,
  uri: z8__default.default.string().url("Layer URI must be a valid URL"),
  description: z8__default.default.string().optional(),
  createdAt: z8__default.default.string().datetime().optional()
});
var createOrUpdateLayerPure = async (agent, did, layerInput, rkey) => {
  const layer = {
    $type: COLLECTION6,
    name: layerInput.name,
    type: layerInput.type,
    uri: layerInput.uri,
    description: layerInput.description,
    createdAt: layerInput.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
  };
  return createOrUpdateRecord({
    agent,
    collection: COLLECTION6,
    repo: did,
    record: layer,
    validator: layer_exports,
    resourceName: RESOURCE_NAME6,
    rkey
  });
};
var createOrUpdateLayerFactory = createMutationFactory(
  {
    layer: LayerInputSchema,
    rkey: z8__default.default.string().optional()
  },
  (agent, input) => createOrUpdateLayerPure(agent, input.did, input.layer, input.rkey)
);

// src/_internal/server/routers/atproto/hypercerts/location/getAll.ts
var LOCATION_COLLECTION = "app.certified.location";
var DEFAULT_SITE_COLLECTION = "app.gainforest.organization.defaultSite";
var getAllLocationsPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const [locationsResult, defaultSiteResult] = await Promise.all([
    listRecords({
      agent,
      collection: LOCATION_COLLECTION,
      repo: did,
      validator: location_exports,
      resourceName: "locations",
      skipInvalid: true
    }),
    tryCatch(
      getRecord({
        agent,
        collection: DEFAULT_SITE_COLLECTION,
        repo: did,
        rkey: "self",
        validator: defaultSite_exports,
        resourceName: "default location"
      })
    )
  ]);
  const [defaultSite] = defaultSiteResult;
  return {
    locations: locationsResult.records,
    defaultLocation: defaultSite ?? null
  };
};
var getAllLocationsFactory = createDidQueryFactory(getAllLocationsPure);

// src/_internal/lib/geojson/validate.ts
function validateGeojsonOrThrow(value) {
  if (value === null || typeof value !== "object") {
    throw new Error("GeoJSON must be an object");
  }
  const obj = value;
  if (!("type" in obj) || typeof obj.type !== "string") {
    throw new Error("GeoJSON must have a 'type' property of type string");
  }
  const type = obj.type;
  if (type === "FeatureCollection") {
    if (!("features" in obj) || !Array.isArray(obj.features)) {
      throw new Error(
        "FeatureCollection must have a 'features' property of type array"
      );
    }
    for (let i = 0; i < obj.features.length; i++) {
      try {
        validateGeojsonOrThrow(obj.features[i]);
      } catch (error) {
        throw new Error(
          `FeatureCollection.features[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    return obj;
  }
  if (type === "Feature") {
    if (!("geometry" in obj)) {
      throw new Error("Feature must have a 'geometry' property");
    }
    if (obj.geometry !== null) {
      try {
        validateGeometry(obj.geometry);
      } catch (error) {
        throw new Error(
          `Feature.geometry is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    if (!("properties" in obj)) {
      throw new Error("Feature must have a 'properties' property");
    }
    if (obj.properties !== null && typeof obj.properties !== "object") {
      throw new Error("Feature.properties must be an object or null");
    }
    return obj;
  }
  try {
    validateGeometry(obj);
    return obj;
  } catch (error) {
    throw new Error(
      `Invalid GeoJSON type '${type}': ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function validateGeometry(value) {
  if (value === null || typeof value !== "object") {
    throw new Error("Geometry must be an object");
  }
  const geometry = value;
  if (!("type" in geometry) || typeof geometry.type !== "string") {
    throw new Error("Geometry must have a 'type' property of type string");
  }
  const type = geometry.type;
  if (type === "GeometryCollection") {
    if (!("geometries" in geometry) || !Array.isArray(geometry.geometries)) {
      throw new Error(
        "GeometryCollection must have a 'geometries' property of type array"
      );
    }
    for (let i = 0; i < geometry.geometries.length; i++) {
      try {
        validateGeometry(geometry.geometries[i]);
      } catch (error) {
        throw new Error(
          `GeometryCollection.geometries[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    return;
  }
  const coordinateGeometries = [
    "Point",
    "LineString",
    "Polygon",
    "MultiPoint",
    "MultiLineString",
    "MultiPolygon"
  ];
  if (coordinateGeometries.includes(type)) {
    if (!("coordinates" in geometry)) {
      throw new Error(`${type} must have a 'coordinates' property`);
    }
    validateCoordinates(geometry.coordinates, type);
    return;
  }
  throw new Error(`Unknown geometry type: ${type}`);
}
function validateCoordinates(coordinates, type) {
  if (!Array.isArray(coordinates)) {
    throw new Error("Coordinates must be an array");
  }
  switch (type) {
    case "Point":
      validatePosition(coordinates);
      break;
    case "LineString":
      validateLineString(coordinates);
      break;
    case "Polygon":
      validatePolygon(coordinates);
      break;
    case "MultiPoint":
      validateMultiPoint(coordinates);
      break;
    case "MultiLineString":
      validateMultiLineString(coordinates);
      break;
    case "MultiPolygon":
      validateMultiPolygon(coordinates);
      break;
  }
}
function validatePosition(value) {
  if (!Array.isArray(value)) {
    throw new Error("Position must be an array");
  }
  if (value.length < 2) {
    throw new Error(
      "Position must have at least 2 elements (longitude, latitude)"
    );
  }
  if (typeof value[0] !== "number" || typeof value[1] !== "number") {
    throw new Error("Position must have numbers for longitude and latitude");
  }
  if (value.length > 2 && typeof value[2] !== "number") {
    throw new Error(
      "Position elevation (3rd element) must be a number if present"
    );
  }
  if (value[0] < -180 || value[0] > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }
  if (value[1] < -90 || value[1] > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }
}
function validateLineString(value) {
  if (!Array.isArray(value)) {
    throw new Error("LineString must be an array");
  }
  if (value.length < 2) {
    throw new Error("LineString must have at least 2 positions");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `LineString[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validatePolygon(value) {
  if (!Array.isArray(value)) {
    throw new Error("Polygon must be an array");
  }
  if (value.length === 0) {
    throw new Error("Polygon must have at least one LinearRing");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validateLinearRing(value[i]);
    } catch (error) {
      throw new Error(
        `Polygon[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateLinearRing(value) {
  if (!Array.isArray(value)) {
    throw new Error("LinearRing must be an array");
  }
  if (value.length < 4) {
    throw new Error("LinearRing must have at least 4 positions");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `LinearRing[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  const first = value[0];
  const last = value[value.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1] || first.length > 2 && first[2] !== last[2]) {
    throw new Error(
      "LinearRing must be closed (first and last positions must be equal)"
    );
  }
}
function validateMultiPoint(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiPoint must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `MultiPoint[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateMultiLineString(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiLineString must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validateLineString(value[i]);
    } catch (error) {
      throw new Error(
        `MultiLineString[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateMultiPolygon(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiPolygon must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePolygon(value[i]);
    } catch (error) {
      throw new Error(
        `MultiPolygon[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
var HECTARES_PER_SQUARE_METER = 1e-4;
var isFeatureCollection = (value) => value.type === "FeatureCollection";
var isFeature = (value) => value.type === "Feature";
var isGeometryCollection = (value) => value.type === "GeometryCollection";
var isPolygon = (value) => value.type === "Polygon";
var isMultiPolygon = (value) => value.type === "MultiPolygon";
var isLineString = (value) => value.type === "LineString";
var isMultiLineString = (value) => value.type === "MultiLineString";
var isPoint = (value) => value.type === "Point";
var isMultiPoint = (value) => value.type === "MultiPoint";
var isLineStringClosed = (lineString) => {
  const coords = lineString.coordinates;
  if (coords.length < 4) return false;
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (!first || !last || first.length < 2 || last.length < 2) return false;
  const firstLon = first[0];
  const firstLat = first[1];
  const lastLon = last[0];
  const lastLat = last[1];
  if (firstLon === void 0 || firstLat === void 0 || lastLon === void 0 || lastLat === void 0) {
    return false;
  }
  const tolerance = 1e-10;
  return Math.abs(firstLon - lastLon) < tolerance && Math.abs(firstLat - lastLat) < tolerance;
};
var lineStringToPolygon = (lineString) => {
  if (!isLineStringClosed(lineString)) return null;
  return {
    type: "Polygon",
    coordinates: [lineString.coordinates]
  };
};
var toFeature = (geometry) => ({
  type: "Feature",
  geometry,
  properties: {}
});
var extractPolygonFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPolygonFeatures(feature));
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractPolygonFeatures(toFeature(subGeometry))
      );
    }
    if (isPolygon(geometry2) || isMultiPolygon(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractPolygonFeatures(toFeature(subGeometry))
    );
  }
  if (isPolygon(geometry) || isMultiPolygon(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var extractLineStringFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap(
      (feature) => extractLineStringFeatures(feature)
    );
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractLineStringFeatures(toFeature(subGeometry))
      );
    }
    if (isLineString(geometry2) || isMultiLineString(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractLineStringFeatures(toFeature(subGeometry))
    );
  }
  if (isLineString(geometry) || isMultiLineString(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var extractPointFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPointFeatures(feature));
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractPointFeatures(toFeature(subGeometry))
      );
    }
    if (isPoint(geometry2) || isMultiPoint(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractPointFeatures(toFeature(subGeometry))
    );
  }
  if (isPoint(geometry) || isMultiPoint(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var computeCentroid = (features) => {
  if (features.length === 0) return null;
  const collection = turf.featureCollection(features);
  try {
    const { geometry } = turf.centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turf.centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForLineStrings = (features) => {
  if (features.length === 0) return null;
  const collection = turf.featureCollection(features);
  try {
    const { geometry } = turf.centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turf.centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForPoints = (features) => {
  if (features.length === 0) return null;
  const collection = turf.featureCollection(features);
  try {
    const { geometry } = turf.centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turf.centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForMixed = (features) => {
  if (features.length === 0) return null;
  const collection = turf.featureCollection(features);
  try {
    const { geometry } = turf.centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turf.centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computePolygonMetrics = (geoJson) => {
  const polygonFeatures = extractPolygonFeatures(geoJson);
  const lineStringFeatures = extractLineStringFeatures(geoJson);
  const pointFeatures = extractPointFeatures(geoJson);
  const convertedPolygons = [];
  for (const lineStringFeature of lineStringFeatures) {
    if (lineStringFeature.geometry.type === "LineString") {
      const polygon = lineStringToPolygon(lineStringFeature.geometry);
      if (polygon) {
        convertedPolygons.push({
          type: "Feature",
          geometry: polygon,
          properties: lineStringFeature.properties
        });
      }
    } else if (lineStringFeature.geometry.type === "MultiLineString") {
      for (const lineString of lineStringFeature.geometry.coordinates) {
        const ls = { coordinates: lineString };
        const polygon = lineStringToPolygon(ls);
        if (polygon) {
          convertedPolygons.push({
            type: "Feature",
            geometry: polygon,
            properties: lineStringFeature.properties
          });
        }
      }
    }
  }
  const allPolygonFeatures = [...polygonFeatures, ...convertedPolygons];
  if (pointFeatures.length > 0 && allPolygonFeatures.length === 0 && lineStringFeatures.length === 0) {
    const centroidPosition2 = computeCentroidForPoints(pointFeatures);
    const bbox2 = turf.bbox(turf.featureCollection(pointFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? "Success (Point)" : "Centroid calculation failed"
    };
  }
  if (lineStringFeatures.length > 0 && allPolygonFeatures.length === 0) {
    lineStringFeatures.reduce(
      (acc, feature) => acc + turf.length(feature, { units: "meters" }),
      0
    );
    const centroidPosition2 = computeCentroidForLineStrings(lineStringFeatures);
    const bbox2 = turf.bbox(turf.featureCollection(lineStringFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? "Success (LineString)" : "Centroid calculation failed"
    };
  }
  const hasPolygons = allPolygonFeatures.length > 0;
  const hasLineStrings = lineStringFeatures.length > 0;
  const hasPoints = pointFeatures.length > 0;
  const geometryTypeCount = (hasPolygons ? 1 : 0) + (hasLineStrings ? 1 : 0) + (hasPoints ? 1 : 0);
  if (geometryTypeCount > 1) {
    const areaSqMeters2 = allPolygonFeatures.reduce(
      (acc, feature) => acc + turf.area(feature),
      0
    );
    const allFeatures = [
      ...allPolygonFeatures,
      ...lineStringFeatures,
      ...pointFeatures
    ];
    const centroidPosition2 = computeCentroidForMixed(allFeatures);
    const bbox2 = turf.bbox(turf.featureCollection(allFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    const typeLabels = [];
    if (hasPolygons) typeLabels.push("Polygon");
    if (hasLineStrings) typeLabels.push("LineString");
    if (hasPoints) typeLabels.push("Point");
    return {
      areaSqMeters: areaSqMeters2,
      areaHectares: areaSqMeters2 * HECTARES_PER_SQUARE_METER,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? `Success (mixed: ${typeLabels.join(", ")})` : "Centroid calculation failed"
    };
  }
  if (allPolygonFeatures.length === 0 && lineStringFeatures.length === 0 && pointFeatures.length === 0) {
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: null,
      bbox: null,
      message: "No polygons found"
    };
  }
  const areaSqMeters = allPolygonFeatures.reduce(
    (acc, feature) => acc + turf.area(feature),
    0
  );
  const centroidPosition = computeCentroid(allPolygonFeatures);
  const bbox = turf.bbox(turf.featureCollection(allPolygonFeatures));
  let centroid = null;
  if (centroidPosition && centroidPosition[0] !== void 0 && centroidPosition[1] !== void 0) {
    const [lon, lat] = centroidPosition;
    centroid = { lat, lon };
  }
  return {
    areaSqMeters,
    areaHectares: areaSqMeters * HECTARES_PER_SQUARE_METER,
    centroid,
    bbox,
    message: centroid ? "Success" : "Centroid calculation failed"
  };
};

// src/_internal/server/routers/atproto/hypercerts/location/utils.ts
async function fetchGeojsonFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch site"
    });
  }
  const blob = await response.blob();
  if (blob.type !== "application/geo+json") {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const file = new File([blob], "site.geojson", {
    type: blob.type
  });
  return file;
}
async function processGeojsonFileOrThrow(file) {
  if (file.type !== "application/geo+json") {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const geojsonText = await file.text();
  const geojson = JSON.parse(geojsonText);
  const [validatedGeojsonObject, geojsonValidationError] = await tryCatch(
    new Promise((r) => r(validateGeojsonOrThrow(geojson)))
  );
  if (geojsonValidationError) {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid GeoJSON file: " + geojsonValidationError.message
    });
  }
  const polygonMetrics = computePolygonMetrics(validatedGeojsonObject);
  const lat = polygonMetrics.centroid?.lat;
  const lon = polygonMetrics.centroid?.lon;
  const area = polygonMetrics.areaHectares;
  if (!lat || !lon || !area) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to process the geojson data."
    });
  }
  return {
    lat: lat.toFixed(6),
    lon: lon.toFixed(6),
    area: area.toFixed(2)
  };
}

// src/_internal/server/routers/atproto/hypercerts/location/create.ts
var COLLECTION7 = "app.certified.location";
var RESOURCE_NAME7 = "location";
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var LocationInputSchema = z8__default.default.object({
  name: z8__default.default.string().min(1, "Location name is required")
});
var LocationUploadsSchema = z8__default.default.object({
  shapefile: z8__default.default.union([z8__default.default.string().url(), FileGeneratorSchema])
});
var createLocationPure = async (agent, locationInput, uploads, rkey) => {
  const did = agent.did;
  if (!did) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action."
    });
  }
  const file = typeof uploads.shapefile === "string" ? await fetchGeojsonFromUrl(uploads.shapefile) : await toFile(uploads.shapefile);
  if (file.size > MAX_FILE_SIZE) {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "The GeoJSON file is too large. It must be less than 10MB."
    });
  }
  await processGeojsonFileOrThrow(file);
  const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
  if (uploadError !== null || uploadResponse === null) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload the GeoJSON file.",
      cause: uploadError
    });
  }
  const location = {
    $type: COLLECTION7,
    name: locationInput.name,
    lpVersion: "1.0.0",
    srs: "https://epsg.io/3857",
    locationType: "geojson-point",
    location: {
      $type: "org.hypercerts.defs#smallBlob",
      blob: uploadResponse.data.blob
    },
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return createRecord({
    agent,
    collection: COLLECTION7,
    repo: did,
    record: location,
    validator: location_exports,
    resourceName: RESOURCE_NAME7,
    rkey
  });
};
var createLocationFactory = createMutationFactory(
  {
    site: LocationInputSchema,
    uploads: LocationUploadsSchema,
    rkey: z8__default.default.string().optional()
  },
  (agent, input) => createLocationPure(agent, input.site, input.uploads, input.rkey)
);
var COLLECTION8 = "app.certified.location";
var RESOURCE_NAME8 = "location";
var LocationUpdateInputSchema = z8__default.default.object({
  name: z8__default.default.string().min(1, "Location name is required"),
  shapefile: z8__default.default.object({
    $type: z8__default.default.literal("app.gainforest.common.defs#smallBlob"),
    blob: BlobRefGeneratorSchema
  }).optional()
});
var LocationUpdateUploadsSchema = z8__default.default.object({
  shapefile: FileGeneratorSchema.optional()
}).optional();
var updateLocationPure = async (agent, rkey, locationInput, uploads) => {
  const did = agent.did;
  if (!did) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action."
    });
  }
  let shapefileBlob;
  if (uploads?.shapefile) {
    const file = await toFile(uploads.shapefile);
    await processGeojsonFileOrThrow(file);
    const [uploadResponse, uploadError] = await tryCatch(agent.uploadBlob(file));
    if (uploadError !== null || uploadResponse === null) {
      throw new server.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to upload the GeoJSON file.",
        cause: uploadError
      });
    }
    shapefileBlob = {
      $type: "org.hypercerts.defs#smallBlob",
      blob: uploadResponse.data.blob
    };
  } else if (locationInput.shapefile) {
    shapefileBlob = {
      $type: "org.hypercerts.defs#smallBlob",
      blob: toBlobRef(locationInput.shapefile.blob)
    };
  } else {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "A shapefile is required. Provide either a new file or an existing blob reference."
    });
  }
  const location = {
    $type: COLLECTION8,
    name: locationInput.name,
    lpVersion: "1.0.0",
    srs: "https://epsg.io/3857",
    locationType: "geojson-point",
    location: shapefileBlob,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return putRecord({
    agent,
    collection: COLLECTION8,
    repo: did,
    rkey,
    record: location,
    validator: location_exports,
    resourceName: RESOURCE_NAME8
  });
};
var updateLocationFactory = createMutationFactory(
  {
    rkey: z8__default.default.string(),
    site: LocationUpdateInputSchema,
    uploads: LocationUpdateUploadsSchema
  },
  (agent, input) => updateLocationPure(agent, input.rkey, input.site, input.uploads)
);
var LOCATION_COLLECTION2 = "app.certified.location";
var DEFAULT_SITE_COLLECTION2 = "app.gainforest.organization.defaultSite";
var setDefaultLocationPure = async (agent, locationAtUri) => {
  const did = agent.did;
  if (!did) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action."
    });
  }
  if (!(locationAtUri.startsWith("at://") && locationAtUri.includes(LOCATION_COLLECTION2))) {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid location URI format."
    });
  }
  const [, locationError] = await tryCatch(
    getRecord({
      agent,
      collection: LOCATION_COLLECTION2,
      repo: did,
      rkey: parseAtUri(locationAtUri).rkey,
      validator: location_exports,
      resourceName: "location"
    })
  );
  if (locationError !== null) {
    throw new server.TRPCError({
      code: "NOT_FOUND",
      message: "The specified location was not found.",
      cause: locationError
    });
  }
  const defaultSite = {
    $type: DEFAULT_SITE_COLLECTION2,
    site: locationAtUri,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return putRecord({
    agent,
    collection: DEFAULT_SITE_COLLECTION2,
    repo: did,
    rkey: "self",
    record: defaultSite,
    validator: defaultSite_exports,
    resourceName: "default location"
  });
};
var setDefaultLocationFactory = createMutationFactory(
  {
    locationAtUri: z8__default.default.string()
  },
  (agent, input) => setDefaultLocationPure(agent, input.locationAtUri)
);
var LOCATION_COLLECTION3 = "app.certified.location";
var DEFAULT_SITE_COLLECTION3 = "app.gainforest.organization.defaultSite";
var deleteLocationPure = async (agent, locationAtUri) => {
  const did = agent.did;
  if (!did) {
    throw new server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to perform this action."
    });
  }
  const [defaultSiteResult] = await tryCatch(
    getRecord({
      agent,
      collection: DEFAULT_SITE_COLLECTION3,
      repo: did,
      rkey: "self",
      validator: defaultSite_exports,
      resourceName: "default location"
    })
  );
  if (defaultSiteResult?.value.site === locationAtUri) {
    throw new server.TRPCError({
      code: "BAD_REQUEST",
      message: "Cannot delete the default location. Please set a different default first."
    });
  }
  const rkey = parseAtUri(locationAtUri).rkey;
  return deleteRecord({
    agent,
    collection: LOCATION_COLLECTION3,
    repo: did,
    rkey,
    resourceName: "location"
  });
};
var deleteLocationFactory = createMutationFactory(
  {
    locationAtUri: z8__default.default.string()
  },
  (agent, input) => deleteLocationPure(agent, input.locationAtUri)
);

// src/_internal/server/routers/atproto/hypercerts/claim/activity/getAll.ts
var COLLECTION9 = "org.hypercerts.claim.activity";
var RESOURCE_NAME9 = "claim activities";
var getAllClaimActivitiesPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION9,
    repo: did,
    validator: activity_exports,
    resourceName: RESOURCE_NAME9,
    skipInvalid: true
  });
  return {
    activities: result.records
  };
};
var getAllClaimActivitiesFactory = createDidQueryFactory(getAllClaimActivitiesPure);

// src/_internal/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs.ts
var getAllClaimActivitiesAcrossOrganizationsPure = async (pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const [repositoriesListResponse, repositoriesListFetchError] = await tryCatch(
    agent.com.atproto.sync.listRepos({
      limit: 150
    })
  );
  if (repositoriesListFetchError !== null || repositoriesListResponse === null || repositoriesListResponse.success !== true) {
    throw new server.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch the list of repositories.",
      cause: repositoriesListFetchError
    });
  }
  const repositoriesList = repositoriesListResponse.data.repos;
  const organizationResults = await Promise.all(
    repositoriesList.map(async (repo) => {
      const [organizationInfoResponse] = await tryCatch(
        getOrganizationInfoPure(repo.did, pdsDomain)
      );
      if (!organizationInfoResponse) {
        return null;
      }
      return {
        repo: { did: repo.did },
        organizationInfo: organizationInfoResponse.value
      };
    })
  );
  const validOrganizations = organizationResults.filter(
    (org) => org !== null
  );
  const activitiesResults = await Promise.all(
    validOrganizations.map(async (organization) => {
      const [activitiesResponse] = await tryCatch(
        getAllClaimActivitiesPure(organization.repo.did, pdsDomain)
      );
      if (!activitiesResponse) {
        return null;
      }
      return {
        repo: organization.repo,
        activities: activitiesResponse.activities,
        organizationInfo: organization.organizationInfo
      };
    })
  );
  return activitiesResults.filter(
    (activity) => activity !== null
  );
};
var getAllClaimActivitiesAcrossOrganizationsFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(z8.z.object({ pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    return getAllClaimActivitiesAcrossOrganizationsPure(input.pdsDomain);
  });
};

// src/_internal/server/routers/atproto/hypercerts/claim/activity/get.ts
var COLLECTION10 = "org.hypercerts.claim.activity";
var RESOURCE_NAME10 = "claim activity";
var getClaimActivityPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION10,
    repo: did,
    rkey,
    validator: activity_exports,
    resourceName: RESOURCE_NAME10
  });
};
var getClaimActivityFactory = createDidRkeyQueryFactory(getClaimActivityPure);
var getCliamActivityFactory = getClaimActivityFactory;
var addMeasuredTreesClusterToProjectFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      projectRkey: z8.z.string(),
      measuredTreesClusterUris: z8.z.array(z8.z.string()).min(1),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const readAgent = getReadAgent(input.pdsDomain);
    const writeAgent = await getWriteAgent(input.pdsDomain);
    if (!writeAgent.did) {
      throw new server.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const ownedClusterUris = input.measuredTreesClusterUris.filter(
      (uri) => checkOwnershipByAtUri(uri, input.did)
    );
    if (ownedClusterUris.length !== input.measuredTreesClusterUris.length) {
      throw new server.TRPCError({
        code: "BAD_REQUEST",
        message: ownedClusterUris.length === 1 ? "The measured trees cluster you are trying to add is not owned by you" : "The measured trees clusters you are trying to add are not owned by you"
      });
    }
    const clusterExistencePromise = Promise.all(
      input.measuredTreesClusterUris.map(async (uri) => {
        const { did, collection, rkey } = parseAtUri(uri);
        const response = await readAgent.com.atproto.repo.getRecord({
          collection,
          repo: did,
          rkey
        });
        return response.success === true;
      })
    );
    const [clusterExistence, clusterExistenceCheckError] = await tryCatch(
      clusterExistencePromise
    );
    if (clusterExistenceCheckError) {
      throw new server.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check the existence of the measured trees clusters"
      });
    }
    if (!clusterExistence.every(Boolean)) {
      throw new server.TRPCError({
        code: "BAD_REQUEST",
        message: clusterExistence.length === 1 ? "The measured trees cluster you are trying to add does not exist" : "The measured trees clusters you are trying to add do not exist"
      });
    }
    const getResponse = await readAgent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.project",
      repo: input.did,
      rkey: input.projectRkey
    });
    if (getResponse.success !== true) {
      throw new server.TRPCError({
        code: "NOT_FOUND",
        message: "Project not found"
      });
    }
    console.log("\u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F THIS ENDPOINT IS NOT IMPLEMENTED YET \u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F");
    return true;
  });
};
var removeMeasuredTreesClusterFromProjectFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      projectRkey: z8.z.string(),
      measuredTreesClusterUris: z8.z.array(z8.z.string()).min(1),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const readAgent = getReadAgent(input.pdsDomain);
    const writeAgent = await getWriteAgent(input.pdsDomain);
    if (!writeAgent.did) {
      throw new server.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const getResponse = await readAgent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.project",
      repo: input.did,
      rkey: input.projectRkey
    });
    if (getResponse.success !== true) {
      throw new server.TRPCError({
        code: "NOT_FOUND",
        message: "Project not found"
      });
    }
    console.log("\u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F THIS ENDPOINT IS NOT IMPLEMENTED YET \u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F");
    return true;
  });
};
var addLayersToProjectFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      projectRkey: z8.z.string(),
      layerUris: z8.z.array(z8.z.string()).min(1),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const readAgent = getReadAgent(input.pdsDomain);
    const writeAgent = await getWriteAgent(input.pdsDomain);
    if (!writeAgent.did) {
      throw new server.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const ownedLayerUris = input.layerUris.filter(
      (uri) => checkOwnershipByAtUri(uri, input.did)
    );
    if (ownedLayerUris.length !== input.layerUris.length) {
      throw new server.TRPCError({
        code: "BAD_REQUEST",
        message: ownedLayerUris.length === 1 ? "The layer you are trying to add is not owned by you" : "The layers you are trying to add are not owned by you"
      });
    }
    const layerExistencePromise = Promise.all(
      input.layerUris.map(async (uri) => {
        const { did, collection, rkey } = parseAtUri(uri);
        const response = await readAgent.com.atproto.repo.getRecord({
          collection,
          repo: did,
          rkey
        });
        return response.success === true;
      })
    );
    const [layerExistence, layerExistenceCheckError] = await tryCatch(
      layerExistencePromise
    );
    if (layerExistenceCheckError) {
      throw new server.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check the existence of the layers"
      });
    }
    if (!layerExistence.every(Boolean)) {
      throw new server.TRPCError({
        code: "BAD_REQUEST",
        message: layerExistence.length === 1 ? "The layer you are trying to add does not exist" : "The layers you are trying to add do not exist"
      });
    }
    const getResponse = await readAgent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.project",
      repo: input.did,
      rkey: input.projectRkey
    });
    if (getResponse.success !== true) {
      throw new server.TRPCError({
        code: "NOT_FOUND",
        message: "Project not found"
      });
    }
    console.log("\u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F THIS ENDPOINT IS NOT IMPLEMENTED YET \u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F");
    return true;
  });
};
var validateRecordOrThrow = (record, {
  validateRecord: validateRecord2
}) => {
  let validationResponse;
  try {
    validationResponse = validateRecord2(record);
  } catch (error) {
    throw new server.TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Invalid record",
      cause: error
    });
  }
  if (!validationResponse.success) {
    throw new server.TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: validationResponse.error.message,
      cause: validationResponse.error
    });
  }
  return validationResponse.value;
};
var removeLayersFromProjectFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z8.z.object({
      did: z8.z.string(),
      projectRkey: z8.z.string(),
      layerUris: z8.z.array(z8.z.string()).min(1),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const readAgent = getReadAgent(input.pdsDomain);
    const writeAgent = await getWriteAgent(input.pdsDomain);
    if (!writeAgent.did) {
      throw new server.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const getResponse = await readAgent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.project",
      repo: input.did,
      rkey: input.projectRkey
    });
    if (getResponse.success !== true) {
      throw new server.TRPCError({
        code: "NOT_FOUND",
        message: "Project not found"
      });
    }
    validateRecordOrThrow(
      getResponse.data.value,
      project_exports
    );
    console.log("\u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F THIS ENDPOINT IS NOT IMPLEMENTED YET \u26A0\uFE0F\u26A0\uFE0F\u26A0\uFE0F");
    return true;
  });
};

// src/_internal/server/routers/atproto/gainforest/organization/layer/get.ts
var COLLECTION11 = "app.gainforest.organization.layer";
var RESOURCE_NAME11 = "layer";
var getLayerPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION11,
    repo: did,
    rkey,
    validator: layer_exports,
    resourceName: RESOURCE_NAME11
  });
};
var getLayerFactory = createDidRkeyQueryFactory(getLayerPure);

// src/_internal/server/routers/atproto/hypercerts/claim/project/get.ts
var COLLECTION12 = "org.hypercerts.claim.project";
var RESOURCE_NAME12 = "project";
var getProjectPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  return getRecord({
    agent,
    collection: COLLECTION12,
    repo: did,
    rkey,
    validator: project_exports,
    resourceName: RESOURCE_NAME12
  });
};
var getProjectFactory = createDidRkeyQueryFactory(getProjectPure);

// src/_internal/server/routers/atproto/hypercerts/claim/project/getAll.ts
var COLLECTION13 = "org.hypercerts.claim.project";
var RESOURCE_NAME13 = "projects";
var getAllProjectsPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION13,
    repo: did,
    validator: project_exports,
    resourceName: RESOURCE_NAME13,
    skipInvalid: true
  });
  return result.records;
};
var getAllProjectsFactory = createDidQueryFactory(getAllProjectsPure);

// src/_internal/server/routers/atproto/gainforest/organization/layer/getAll.ts
var COLLECTION14 = "app.gainforest.organization.layer";
var RESOURCE_NAME14 = "layers";
var getAllLayersPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const result = await listRecords({
    agent,
    collection: COLLECTION14,
    repo: did,
    validator: layer_exports,
    resourceName: RESOURCE_NAME14,
    skipInvalid: true
  });
  return result.records;
};
var getAllLayersFactory = createDidQueryFactory(getAllLayersPure);

// src/_internal/server/routers/_app.ts
var AppRouterFactory = class {
  constructor(_allowedPDSDomains) {
    __publicField(this, "allowedPDSDomains");
    __publicField(this, "allowedPDSDomainSchema");
    __publicField(this, "appRouter");
    __publicField(this, "getServerCaller", () => {
      return this.appRouter.createCaller(
        async () => await createContext({ allowedPDSDomains: this.allowedPDSDomains })
      );
    });
    this.allowedPDSDomains = _allowedPDSDomains;
    this.allowedPDSDomainSchema = z8__default.default.enum(this.allowedPDSDomains);
    this.appRouter = createTRPCRouter({
      health: publicProcedure.query(() => ({ status: "ok" })),
      common: {
        uploadFileAsBlob: uploadFileAsBlobFactory(this.allowedPDSDomainSchema)
      },
      auth: {
        login: loginFactory(this.allowedPDSDomainSchema),
        resume: resumeFactory(this.allowedPDSDomainSchema),
        logout: logoutFactory(this.allowedPDSDomainSchema)
      },
      gainforest: {
        organization: {
          info: {
            get: getOrganizationInfoFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateOrganizationInfoFactory(
              this.allowedPDSDomainSchema
            )
          },
          layer: {
            get: getLayerFactory(this.allowedPDSDomainSchema),
            getAll: getAllLayersFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateLayerFactory(
              this.allowedPDSDomainSchema
            ),
            addToProject: addLayersToProjectFactory(
              this.allowedPDSDomainSchema
            ),
            removeFromProject: removeLayersFromProjectFactory(
              this.allowedPDSDomainSchema
            )
          },
          observations: {
            measuredTreesCluster: {
              get: getMeasuredTreesFactory(this.allowedPDSDomainSchema),
              addToProject: addMeasuredTreesClusterToProjectFactory(
                this.allowedPDSDomainSchema
              ),
              removeFromProject: removeMeasuredTreesClusterFromProjectFactory(
                this.allowedPDSDomainSchema
              )
            }
          }
        }
      },
      hypercerts: {
        claim: {
          activity: {
            create: createClaimActivityFactory(this.allowedPDSDomainSchema),
            getAllAcrossOrgs: getAllClaimActivitiesAcrossOrganizationsFactory(
              this.allowedPDSDomainSchema
            ),
            get: getCliamActivityFactory(this.allowedPDSDomainSchema),
            getAll: getAllClaimActivitiesFactory(this.allowedPDSDomainSchema)
          },
          project: {
            get: getProjectFactory(this.allowedPDSDomainSchema),
            getAll: getAllProjectsFactory(this.allowedPDSDomainSchema),
            createOrUpdate: createOrUpdateOrganizationInfoFactory(
              this.allowedPDSDomainSchema
            )
          }
        },
        location: {
          get: getLocationFactory(this.allowedPDSDomainSchema),
          getAll: getAllLocationsFactory(this.allowedPDSDomainSchema),
          create: createLocationFactory(this.allowedPDSDomainSchema),
          update: updateLocationFactory(this.allowedPDSDomainSchema),
          delete: deleteLocationFactory(this.allowedPDSDomainSchema),
          getDefault: getDefaultLocationFactory(this.allowedPDSDomainSchema),
          setDefault: setDefaultLocationFactory(this.allowedPDSDomainSchema)
        }
      }
    });
  }
};

// src/_internal/index.ts
var supportedDomains = ["climateai.org", "hypercerts.org"];
var supportedPDSDomainSchema = z8.z.enum(supportedDomains);
var supportedPDSDomainsSchema = z8.z.array(supportedPDSDomainSchema);
var GainforestSDK = class {
  constructor(_allowedPDSDomains) {
    __publicField(this, "allowedPDSDomains");
    __publicField(this, "appRouter");
    __publicField(this, "getServerCaller");
    __publicField(this, "utilities");
    if (!Array.isArray(_allowedPDSDomains)) {
      throw new Error("Allowed domains must be an array");
    } else if (_allowedPDSDomains.length === 0) {
      throw new Error("There should be at least one allowed domain");
    }
    if (!supportedPDSDomainsSchema.safeParse(_allowedPDSDomains).success) {
      throw new Error(
        "One of the domains is not supported. Supported domains are: " + supportedDomains.join(", ") + ". Received domains: " + JSON.stringify(_allowedPDSDomains, null, 2)
      );
    }
    this.allowedPDSDomains = _allowedPDSDomains;
    const appRouterFactory = new AppRouterFactory(this.allowedPDSDomains);
    this.appRouter = appRouterFactory.appRouter;
    this.getServerCaller = appRouterFactory.getServerCaller;
    this.utilities = {
      getBlobUrl,
      parseAtUri
    };
  }
};

// src/_public/index.ts
var sdkInternal = new GainforestSDK(["climateai.org", "hypercerts.org"]);
sdkInternal.getServerCaller();

exports.GainforestSDK = GainforestSDK;
exports.createContext = createContext;
exports.supportedPDSDomainSchema = supportedPDSDomainSchema;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map