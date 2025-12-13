"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ClimateAiSDK: () => ClimateAiSDK,
  createContext: () => createContext,
  supportedPDSDomainSchema: () => supportedPDSDomainSchema
});
module.exports = __toCommonJS(src_exports);
var import_zod21 = require("zod");

// src/utilities/getBlobUrl.ts
var import_api = require("@atproto/api");
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof import_api.BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
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
var getBlobUrl_default = getBlobUrl;

// src/utilities/parseAtUri.ts
var parseAtUri = (atUri) => {
  let cleanedAtUri = atUri.replace("at://", "");
  const splitUri = cleanedAtUri.split("/");
  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";
  return { did, collection, rkey };
};
var parseAtUri_default = parseAtUri;

// src/server/trpc.ts
var import_server = require("@trpc/server");

// src/server/session.ts
var import_headers = require("next/headers");
var import_jose = require("jose");
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function decrypt(token) {
  try {
    const { payload } = await (0, import_jose.jwtVerify)(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
async function getSessionFromRequest(service = "climateai.org") {
  const cookieStore = await (0, import_headers.cookies)();
  const encryptedSession = cookieStore.get(`${service}_session`);
  if (!encryptedSession) {
    return null;
  }
  return await decrypt(encryptedSession.value);
}

// src/utilities/transformer.ts
var import_superjson = __toESM(require("superjson"), 1);
var import_blobref = require("@/zod-schemas/blobref");
var import_isObject = require("@/lib/isObject");
var _serialize = (data) => {
  return JSON.parse(JSON.stringify(data));
};
var _deserialize = (data) => {
  const isObj = (0, import_isObject.isObject)(data);
  if (!isObj) {
    if (Array.isArray(data)) {
      return data.map(_deserialize);
    }
    return data;
  }
  if ("$type" in data && data.$type === "blob" && "ref" in data) {
    try {
      return (0, import_blobref.toBlobRef)(data);
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
    const serializedObject = import_superjson.default.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = import_superjson.default.deserialize(object);
    const deserializedObject = _deserialize(superjsonDeserialized);
    return deserializedObject;
  }
};

// src/server/trpc.ts
async function createContext(opts) {
  const session = opts?.req ? await getSessionFromRequest(opts.allowedPDSDomains[0]) : null;
  return {
    session
  };
}
var t = import_server.initTRPC.context().create({
  transformer: customTransformer
});
var createTRPCRouter = t.router;
var publicProcedure = t.procedure;
var protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new import_server.TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in"
    });
  }
  return next({ ctx });
});

// src/server/routers/atproto/common/uploadFileAsBlob.ts
var import_trpc = require("@/server/trpc");
var import_zod = __toESM(require("zod"), 1);
var import_agent = require("@/server/utils/agent");
var import_file = require("@/zod-schemas/file");
var import_server2 = require("@trpc/server");
var uploadFileAsBlobPure = async (file2, agent) => {
  let fileToUpload;
  if (file2 instanceof File) {
    fileToUpload = file2;
  } else {
    fileToUpload = await (0, import_file.toFile)(file2);
  }
  const response = await agent.uploadBlob(fileToUpload);
  if (response.success !== true) {
    throw new import_server2.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file as blob."
    });
  }
  return response.data;
};
var uploadFileAsBlobFactory = (allowedPDSDomainSchema) => {
  return import_trpc.protectedProcedure.input(
    import_zod.default.object({
      file: import_file.FileGeneratorSchema,
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent.getWriteAgent)(input.pdsDomain);
    const response = await uploadFileAsBlobPure(input.file, agent);
    return response;
  });
};

// src/server/routers/atproto/auth/login.ts
var import_session2 = require("@/server/session");
var import_trpc2 = require("@/server/trpc");
var import_api2 = require("@atproto/api");
var import_server3 = require("@trpc/server");
var import_zod2 = __toESM(require("zod"), 1);
var loginFactory = (allowedPDSDomainSchema) => {
  return import_trpc2.publicProcedure.input(
    import_zod2.default.object({
      handlePrefix: import_zod2.default.string().regex(/^^[a-zA-Z0-9-]+$/),
      // alphanumerics and hyphens only
      service: allowedPDSDomainSchema,
      password: import_zod2.default.string()
    })
  ).mutation(async ({ input }) => {
    const session = new import_api2.CredentialSession(
      new URL(`https://${input.service}`)
    );
    const result = await session.login({
      identifier: `${input.handlePrefix}.${input.service}`,
      password: input.password
    });
    if (!result.success) {
      throw new import_server3.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Login failed"
      });
    }
    const context = {
      accessJwt: result.data.accessJwt,
      refreshJwt: result.data.refreshJwt,
      did: result.data.did,
      handle: result.data.handle
    };
    await (0, import_session2.saveSession)(context, input.service);
    return {
      context,
      service: input.service
    };
  });
};

// src/server/routers/atproto/auth/resume.ts
var import_session3 = require("@/server/session");
var import_trpc3 = require("@/server/trpc");
var import_server4 = require("@trpc/server");
var import_zod3 = __toESM(require("zod"), 1);
var resumeFactory = (allowedPDSDomainSchema) => {
  return import_trpc3.publicProcedure.input(
    import_zod3.default.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const session = await (0, import_session3.getSessionFromRequest)(input.service);
    if (!session) {
      throw new import_server4.TRPCError({
        code: "UNAUTHORIZED",
        message: "No session found"
      });
    }
    return {
      context: session,
      service: input.service
    };
  });
};

// src/server/routers/atproto/auth/logout.ts
var import_session4 = require("@/server/session");
var import_trpc4 = require("@/server/trpc");
var import_zod4 = __toESM(require("zod"), 1);
var logoutFactory = (allowedPDSDomainSchema) => {
  return import_trpc4.publicProcedure.input(
    import_zod4.default.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    await (0, import_session4.clearSession)(input.service);
    return {
      success: true
    };
  });
};

// src/server/routers/atproto/gainforest/organizationInfo/get.ts
var import_trpc5 = require("@/server/trpc");
var import_zod5 = require("zod");
var import_tryCatch = require("@/lib/tryCatch");
var import_xrpc = require("@atproto/xrpc");
var import_lex_api = require("@/../lex-api");
var import_agent2 = require("@/server/utils/agent");
var import_classify_xrpc_error = require("@/server/utils/classify-xrpc-error");
var import_server5 = require("@trpc/server");
var import_validate_record_or_throw = require("@/server/utils/validate-record-or-throw");
var getOrganizationInfoPure = async (did, pdsDomain) => {
  const agent = (0, import_agent2.getReadAgent)(pdsDomain);
  console.log("TEMP DEBUG LOG:", JSON.stringify({ did, pdsDomain }));
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.gainforest.organization.info",
    repo: did,
    rkey: "self"
  });
  const [response, error] = await (0, import_tryCatch.tryCatch)(getRecordPromise);
  if (error) {
    if (error instanceof import_xrpc.XRPCError) {
      const trpcError = (0, import_classify_xrpc_error.xrpcErrorToTRPCError)(error);
      throw trpcError;
    } else {
      console.error("getOrganizationInfo error:", error);
      throw new import_server5.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    console.error("getOrganizationInfo error: response.success is not true");
    throw new import_server5.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  (0, import_validate_record_or_throw.validateRecordOrThrow)(response.data.value, import_lex_api.AppGainforestOrganizationInfo);
  return response.data;
};
var getOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return import_trpc5.publicProcedure.input(import_zod5.z.object({ did: import_zod5.z.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    return await getOrganizationInfoPure(input.did, input.pdsDomain);
  });
};

// src/server/routers/atproto/gainforest/site/get.ts
var import_trpc6 = require("@/server/trpc");
var import_zod6 = require("zod");
var import_agent3 = require("@/server/utils/agent");
var import_lex_api2 = require("@/../lex-api");
var import_validate_record_or_throw2 = require("@/server/utils/validate-record-or-throw");
var getSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc6.publicProcedure.input(
    import_zod6.z.object({
      did: import_zod6.z.string(),
      rkey: import_zod6.z.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = (0, import_agent3.getReadAgent)(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.site",
      repo: input.did,
      rkey: input.rkey
    });
    if (response.success !== true) {
      throw new Error("Failed to get the site.");
    }
    (0, import_validate_record_or_throw2.validateRecordOrThrow)(response.data.value, import_lex_api2.AppGainforestOrganizationSite);
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/site/getDefault.ts
var import_trpc7 = require("@/server/trpc");
var import_zod7 = __toESM(require("zod"), 1);
var import_lex_api3 = require("@/../lex-api");
var import_agent4 = require("@/server/utils/agent");
var import_validate_record_or_throw3 = require("@/server/utils/validate-record-or-throw");
var getDefaultProjectSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc7.publicProcedure.input(
    import_zod7.default.object({
      did: import_zod7.default.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = (0, import_agent4.getReadAgent)(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.defaultSite",
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get default project site");
    }
    (0, import_validate_record_or_throw3.validateRecordOrThrow)(
      response.data.value,
      import_lex_api3.AppGainforestOrganizationDefaultSite
    );
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/measuredTrees/get.ts
var import_trpc8 = require("@/server/trpc");
var import_zod8 = __toESM(require("zod"), 1);
var import_lex_api4 = require("@/../lex-api");
var import_agent5 = require("@/server/utils/agent");
var import_validate_record_or_throw4 = require("@/server/utils/validate-record-or-throw");
var getMeasuredTreesFactory = (allowedPDSDomainSchema) => {
  return import_trpc8.publicProcedure.input(
    import_zod8.default.object({
      did: import_zod8.default.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = (0, import_agent5.getReadAgent)(input.pdsDomain);
    const nsid = "app.gainforest.organization.observations.measuredTreesCluster";
    const response = await agent.com.atproto.repo.getRecord({
      collection: nsid,
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get measured trees");
    }
    (0, import_validate_record_or_throw4.validateRecordOrThrow)(response.data.value, import_lex_api4.AppGainforestOrganizationObservationsMeasuredTreesCluster);
    return response.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/create.ts
var import_trpc9 = require("@/server/trpc");
var import_zod9 = __toESM(require("zod"), 1);
var import_server6 = require("@trpc/server");
var import_lex_api5 = require("@/../lex-api");
var import_blobref2 = require("@/zod-schemas/blobref");
var import_file2 = require("@/zod-schemas/file");
var import_agent6 = require("@/server/utils/agent");
var import_validate_record_or_throw5 = require("@/server/utils/validate-record-or-throw");
var uploadFile = async (fileGenerator, agent) => {
  const file2 = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file2);
  return (0, import_blobref2.toBlobRefGenerator)(response.data.blob);
};
var createClaimActivityFactory = (allowedPDSDomainSchema) => {
  return import_trpc9.protectedProcedure.input(
    import_zod9.default.object({
      activity: import_zod9.default.object({
        title: import_zod9.default.string(),
        shortDescription: import_zod9.default.string(),
        description: import_zod9.default.string().optional(),
        workScopes: import_zod9.default.array(import_zod9.default.string()),
        startDate: import_zod9.default.string(),
        endDate: import_zod9.default.string()
      }),
      uploads: import_zod9.default.object({
        image: import_file2.FileGeneratorSchema,
        contributors: import_zod9.default.array(import_zod9.default.string()).refine((v) => v.length > 0, {
          message: "At least one contribution is required"
        }),
        siteAtUri: import_zod9.default.string()
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent6.getWriteAgent)(input.pdsDomain);
    const did = agent.did;
    if (!did) {
      throw new import_server6.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform this action."
      });
    }
    const locationNSID = "app.certified.location";
    const location = {
      $type: locationNSID,
      lpVersion: "1.0.0",
      srs: "https://epsg.io/3857",
      locationType: "geojson",
      location: {
        $type: "org.hypercerts.defs#uri",
        uri: input.uploads.siteAtUri
      },
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const validatedLocation = (0, import_validate_record_or_throw5.validateRecordOrThrow)(
      location,
      import_lex_api5.AppCertifiedLocation
    );
    const activityNSID = "org.hypercerts.claim.activity";
    const activity = {
      $type: activityNSID,
      title: input.activity.title,
      shortDescription: input.activity.shortDescription,
      description: input.activity.description,
      // These will be set after the records are created:
      image: void 0,
      location: void 0,
      contributions: void 0,
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      workScope: {
        $type: "org.hypercerts.claim.activity#workScope",
        anyOf: input.activity.workScopes
      },
      startDate: input.activity.startDate,
      endDate: input.activity.endDate,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const validatedActivity = (0, import_validate_record_or_throw5.validateRecordOrThrow)(
      activity,
      import_lex_api5.OrgHypercertsClaimActivity
    );
    const contributionNSID = "org.hypercerts.claim.contribution";
    const contribution = {
      $type: "org.hypercerts.claim.contribution",
      // Use dummy hypercert reference for now because the activity record is not yet created:
      hypercert: {
        $type: "com.atproto.repo.strongRef",
        uri: `at://${did}/org.hypercerts.claim.activity/0`,
        cid: "bafkreifj2t4px2uizj25ml53axem47yfhpgsx72ekjrm2qyymcn5ifz744"
      },
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      role: "Contributor",
      contributors: input.uploads.contributors,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const validatedContribution = (0, import_validate_record_or_throw5.validateRecordOrThrow)(
      contribution,
      import_lex_api5.OrgHypercertsClaimContribution
    );
    const locationWriteResponse = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: locationNSID,
      record: validatedLocation
    });
    if (locationWriteResponse.success !== true) {
      throw new import_server6.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to write location record"
      });
    }
    const imageBlobRef = await uploadFile(input.uploads.image, agent);
    const activityResponse = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: activityNSID,
      record: {
        ...validatedActivity,
        image: {
          $type: "org.hypercerts.defs#smallImage",
          image: (0, import_blobref2.toBlobRef)(imageBlobRef)
        },
        location: {
          $type: "com.atproto.repo.strongRef",
          uri: locationWriteResponse.data.uri,
          cid: locationWriteResponse.data.cid
        }
      }
    });
    if (activityResponse.success !== true) {
      throw new import_server6.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to write activity record"
      });
    }
    const contributionWriteResponse = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: contributionNSID,
      record: {
        ...validatedContribution,
        hypercert: {
          $type: "com.atproto.repo.strongRef",
          uri: activityResponse.data.uri,
          cid: activityResponse.data.cid
        }
      }
    });
    if (contributionWriteResponse.success !== true) {
      throw new import_server6.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to write contribution record"
      });
    }
    return activityResponse;
  });
};

// src/server/routers/atproto/gainforest/organizationInfo/createOrUpdate.ts
var import_trpc10 = require("@/server/trpc");
var import_zod10 = __toESM(require("zod"), 1);
var import_lex_api6 = require("@/../lex-api");
var import_server7 = require("@trpc/server");
var import_agent7 = require("@/server/utils/agent");
var import_file3 = require("@/zod-schemas/file");
var import_blobref3 = require("@/zod-schemas/blobref");
var import_validate_record_or_throw6 = require("@/server/utils/validate-record-or-throw");
var createOrUpdateOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return import_trpc10.protectedProcedure.input(
    import_zod10.default.object({
      did: import_zod10.default.string(),
      info: import_zod10.default.object({
        displayName: import_zod10.default.string(),
        shortDescription: import_zod10.default.string(),
        longDescription: import_zod10.default.string(),
        website: import_zod10.default.string().optional(),
        logo: import_blobref3.BlobRefGeneratorSchema.optional(),
        coverImage: import_blobref3.BlobRefGeneratorSchema.optional(),
        objectives: import_zod10.default.array(
          import_zod10.default.enum([
            "Conservation",
            "Research",
            "Education",
            "Community",
            "Other"
          ])
        ),
        startDate: import_zod10.default.string().optional(),
        country: import_zod10.default.string(),
        visibility: import_zod10.default.enum(["Public", "Hidden"])
      }),
      uploads: import_zod10.default.object({
        logo: import_file3.FileGeneratorSchema.optional(),
        coverImage: import_file3.FileGeneratorSchema.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent7.getWriteAgent)(input.pdsDomain);
    const logoBlob = input.uploads?.logo ? (await uploadFileAsBlobPure(input.uploads.logo, agent)).blob : input.info.logo ? (0, import_blobref3.toBlobRef)(input.info.logo) : void 0;
    const coverImageBlob = input.uploads?.coverImage ? (await uploadFileAsBlobPure(input.uploads.coverImage, agent)).blob : input.info.coverImage ? (0, import_blobref3.toBlobRef)(input.info.coverImage) : void 0;
    const info = {
      $type: "app.gainforest.organization.info",
      displayName: input.info.displayName,
      shortDescription: input.info.shortDescription,
      longDescription: input.info.longDescription,
      website: input.info.website ? input.info.website : void 0,
      logo: logoBlob ? {
        $type: "app.gainforest.common.defs#smallImage",
        image: logoBlob
      } : void 0,
      coverImage: coverImageBlob ? {
        $type: "app.gainforest.common.defs#smallImage",
        image: coverImageBlob
      } : void 0,
      objectives: input.info.objectives,
      startDate: input.info.startDate ? input.info.startDate : void 0,
      country: input.info.country,
      visibility: input.info.visibility,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    (0, import_validate_record_or_throw6.validateRecordOrThrow)(info, import_lex_api6.AppGainforestOrganizationInfo);
    const response = await agent.com.atproto.repo.putRecord({
      repo: input.did,
      collection: "app.gainforest.organization.info",
      record: info,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new import_server7.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update organization info"
      });
    }
    return {
      ...response.data,
      value: info
    };
  });
};

// src/server/routers/atproto/gainforest/site/getAll.ts
var import_trpc11 = require("@/server/trpc");
var import_zod11 = require("zod");
var import_server8 = require("@trpc/server");
var import_lex_api7 = require("@/../lex-api");
var import_tryCatch2 = require("@/lib/tryCatch");
var import_xrpc2 = require("@atproto/xrpc");
var import_agent8 = require("@/server/utils/agent");
var import_classify_xrpc_error2 = require("@/server/utils/classify-xrpc-error");
var import_validate_record_or_throw7 = require("@/server/utils/validate-record-or-throw");
var getAllSitesFactory = (allowedPDSDomainSchema) => {
  return import_trpc11.publicProcedure.input(import_zod11.z.object({ did: import_zod11.z.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = (0, import_agent8.getReadAgent)(input.pdsDomain);
    const listSitesTryCatchPromise = (0, import_tryCatch2.tryCatch)(
      agent.com.atproto.repo.listRecords({
        collection: "app.gainforest.organization.site",
        repo: input.did
      })
    );
    const getDefaultSiteTryCatchPromise = (0, import_tryCatch2.tryCatch)(
      agent.com.atproto.repo.getRecord({
        collection: "app.gainforest.organization.defaultSite",
        repo: input.did,
        rkey: "self"
      })
    );
    const [
      [listSitesResponse, errorListSites],
      [getDefaultSiteResponse, errorGetDefaultSite]
    ] = await Promise.all([
      listSitesTryCatchPromise,
      getDefaultSiteTryCatchPromise
    ]);
    if (errorListSites) {
      if (errorListSites instanceof import_xrpc2.XRPCError) {
        const trpcError = (0, import_classify_xrpc_error2.xrpcErrorToTRPCError)(errorListSites);
        throw trpcError;
      }
      throw new import_server8.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    } else if (listSitesResponse.success !== true) {
      throw new import_server8.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
    const validRecords = listSitesResponse.data.records.map((record) => {
      const result = import_lex_api7.AppGainforestOrganizationSite.validateRecord(
        record.value
      );
      if (result.success) return record;
      return null;
    }).filter(
      (record) => record !== null
    );
    let defaultSite = null;
    if (getDefaultSiteResponse) {
      defaultSite = getDefaultSiteResponse.data;
      try {
        (0, import_validate_record_or_throw7.validateRecordOrThrow)(
          defaultSite.value,
          import_lex_api7.AppGainforestOrganizationDefaultSite
        );
      } catch {
        defaultSite = null;
      }
    }
    return {
      sites: validRecords,
      defaultSite
    };
  });
};

// src/server/routers/atproto/gainforest/site/create.ts
var import_trpc12 = require("@/server/trpc");
var import_zod12 = require("zod");
var import_agent9 = require("@/server/utils/agent");
var import_lex_api8 = require("@/../lex-api");
var import_file4 = require("@/zod-schemas/file");
var import_server10 = require("@trpc/server");

// src/server/routers/atproto/gainforest/site/utils.ts
var import_server9 = require("@trpc/server");
var import_validate2 = require("@/lib/geojson/validate");
var import_tryCatch3 = require("@/lib/tryCatch");
var import_computations = require("@/lib/geojson/computations");
async function fetchGeojsonFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new import_server9.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch site"
    });
  }
  const blob = await response.blob();
  if (blob.type !== "application/geo+json") {
    throw new import_server9.TRPCError({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const file2 = new File([blob], "site.geojson", {
    type: blob.type
  });
  return file2;
}
async function computeGeojsonFile(file2) {
  if (file2.type !== "application/geo+json") {
    throw new import_server9.TRPCError({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const geojsonText = await file2.text();
  const geojson = JSON.parse(geojsonText);
  const [validatedGeojsonObject, geojsonValidationError] = await (0, import_tryCatch3.tryCatch)(
    new Promise((r) => r((0, import_validate2.validateGeojsonOrThrow)(geojson)))
  );
  if (geojsonValidationError) {
    throw new import_server9.TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid GeoJSON file: " + geojsonValidationError.message
    });
  }
  const polygonMetrics = (0, import_computations.computePolygonMetrics)(validatedGeojsonObject);
  const lat = polygonMetrics.centroid?.lat;
  const lon = polygonMetrics.centroid?.lon;
  const area = polygonMetrics.areaHectares;
  if (!lat || !lon || !area) {
    throw new import_server9.TRPCError({
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

// src/server/routers/atproto/gainforest/site/create.ts
var createSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc12.protectedProcedure.input(
    import_zod12.z.object({
      rkey: import_zod12.z.string().optional(),
      site: import_zod12.z.object({
        name: import_zod12.z.string().min(1)
      }),
      uploads: import_zod12.z.object({
        shapefile: import_zod12.z.union([import_zod12.z.url(), import_file4.FileGeneratorSchema])
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent9.getWriteAgent)(input.pdsDomain);
    if (!agent.did) {
      throw new import_server10.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const file2 = typeof input.uploads.shapefile === "string" ? await fetchGeojsonFromUrl(input.uploads.shapefile) : await (0, import_file4.toFile)(input.uploads.shapefile);
    const { lat, lon, area } = await computeGeojsonFile(file2);
    const geojsonUploadResponse = await agent.uploadBlob(file2);
    const geojsonBlobRef = geojsonUploadResponse.data.blob;
    const nsid = "app.gainforest.organization.site";
    const site = {
      $type: nsid,
      name: input.site.name,
      lat,
      lon,
      area,
      shapefile: {
        $type: "app.gainforest.common.defs#smallBlob",
        blob: geojsonBlobRef
      },
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const validationResult = import_lex_api8.AppGainforestOrganizationSite.validateRecord(site);
    if (!validationResult.success) {
      throw new import_server10.TRPCError({
        code: "BAD_REQUEST",
        message: validationResult.error.message
      });
    }
    const creationResponse = await agent.com.atproto.repo.createRecord({
      collection: nsid,
      repo: agent.did,
      record: site,
      rkey: input.rkey
    });
    if (creationResponse.success !== true) {
      throw new import_server10.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add new site"
      });
    }
    return creationResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/update.ts
var import_trpc13 = require("@/server/trpc");
var import_zod13 = require("zod");
var import_agent10 = require("@/server/utils/agent");
var import_lex_api9 = require("@/../lex-api");
var import_blobref4 = require("@/zod-schemas/blobref");
var import_file5 = require("@/zod-schemas/file");
var import_server11 = require("@trpc/server");
var updateSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc13.protectedProcedure.input(
    import_zod13.z.object({
      rkey: import_zod13.z.string(),
      site: import_zod13.z.object({
        name: import_zod13.z.string().min(1),
        shapefile: import_zod13.z.object({
          $type: import_zod13.z.literal("app.gainforest.common.defs#smallBlob"),
          blob: import_blobref4.BlobRefGeneratorSchema
        }).optional(),
        lat: import_zod13.z.string(),
        lon: import_zod13.z.string(),
        area: import_zod13.z.string()
      }),
      uploads: import_zod13.z.object({
        shapefile: import_file5.FileGeneratorSchema.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent10.getWriteAgent)(input.pdsDomain);
    if (!agent.did) {
      throw new import_server11.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    let file2 = null;
    if (input.uploads) {
      if (input.uploads.shapefile === void 0) {
        file2 = null;
      } else {
        file2 = await (0, import_file5.toFile)(input.uploads.shapefile);
      }
    }
    let lat;
    let lon;
    let area;
    let shapefile;
    if (file2 !== null) {
      const computed = await computeGeojsonFile(file2);
      const geojsonUploadResponse = await agent.uploadBlob(file2);
      shapefile = {
        $type: "app.gainforest.common.defs#smallBlob",
        blob: geojsonUploadResponse.data.blob
      };
      lat = computed.lat;
      lon = computed.lon;
      area = computed.area;
    } else if (input.site.shapefile) {
      shapefile = {
        $type: "app.gainforest.common.defs#smallBlob",
        blob: (0, import_blobref4.toBlobRef)(input.site.shapefile.blob)
      };
      lat = input.site.lat;
      lon = input.site.lon;
      area = input.site.area;
    } else {
      throw new import_server11.TRPCError({
        code: "BAD_REQUEST",
        message: "No shapefile provided"
      });
    }
    const nsid = "app.gainforest.organization.site";
    const site = {
      $type: nsid,
      name: input.site.name,
      lat,
      lon,
      area,
      shapefile,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const validationResult = import_lex_api9.AppGainforestOrganizationSite.validateRecord(site);
    if (!validationResult.success) {
      throw new import_server11.TRPCError({
        code: "BAD_REQUEST",
        message: validationResult.error.message
      });
    }
    const updateResponse = await agent.com.atproto.repo.putRecord({
      collection: nsid,
      repo: agent.did,
      record: site,
      rkey: input.rkey
    });
    if (updateResponse.success !== true) {
      throw new import_server11.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update site"
      });
    }
    return updateResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/setDefault.ts
var import_trpc14 = require("@/server/trpc");
var import_zod14 = __toESM(require("zod"), 1);
var import_lex_api10 = require("@/../lex-api");
var import_agent11 = require("@/server/utils/agent");
var import_server12 = require("@trpc/server");
var import_parseAtUri2 = __toESM(require("@/utilities/parseAtUri"), 1);
var import_validate_record_or_throw8 = require("@/server/utils/validate-record-or-throw");
var setDefaultSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc14.protectedProcedure.input(
    import_zod14.default.object({
      siteAtUri: import_zod14.default.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent11.getWriteAgent)(input.pdsDomain);
    if (!agent.did) {
      throw new import_server12.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const siteUri = input.siteAtUri;
    const siteNSID = "app.gainforest.organization.site";
    if (!(siteUri.startsWith(`at://`) && siteUri.includes(siteNSID))) {
      throw new import_server12.TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid site URI"
      });
    }
    const site = await agent.com.atproto.repo.getRecord({
      collection: siteNSID,
      repo: agent.did,
      rkey: (0, import_parseAtUri2.default)(siteUri).rkey
    });
    if (site.success !== true) {
      throw new import_server12.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get site"
      });
    }
    const defaultSiteNSID = "app.gainforest.organization.defaultSite";
    const defaultSite = {
      $type: defaultSiteNSID,
      site: siteUri,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    (0, import_validate_record_or_throw8.validateRecordOrThrow)(defaultSite, import_lex_api10.AppGainforestOrganizationDefaultSite);
    const updateDefaultSiteResponse = await agent.com.atproto.repo.putRecord({
      collection: defaultSiteNSID,
      repo: agent.did,
      rkey: "self",
      record: defaultSite
    });
    if (updateDefaultSiteResponse.success !== true) {
      throw new import_server12.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update default site"
      });
    }
    return updateDefaultSiteResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/delete.ts
var import_lex_api11 = require("@/../lex-api");
var import_trpc15 = require("@/server/trpc");
var import_agent12 = require("@/server/utils/agent");
var import_server13 = require("@trpc/server");
var import_zod15 = __toESM(require("zod"), 1);
var import_validate_record_or_throw9 = require("@/server/utils/validate-record-or-throw");
var import_utilities = require("@/utilities");
var deleteSiteFactory = (allowedPDSDomainSchema) => {
  return import_trpc15.protectedProcedure.input(
    import_zod15.default.object({ siteAtUri: import_zod15.default.string(), pdsDomain: allowedPDSDomainSchema })
  ).mutation(async ({ input }) => {
    const agent = await (0, import_agent12.getWriteAgent)(input.pdsDomain);
    if (!agent.did) {
      throw new import_server13.TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    try {
      const defaultSiteNSID = "app.gainforest.organization.defaultSite";
      const defaultSiteResponse = await agent.com.atproto.repo.getRecord({
        collection: defaultSiteNSID,
        repo: agent.did,
        rkey: "self"
      });
      if (defaultSiteResponse.success !== true)
        throw Error("Failed to get default site");
      (0, import_validate_record_or_throw9.validateRecordOrThrow)(
        defaultSiteResponse.data.value,
        import_lex_api11.AppGainforestOrganizationDefaultSite
      );
      const defaultSite = defaultSiteResponse.data.value;
      if (defaultSite.site === input.siteAtUri) throw new Error("Equal");
    } catch (error) {
      if (error instanceof Error && error.message === "Equal") {
        throw new import_server13.TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete default site"
        });
      }
    }
    const deletionResponse = await agent.com.atproto.repo.deleteRecord({
      collection: "app.gainforest.organization.site",
      repo: agent.did,
      rkey: (0, import_utilities.parseAtUri)(input.siteAtUri).rkey
    });
    if (deletionResponse.success !== true)
      throw new import_server13.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete site"
      });
    return deletionResponse.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs.ts
var import_tryCatch5 = require("@/lib/tryCatch");
var import_trpc17 = require("@/server/trpc");
var import_agent14 = require("@/server/utils/agent");
var import_zod17 = require("zod");
var import_server15 = require("@trpc/server");

// src/server/routers/atproto/hypercerts/claim/activity/getAll.ts
var import_trpc16 = require("@/server/trpc");
var import_zod16 = require("zod");
var import_server14 = require("@trpc/server");
var import_lex_api12 = require("@/../lex-api");
var import_tryCatch4 = require("@/lib/tryCatch");
var import_xrpc3 = require("@atproto/xrpc");
var import_agent13 = require("@/server/utils/agent");
var import_classify_xrpc_error3 = require("@/server/utils/classify-xrpc-error");
var import_validate_record_or_throw10 = require("@/server/utils/validate-record-or-throw");
var getAllClaimActivitiesPure = async (did, pdsDomain) => {
  const activityNSID = "org.hypercerts.claim.activity";
  const agent = (0, import_agent13.getReadAgent)(pdsDomain);
  const [listClaimActivitiesResponse, errorListClaimActivities] = await (0, import_tryCatch4.tryCatch)(
    agent.com.atproto.repo.listRecords({
      collection: activityNSID,
      repo: did
    })
  );
  if (errorListClaimActivities) {
    if (errorListClaimActivities instanceof import_xrpc3.XRPCError) {
      const trpcError = (0, import_classify_xrpc_error3.xrpcErrorToTRPCError)(errorListClaimActivities);
      throw trpcError;
    }
    throw new import_server14.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  } else if (listClaimActivitiesResponse.success !== true) {
    throw new import_server14.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  }
  const validRecords = listClaimActivitiesResponse.data.records.map((record) => {
    try {
      (0, import_validate_record_or_throw10.validateRecordOrThrow)(record.value, import_lex_api12.OrgHypercertsClaimActivity);
      return record;
    } catch {
      return null;
    }
  }).filter(
    (record) => record !== null
  );
  return {
    activities: validRecords
  };
};

// src/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs.ts
var getAllClaimActivitiesAcrossOrganizationsFactory = (allowedPDSDomainSchema) => {
  return import_trpc17.publicProcedure.input(import_zod17.z.object({ pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = (0, import_agent14.getReadAgent)(input.pdsDomain);
    const [repositoriesListResponse, repositoriesListFetchError] = await (0, import_tryCatch5.tryCatch)(
      agent.com.atproto.sync.listRepos({
        limit: 100
      })
    );
    if (repositoriesListFetchError || repositoriesListResponse.success !== true) {
      throw new import_server15.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch repositories list"
      });
    }
    const repositoriesList = repositoriesListResponse.data.repos;
    const [organizationRepositories, organizationsFetchError] = await (0, import_tryCatch5.tryCatch)(
      Promise.all(
        repositoriesList.map(async (repo) => {
          const [organizationInfoResponse, organizationInfoFetchError] = await (0, import_tryCatch5.tryCatch)(
            getOrganizationInfoPure(repo.did, input.pdsDomain)
          );
          if (organizationInfoFetchError) {
            return null;
          }
          return {
            repo,
            organizationInfo: organizationInfoResponse.value
          };
        })
      )
    );
    if (organizationsFetchError) {
      throw new import_server15.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch organizations list"
      });
    }
    const validOrganizationRepositories = organizationRepositories.filter(
      (org) => org !== null
    );
    const [activities, activitiesFetchError] = await (0, import_tryCatch5.tryCatch)(
      Promise.all(
        validOrganizationRepositories.map(async (organization) => {
          const [activitiesResponse, activitiesFetchError2] = await (0, import_tryCatch5.tryCatch)(
            getAllClaimActivitiesPure(organization.repo.did, input.pdsDomain)
          );
          if (activitiesFetchError2) {
            return null;
          }
          return {
            repo: organization.repo,
            activities: activitiesResponse.activities,
            organizationInfo: organization.organizationInfo
          };
        })
      )
    );
    if (activitiesFetchError) {
      throw new import_server15.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch activities list"
      });
    }
    const validActivities = activities.filter(
      (activity) => activity !== null
    );
    return validActivities;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/get.ts
var import_trpc18 = require("@/server/trpc");
var import_zod18 = require("zod");
var import_tryCatch6 = require("@/lib/tryCatch");
var import_xrpc4 = require("@atproto/xrpc");
var import_lex_api13 = require("@/../lex-api");
var import_agent15 = require("@/server/utils/agent");
var import_classify_xrpc_error4 = require("@/server/utils/classify-xrpc-error");
var import_server16 = require("@trpc/server");
var import_validate_record_or_throw11 = require("@/server/utils/validate-record-or-throw");
var getClaimActivityPure = async (did, rkey, pdsDomain) => {
  const agent = (0, import_agent15.getReadAgent)(pdsDomain);
  const nsid = "org.hypercerts.claim.activity";
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: nsid,
    repo: did,
    rkey
  });
  const [response, error] = await (0, import_tryCatch6.tryCatch)(getRecordPromise);
  if (error) {
    if (error instanceof import_xrpc4.XRPCError) {
      const trpcError = (0, import_classify_xrpc_error4.xrpcErrorToTRPCError)(error);
      throw trpcError;
    } else {
      throw new import_server16.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new import_server16.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  (0, import_validate_record_or_throw11.validateRecordOrThrow)(response.data.value, import_lex_api13.OrgHypercertsClaimActivity);
  return response.data;
};
var getCliamActivityFactory = (allowedPDSDomainSchema) => {
  return import_trpc18.publicProcedure.input(
    import_zod18.z.object({
      did: import_zod18.z.string(),
      rkey: import_zod18.z.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    return await getClaimActivityPure(input.did, input.rkey, input.pdsDomain);
  });
};

// src/server/routers/atproto/hypercerts/location/get.ts
var import_trpc19 = require("@/server/trpc");
var import_zod19 = require("zod");
var import_tryCatch7 = require("@/lib/tryCatch");
var import_xrpc5 = require("@atproto/xrpc");
var import_lex_api14 = require("@/../lex-api");
var import_agent16 = require("@/server/utils/agent");
var import_classify_xrpc_error5 = require("@/server/utils/classify-xrpc-error");
var import_server17 = require("@trpc/server");
var import_validate_record_or_throw12 = require("@/server/utils/validate-record-or-throw");
var getCertifiedLocationPure = async (did, rkey, pdsDomain) => {
  const agent = (0, import_agent16.getReadAgent)(pdsDomain);
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.certified.location",
    repo: did,
    rkey
  });
  const [response, error] = await (0, import_tryCatch7.tryCatch)(getRecordPromise);
  if (error) {
    if (error instanceof import_xrpc5.XRPCError) {
      const trpcError = (0, import_classify_xrpc_error5.xrpcErrorToTRPCError)(error);
      throw trpcError;
    } else {
      throw new import_server17.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new import_server17.TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  (0, import_validate_record_or_throw12.validateRecordOrThrow)(response.data.value, import_lex_api14.AppCertifiedLocation);
  return response.data;
};
var getCertifiedLocationFactory = (allowedPDSDomainSchema) => {
  return import_trpc19.publicProcedure.input(
    import_zod19.z.object({
      did: import_zod19.z.string(),
      rkey: import_zod19.z.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    return await getCertifiedLocationPure(
      input.did,
      input.rkey,
      input.pdsDomain
    );
  });
};

// src/server/routers/_app.ts
var import_zod20 = __toESM(require("zod"), 1);
var AppRouterFactory = class {
  allowedPDSDomains;
  allowedPDSDomainSchema;
  appRouter;
  constructor(_allowedPDSDomains) {
    this.allowedPDSDomains = _allowedPDSDomains;
    this.allowedPDSDomainSchema = import_zod20.default.enum(this.allowedPDSDomains);
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
          site: {
            get: getSiteFactory(this.allowedPDSDomainSchema),
            getAll: getAllSitesFactory(this.allowedPDSDomainSchema),
            create: createSiteFactory(this.allowedPDSDomainSchema),
            update: updateSiteFactory(this.allowedPDSDomainSchema),
            delete: deleteSiteFactory(this.allowedPDSDomainSchema),
            getDefault: getDefaultProjectSiteFactory(
              this.allowedPDSDomainSchema
            ),
            setDefault: setDefaultSiteFactory(this.allowedPDSDomainSchema)
          },
          measuredTrees: {
            get: getMeasuredTreesFactory(this.allowedPDSDomainSchema)
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
            get: getCliamActivityFactory(this.allowedPDSDomainSchema)
          }
        },
        location: {
          get: getCertifiedLocationFactory(this.allowedPDSDomainSchema)
        }
      }
    });
  }
  getServerCaller = () => {
    return this.appRouter.createCaller(
      async () => await createContext({ allowedPDSDomains: this.allowedPDSDomains })
    );
  };
};

// src/index.ts
var supportedDomains = ["climateai.org", "hypercerts.org"];
var supportedPDSDomainSchema = import_zod21.z.enum(supportedDomains);
var supportedPDSDomainsSchema = import_zod21.z.array(supportedPDSDomainSchema);
var ClimateAiSDK = class {
  allowedPDSDomains;
  appRouter;
  getServerCaller;
  utilities;
  constructor(_allowedPDSDomains) {
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
      getBlobUrl: getBlobUrl_default,
      parseAtUri: parseAtUri_default
    };
  }
};
//# sourceMappingURL=index.cjs.map