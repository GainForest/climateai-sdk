// src/index.ts
import { z as z21 } from "zod";

// src/utilities/getBlobUrl.ts
import { BlobRef } from "@atproto/api";
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
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
import { initTRPC, TRPCError } from "@trpc/server";

// src/server/session.ts
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
async function getSessionFromRequest(service = "climateai.org") {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get(`${service}_session`);
  if (!encryptedSession) {
    return null;
  }
  return await decrypt(encryptedSession.value);
}

// src/utilities/transformer.ts
import superjson from "superjson";
import { toBlobRef } from "@/zod-schemas/blobref";
import { isObject } from "@/lib/isObject";
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
    const serializedObject = superjson.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = superjson.deserialize(object);
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
var t = initTRPC.context().create({
  transformer: customTransformer
});
var createTRPCRouter = t.router;
var publicProcedure = t.procedure;
var protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in"
    });
  }
  return next({ ctx });
});

// src/server/routers/atproto/common/uploadFileAsBlob.ts
import { protectedProcedure as protectedProcedure2 } from "@/server/trpc";
import z from "zod";
import { getWriteAgent } from "@/server/utils/agent";
import {
  FileGeneratorSchema,
  toFile
} from "@/zod-schemas/file";
import { TRPCError as TRPCError2 } from "@trpc/server";
var uploadFileAsBlobPure = async (file2, agent) => {
  let fileToUpload;
  if (file2 instanceof File) {
    fileToUpload = file2;
  } else {
    fileToUpload = await toFile(file2);
  }
  const response = await agent.uploadBlob(fileToUpload);
  if (response.success !== true) {
    throw new TRPCError2({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file as blob."
    });
  }
  return response.data;
};
var uploadFileAsBlobFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure2.input(
    z.object({
      file: FileGeneratorSchema,
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    const response = await uploadFileAsBlobPure(input.file, agent);
    return response;
  });
};

// src/server/routers/atproto/auth/login.ts
import { saveSession } from "@/server/session";
import { publicProcedure as publicProcedure2 } from "@/server/trpc";
import { CredentialSession } from "@atproto/api";
import { TRPCError as TRPCError3 } from "@trpc/server";
import z2 from "zod";
var loginFactory = (allowedPDSDomainSchema) => {
  return publicProcedure2.input(
    z2.object({
      handlePrefix: z2.string().regex(/^^[a-zA-Z0-9-]+$/),
      // alphanumerics and hyphens only
      service: allowedPDSDomainSchema,
      password: z2.string()
    })
  ).mutation(async ({ input }) => {
    const session = new CredentialSession(
      new URL(`https://${input.service}`)
    );
    const result = await session.login({
      identifier: `${input.handlePrefix}.${input.service}`,
      password: input.password
    });
    if (!result.success) {
      throw new TRPCError3({
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
    await saveSession(context, input.service);
    return {
      context,
      service: input.service
    };
  });
};

// src/server/routers/atproto/auth/resume.ts
import { getSessionFromRequest as getSessionFromRequest2 } from "@/server/session";
import { publicProcedure as publicProcedure3 } from "@/server/trpc";
import { TRPCError as TRPCError4 } from "@trpc/server";
import z3 from "zod";
var resumeFactory = (allowedPDSDomainSchema) => {
  return publicProcedure3.input(
    z3.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const session = await getSessionFromRequest2(input.service);
    if (!session) {
      throw new TRPCError4({
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
import { clearSession } from "@/server/session";
import { publicProcedure as publicProcedure4 } from "@/server/trpc";
import z4 from "zod";
var logoutFactory = (allowedPDSDomainSchema) => {
  return publicProcedure4.input(
    z4.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    await clearSession(input.service);
    return {
      success: true
    };
  });
};

// src/server/routers/atproto/gainforest/organizationInfo/get.ts
import { publicProcedure as publicProcedure5 } from "@/server/trpc";
import { z as z5 } from "zod";
import { tryCatch } from "@/lib/tryCatch";
import { XRPCError } from "@atproto/xrpc";
import { AppGainforestOrganizationInfo } from "@/../lex-api";
import { getReadAgent } from "@/server/utils/agent";
import { xrpcErrorToTRPCError } from "@/server/utils/classify-xrpc-error";
import { TRPCError as TRPCError5 } from "@trpc/server";
import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";
var getOrganizationInfoPure = async (did, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  console.log("TEMP DEBUG LOG:", JSON.stringify({ did, pdsDomain }));
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.gainforest.organization.info",
    repo: did,
    rkey: "self"
  });
  const [response, error] = await tryCatch(getRecordPromise);
  if (error) {
    if (error instanceof XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      console.error("getOrganizationInfo error:", error);
      throw new TRPCError5({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    console.error("getOrganizationInfo error: response.success is not true");
    throw new TRPCError5({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow(response.data.value, AppGainforestOrganizationInfo);
  return response.data;
};
var getOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return publicProcedure5.input(z5.object({ did: z5.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    return await getOrganizationInfoPure(input.did, input.pdsDomain);
  });
};

// src/server/routers/atproto/gainforest/site/get.ts
import { publicProcedure as publicProcedure6 } from "@/server/trpc";
import { z as z6 } from "zod";
import { getReadAgent as getReadAgent2 } from "@/server/utils/agent";
import { AppGainforestOrganizationSite } from "@/../lex-api";
import { validateRecordOrThrow as validateRecordOrThrow2 } from "@/server/utils/validate-record-or-throw";
var getSiteFactory = (allowedPDSDomainSchema) => {
  return publicProcedure6.input(
    z6.object({
      did: z6.string(),
      rkey: z6.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent2(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.site",
      repo: input.did,
      rkey: input.rkey
    });
    if (response.success !== true) {
      throw new Error("Failed to get the site.");
    }
    validateRecordOrThrow2(response.data.value, AppGainforestOrganizationSite);
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/site/getDefault.ts
import { publicProcedure as publicProcedure7 } from "@/server/trpc";
import z7 from "zod";
import { AppGainforestOrganizationDefaultSite } from "@/../lex-api";
import { getReadAgent as getReadAgent3 } from "@/server/utils/agent";
import { validateRecordOrThrow as validateRecordOrThrow3 } from "@/server/utils/validate-record-or-throw";
var getDefaultProjectSiteFactory = (allowedPDSDomainSchema) => {
  return publicProcedure7.input(
    z7.object({
      did: z7.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent3(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.defaultSite",
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get default project site");
    }
    validateRecordOrThrow3(
      response.data.value,
      AppGainforestOrganizationDefaultSite
    );
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/measuredTrees/get.ts
import { publicProcedure as publicProcedure8 } from "@/server/trpc";
import z8 from "zod";
import { AppGainforestOrganizationObservationsMeasuredTreesCluster as MeasuredTreesCluster } from "@/../lex-api";
import { getReadAgent as getReadAgent4 } from "@/server/utils/agent";
import { validateRecordOrThrow as validateRecordOrThrow4 } from "@/server/utils/validate-record-or-throw";
var getMeasuredTreesFactory = (allowedPDSDomainSchema) => {
  return publicProcedure8.input(
    z8.object({
      did: z8.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent4(input.pdsDomain);
    const nsid = "app.gainforest.organization.observations.measuredTreesCluster";
    const response = await agent.com.atproto.repo.getRecord({
      collection: nsid,
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get measured trees");
    }
    validateRecordOrThrow4(response.data.value, MeasuredTreesCluster);
    return response.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/create.ts
import { protectedProcedure as protectedProcedure3 } from "@/server/trpc";
import z9 from "zod";
import { TRPCError as TRPCError6 } from "@trpc/server";
import {
  AppCertifiedLocation,
  OrgHypercertsClaimActivity,
  OrgHypercertsClaimContribution
} from "@/../lex-api";
import { toBlobRef as toBlobRef2, toBlobRefGenerator } from "@/zod-schemas/blobref";
import { FileGeneratorSchema as FileGeneratorSchema2 } from "@/zod-schemas/file";
import { getWriteAgent as getWriteAgent2 } from "@/server/utils/agent";
import { validateRecordOrThrow as validateRecordOrThrow5 } from "@/server/utils/validate-record-or-throw";
var uploadFile = async (fileGenerator, agent) => {
  const file2 = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  const response = await agent.uploadBlob(file2);
  return toBlobRefGenerator(response.data.blob);
};
var createClaimActivityFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure3.input(
    z9.object({
      activity: z9.object({
        title: z9.string(),
        shortDescription: z9.string(),
        description: z9.string().optional(),
        workScopes: z9.array(z9.string()),
        startDate: z9.string(),
        endDate: z9.string()
      }),
      uploads: z9.object({
        image: FileGeneratorSchema2,
        contributors: z9.array(z9.string()).refine((v) => v.length > 0, {
          message: "At least one contribution is required"
        }),
        siteAtUri: z9.string()
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent2(input.pdsDomain);
    const did = agent.did;
    if (!did) {
      throw new TRPCError6({
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
    const validatedLocation = validateRecordOrThrow5(
      location,
      AppCertifiedLocation
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
    const validatedActivity = validateRecordOrThrow5(
      activity,
      OrgHypercertsClaimActivity
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
    const validatedContribution = validateRecordOrThrow5(
      contribution,
      OrgHypercertsClaimContribution
    );
    const locationWriteResponse = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: locationNSID,
      record: validatedLocation
    });
    if (locationWriteResponse.success !== true) {
      throw new TRPCError6({
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
          image: toBlobRef2(imageBlobRef)
        },
        location: {
          $type: "com.atproto.repo.strongRef",
          uri: locationWriteResponse.data.uri,
          cid: locationWriteResponse.data.cid
        }
      }
    });
    if (activityResponse.success !== true) {
      throw new TRPCError6({
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
      throw new TRPCError6({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to write contribution record"
      });
    }
    return activityResponse;
  });
};

// src/server/routers/atproto/gainforest/organizationInfo/createOrUpdate.ts
import { protectedProcedure as protectedProcedure4 } from "@/server/trpc";
import z10 from "zod";
import { AppGainforestOrganizationInfo as AppGainforestOrganizationInfo2 } from "@/../lex-api";
import { TRPCError as TRPCError7 } from "@trpc/server";
import { getWriteAgent as getWriteAgent3 } from "@/server/utils/agent";
import { FileGeneratorSchema as FileGeneratorSchema3 } from "@/zod-schemas/file";
import { BlobRefGeneratorSchema, toBlobRef as toBlobRef3 } from "@/zod-schemas/blobref";
import { validateRecordOrThrow as validateRecordOrThrow6 } from "@/server/utils/validate-record-or-throw";
var createOrUpdateOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure4.input(
    z10.object({
      did: z10.string(),
      info: z10.object({
        displayName: z10.string(),
        shortDescription: z10.string(),
        longDescription: z10.string(),
        website: z10.string().optional(),
        logo: BlobRefGeneratorSchema.optional(),
        coverImage: BlobRefGeneratorSchema.optional(),
        objectives: z10.array(
          z10.enum([
            "Conservation",
            "Research",
            "Education",
            "Community",
            "Other"
          ])
        ),
        startDate: z10.string().optional(),
        country: z10.string(),
        visibility: z10.enum(["Public", "Hidden"])
      }),
      uploads: z10.object({
        logo: FileGeneratorSchema3.optional(),
        coverImage: FileGeneratorSchema3.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent3(input.pdsDomain);
    const logoBlob = input.uploads?.logo ? (await uploadFileAsBlobPure(input.uploads.logo, agent)).blob : input.info.logo ? toBlobRef3(input.info.logo) : void 0;
    const coverImageBlob = input.uploads?.coverImage ? (await uploadFileAsBlobPure(input.uploads.coverImage, agent)).blob : input.info.coverImage ? toBlobRef3(input.info.coverImage) : void 0;
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
    validateRecordOrThrow6(info, AppGainforestOrganizationInfo2);
    const response = await agent.com.atproto.repo.putRecord({
      repo: input.did,
      collection: "app.gainforest.organization.info",
      record: info,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new TRPCError7({
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
import { publicProcedure as publicProcedure9 } from "@/server/trpc";
import { z as z11 } from "zod";
import { TRPCError as TRPCError8 } from "@trpc/server";
import {
  AppGainforestOrganizationDefaultSite as AppGainforestOrganizationDefaultSite2,
  AppGainforestOrganizationSite as AppGainforestOrganizationSite2
} from "@/../lex-api";
import { tryCatch as tryCatch2 } from "@/lib/tryCatch";
import { XRPCError as XRPCError2 } from "@atproto/xrpc";
import { getReadAgent as getReadAgent5 } from "@/server/utils/agent";
import { xrpcErrorToTRPCError as xrpcErrorToTRPCError2 } from "@/server/utils/classify-xrpc-error";
import { validateRecordOrThrow as validateRecordOrThrow7 } from "@/server/utils/validate-record-or-throw";
var getAllSitesFactory = (allowedPDSDomainSchema) => {
  return publicProcedure9.input(z11.object({ did: z11.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = getReadAgent5(input.pdsDomain);
    const listSitesTryCatchPromise = tryCatch2(
      agent.com.atproto.repo.listRecords({
        collection: "app.gainforest.organization.site",
        repo: input.did
      })
    );
    const getDefaultSiteTryCatchPromise = tryCatch2(
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
      if (errorListSites instanceof XRPCError2) {
        const trpcError = xrpcErrorToTRPCError2(errorListSites);
        throw trpcError;
      }
      throw new TRPCError8({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    } else if (listSitesResponse.success !== true) {
      throw new TRPCError8({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
    const validRecords = listSitesResponse.data.records.map((record) => {
      const result = AppGainforestOrganizationSite2.validateRecord(
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
        validateRecordOrThrow7(
          defaultSite.value,
          AppGainforestOrganizationDefaultSite2
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
import { protectedProcedure as protectedProcedure5 } from "@/server/trpc";
import { z as z12 } from "zod";
import { getWriteAgent as getWriteAgent4 } from "@/server/utils/agent";
import { AppGainforestOrganizationSite as AppGainforestOrganizationSite3 } from "@/../lex-api";
import { FileGeneratorSchema as FileGeneratorSchema4, toFile as toFile2 } from "@/zod-schemas/file";
import { TRPCError as TRPCError10 } from "@trpc/server";

// src/server/routers/atproto/gainforest/site/utils.ts
import { TRPCError as TRPCError9 } from "@trpc/server";
import { validateGeojsonOrThrow as validateGeojsonOrThrow2 } from "@/lib/geojson/validate";
import { tryCatch as tryCatch3 } from "@/lib/tryCatch";
import { computePolygonMetrics } from "@/lib/geojson/computations";
async function fetchGeojsonFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new TRPCError9({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch site"
    });
  }
  const blob = await response.blob();
  if (blob.type !== "application/geo+json") {
    throw new TRPCError9({
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
    throw new TRPCError9({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const geojsonText = await file2.text();
  const geojson = JSON.parse(geojsonText);
  const [validatedGeojsonObject, geojsonValidationError] = await tryCatch3(
    new Promise((r) => r(validateGeojsonOrThrow2(geojson)))
  );
  if (geojsonValidationError) {
    throw new TRPCError9({
      code: "BAD_REQUEST",
      message: "Invalid GeoJSON file: " + geojsonValidationError.message
    });
  }
  const polygonMetrics = computePolygonMetrics(validatedGeojsonObject);
  const lat = polygonMetrics.centroid?.lat;
  const lon = polygonMetrics.centroid?.lon;
  const area = polygonMetrics.areaHectares;
  if (!lat || !lon || !area) {
    throw new TRPCError9({
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
  return protectedProcedure5.input(
    z12.object({
      rkey: z12.string().optional(),
      site: z12.object({
        name: z12.string().min(1)
      }),
      uploads: z12.object({
        shapefile: z12.union([z12.url(), FileGeneratorSchema4])
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent4(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError10({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const file2 = typeof input.uploads.shapefile === "string" ? await fetchGeojsonFromUrl(input.uploads.shapefile) : await toFile2(input.uploads.shapefile);
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
    const validationResult = AppGainforestOrganizationSite3.validateRecord(site);
    if (!validationResult.success) {
      throw new TRPCError10({
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
      throw new TRPCError10({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add new site"
      });
    }
    return creationResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/update.ts
import { protectedProcedure as protectedProcedure6 } from "@/server/trpc";
import { z as z13 } from "zod";
import { getWriteAgent as getWriteAgent5 } from "@/server/utils/agent";
import { AppGainforestOrganizationSite as AppGainforestOrganizationSite4 } from "@/../lex-api";
import { BlobRefGeneratorSchema as BlobRefGeneratorSchema2, toBlobRef as toBlobRef4 } from "@/zod-schemas/blobref";
import { FileGeneratorSchema as FileGeneratorSchema5, toFile as toFile3 } from "@/zod-schemas/file";
import { TRPCError as TRPCError11 } from "@trpc/server";
var updateSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure6.input(
    z13.object({
      rkey: z13.string(),
      site: z13.object({
        name: z13.string().min(1),
        shapefile: z13.object({
          $type: z13.literal("app.gainforest.common.defs#smallBlob"),
          blob: BlobRefGeneratorSchema2
        }).optional(),
        lat: z13.string(),
        lon: z13.string(),
        area: z13.string()
      }),
      uploads: z13.object({
        shapefile: FileGeneratorSchema5.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent5(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError11({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    let file2 = null;
    if (input.uploads) {
      if (input.uploads.shapefile === void 0) {
        file2 = null;
      } else {
        file2 = await toFile3(input.uploads.shapefile);
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
        blob: toBlobRef4(input.site.shapefile.blob)
      };
      lat = input.site.lat;
      lon = input.site.lon;
      area = input.site.area;
    } else {
      throw new TRPCError11({
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
    const validationResult = AppGainforestOrganizationSite4.validateRecord(site);
    if (!validationResult.success) {
      throw new TRPCError11({
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
      throw new TRPCError11({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update site"
      });
    }
    return updateResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/setDefault.ts
import { protectedProcedure as protectedProcedure7 } from "@/server/trpc";
import z14 from "zod";
import {
  AppGainforestOrganizationDefaultSite as AppGainforestOrganizationDefaultSite3
} from "@/../lex-api";
import { getWriteAgent as getWriteAgent6 } from "@/server/utils/agent";
import { TRPCError as TRPCError12 } from "@trpc/server";
import parseAtUri2 from "@/utilities/parseAtUri";
import { validateRecordOrThrow as validateRecordOrThrow8 } from "@/server/utils/validate-record-or-throw";
var setDefaultSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure7.input(
    z14.object({
      siteAtUri: z14.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent6(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError12({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const siteUri = input.siteAtUri;
    const siteNSID = "app.gainforest.organization.site";
    if (!(siteUri.startsWith(`at://`) && siteUri.includes(siteNSID))) {
      throw new TRPCError12({
        code: "BAD_REQUEST",
        message: "Invalid site URI"
      });
    }
    const site = await agent.com.atproto.repo.getRecord({
      collection: siteNSID,
      repo: agent.did,
      rkey: parseAtUri2(siteUri).rkey
    });
    if (site.success !== true) {
      throw new TRPCError12({
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
    validateRecordOrThrow8(defaultSite, AppGainforestOrganizationDefaultSite3);
    const updateDefaultSiteResponse = await agent.com.atproto.repo.putRecord({
      collection: defaultSiteNSID,
      repo: agent.did,
      rkey: "self",
      record: defaultSite
    });
    if (updateDefaultSiteResponse.success !== true) {
      throw new TRPCError12({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update default site"
      });
    }
    return updateDefaultSiteResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/delete.ts
import { AppGainforestOrganizationDefaultSite as AppGainforestOrganizationDefaultSite4 } from "@/../lex-api";
import { protectedProcedure as protectedProcedure8 } from "@/server/trpc";
import { getWriteAgent as getWriteAgent7 } from "@/server/utils/agent";
import { TRPCError as TRPCError13 } from "@trpc/server";
import z15 from "zod";
import { validateRecordOrThrow as validateRecordOrThrow9 } from "@/server/utils/validate-record-or-throw";
import { parseAtUri as parseAtUri3 } from "@/utilities";
var deleteSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure8.input(
    z15.object({ siteAtUri: z15.string(), pdsDomain: allowedPDSDomainSchema })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent7(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError13({
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
      validateRecordOrThrow9(
        defaultSiteResponse.data.value,
        AppGainforestOrganizationDefaultSite4
      );
      const defaultSite = defaultSiteResponse.data.value;
      if (defaultSite.site === input.siteAtUri) throw new Error("Equal");
    } catch (error) {
      if (error instanceof Error && error.message === "Equal") {
        throw new TRPCError13({
          code: "BAD_REQUEST",
          message: "Cannot delete default site"
        });
      }
    }
    const deletionResponse = await agent.com.atproto.repo.deleteRecord({
      collection: "app.gainforest.organization.site",
      repo: agent.did,
      rkey: parseAtUri3(input.siteAtUri).rkey
    });
    if (deletionResponse.success !== true)
      throw new TRPCError13({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete site"
      });
    return deletionResponse.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs.ts
import { tryCatch as tryCatch5 } from "@/lib/tryCatch";
import { publicProcedure as publicProcedure11 } from "@/server/trpc";
import { getReadAgent as getReadAgent7 } from "@/server/utils/agent";
import { z as z17 } from "zod";
import { TRPCError as TRPCError15 } from "@trpc/server";

// src/server/routers/atproto/hypercerts/claim/activity/getAll.ts
import { publicProcedure as publicProcedure10 } from "@/server/trpc";
import { z as z16 } from "zod";
import { TRPCError as TRPCError14 } from "@trpc/server";
import { OrgHypercertsClaimActivity as OrgHypercertsClaimActivity2 } from "@/../lex-api";
import { tryCatch as tryCatch4 } from "@/lib/tryCatch";
import { XRPCError as XRPCError3 } from "@atproto/xrpc";
import { getReadAgent as getReadAgent6 } from "@/server/utils/agent";
import { xrpcErrorToTRPCError as xrpcErrorToTRPCError3 } from "@/server/utils/classify-xrpc-error";
import { validateRecordOrThrow as validateRecordOrThrow10 } from "@/server/utils/validate-record-or-throw";
var getAllClaimActivitiesPure = async (did, pdsDomain) => {
  const activityNSID = "org.hypercerts.claim.activity";
  const agent = getReadAgent6(pdsDomain);
  const [listClaimActivitiesResponse, errorListClaimActivities] = await tryCatch4(
    agent.com.atproto.repo.listRecords({
      collection: activityNSID,
      repo: did
    })
  );
  if (errorListClaimActivities) {
    if (errorListClaimActivities instanceof XRPCError3) {
      const trpcError = xrpcErrorToTRPCError3(errorListClaimActivities);
      throw trpcError;
    }
    throw new TRPCError14({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  } else if (listClaimActivitiesResponse.success !== true) {
    throw new TRPCError14({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  }
  const validRecords = listClaimActivitiesResponse.data.records.map((record) => {
    try {
      validateRecordOrThrow10(record.value, OrgHypercertsClaimActivity2);
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
  return publicProcedure11.input(z17.object({ pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = getReadAgent7(input.pdsDomain);
    const [repositoriesListResponse, repositoriesListFetchError] = await tryCatch5(
      agent.com.atproto.sync.listRepos({
        limit: 100
      })
    );
    if (repositoriesListFetchError || repositoriesListResponse.success !== true) {
      throw new TRPCError15({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch repositories list"
      });
    }
    const repositoriesList = repositoriesListResponse.data.repos;
    const [organizationRepositories, organizationsFetchError] = await tryCatch5(
      Promise.all(
        repositoriesList.map(async (repo) => {
          const [organizationInfoResponse, organizationInfoFetchError] = await tryCatch5(
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
      throw new TRPCError15({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch organizations list"
      });
    }
    const validOrganizationRepositories = organizationRepositories.filter(
      (org) => org !== null
    );
    const [activities, activitiesFetchError] = await tryCatch5(
      Promise.all(
        validOrganizationRepositories.map(async (organization) => {
          const [activitiesResponse, activitiesFetchError2] = await tryCatch5(
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
      throw new TRPCError15({
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
import { publicProcedure as publicProcedure12 } from "@/server/trpc";
import { z as z18 } from "zod";
import { tryCatch as tryCatch6 } from "@/lib/tryCatch";
import { XRPCError as XRPCError4 } from "@atproto/xrpc";
import { OrgHypercertsClaimActivity as OrgHypercertsClaimActivity3 } from "@/../lex-api";
import { getReadAgent as getReadAgent8 } from "@/server/utils/agent";
import { xrpcErrorToTRPCError as xrpcErrorToTRPCError4 } from "@/server/utils/classify-xrpc-error";
import { TRPCError as TRPCError16 } from "@trpc/server";
import { validateRecordOrThrow as validateRecordOrThrow11 } from "@/server/utils/validate-record-or-throw";
var getClaimActivityPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent8(pdsDomain);
  const nsid = "org.hypercerts.claim.activity";
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: nsid,
    repo: did,
    rkey
  });
  const [response, error] = await tryCatch6(getRecordPromise);
  if (error) {
    if (error instanceof XRPCError4) {
      const trpcError = xrpcErrorToTRPCError4(error);
      throw trpcError;
    } else {
      throw new TRPCError16({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new TRPCError16({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow11(response.data.value, OrgHypercertsClaimActivity3);
  return response.data;
};
var getCliamActivityFactory = (allowedPDSDomainSchema) => {
  return publicProcedure12.input(
    z18.object({
      did: z18.string(),
      rkey: z18.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    return await getClaimActivityPure(input.did, input.rkey, input.pdsDomain);
  });
};

// src/server/routers/atproto/hypercerts/location/get.ts
import { publicProcedure as publicProcedure13 } from "@/server/trpc";
import { z as z19 } from "zod";
import { tryCatch as tryCatch7 } from "@/lib/tryCatch";
import { XRPCError as XRPCError5 } from "@atproto/xrpc";
import { AppCertifiedLocation as AppCertifiedLocation2 } from "@/../lex-api";
import { getReadAgent as getReadAgent9 } from "@/server/utils/agent";
import { xrpcErrorToTRPCError as xrpcErrorToTRPCError5 } from "@/server/utils/classify-xrpc-error";
import { TRPCError as TRPCError17 } from "@trpc/server";
import { validateRecordOrThrow as validateRecordOrThrow12 } from "@/server/utils/validate-record-or-throw";
var getCertifiedLocationPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent9(pdsDomain);
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.certified.location",
    repo: did,
    rkey
  });
  const [response, error] = await tryCatch7(getRecordPromise);
  if (error) {
    if (error instanceof XRPCError5) {
      const trpcError = xrpcErrorToTRPCError5(error);
      throw trpcError;
    } else {
      throw new TRPCError17({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new TRPCError17({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow12(response.data.value, AppCertifiedLocation2);
  return response.data;
};
var getCertifiedLocationFactory = (allowedPDSDomainSchema) => {
  return publicProcedure13.input(
    z19.object({
      did: z19.string(),
      rkey: z19.string(),
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
import z20 from "zod";
var AppRouterFactory = class {
  allowedPDSDomains;
  allowedPDSDomainSchema;
  appRouter;
  constructor(_allowedPDSDomains) {
    this.allowedPDSDomains = _allowedPDSDomains;
    this.allowedPDSDomainSchema = z20.enum(this.allowedPDSDomains);
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
var supportedPDSDomainSchema = z21.enum(supportedDomains);
var supportedPDSDomainsSchema = z21.array(supportedPDSDomainSchema);
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
export {
  ClimateAiSDK,
  createContext,
  supportedPDSDomainSchema
};
//# sourceMappingURL=index.js.map