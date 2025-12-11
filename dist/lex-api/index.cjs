"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/@atproto/xrpc/dist/types.js
var require_types = __commonJS({
  "node_modules/@atproto/xrpc/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XRPCInvalidResponseError = exports.XRPCError = exports.XRPCResponse = exports.ResponseTypeStrings = exports.ResponseType = exports.errorResponseBody = void 0;
    exports.httpResponseCodeToEnum = httpResponseCodeToEnum;
    exports.httpResponseCodeToName = httpResponseCodeToName;
    exports.httpResponseCodeToString = httpResponseCodeToString;
    var zod_1 = require("zod");
    exports.errorResponseBody = zod_1.z.object({
      error: zod_1.z.string().optional(),
      message: zod_1.z.string().optional()
    });
    var ResponseType;
    (function(ResponseType2) {
      ResponseType2[ResponseType2["Unknown"] = 1] = "Unknown";
      ResponseType2[ResponseType2["InvalidResponse"] = 2] = "InvalidResponse";
      ResponseType2[ResponseType2["Success"] = 200] = "Success";
      ResponseType2[ResponseType2["InvalidRequest"] = 400] = "InvalidRequest";
      ResponseType2[ResponseType2["AuthenticationRequired"] = 401] = "AuthenticationRequired";
      ResponseType2[ResponseType2["Forbidden"] = 403] = "Forbidden";
      ResponseType2[ResponseType2["XRPCNotSupported"] = 404] = "XRPCNotSupported";
      ResponseType2[ResponseType2["NotAcceptable"] = 406] = "NotAcceptable";
      ResponseType2[ResponseType2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
      ResponseType2[ResponseType2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
      ResponseType2[ResponseType2["RateLimitExceeded"] = 429] = "RateLimitExceeded";
      ResponseType2[ResponseType2["InternalServerError"] = 500] = "InternalServerError";
      ResponseType2[ResponseType2["MethodNotImplemented"] = 501] = "MethodNotImplemented";
      ResponseType2[ResponseType2["UpstreamFailure"] = 502] = "UpstreamFailure";
      ResponseType2[ResponseType2["NotEnoughResources"] = 503] = "NotEnoughResources";
      ResponseType2[ResponseType2["UpstreamTimeout"] = 504] = "UpstreamTimeout";
    })(ResponseType || (exports.ResponseType = ResponseType = {}));
    function httpResponseCodeToEnum(status) {
      if (status in ResponseType) {
        return status;
      } else if (status >= 100 && status < 200) {
        return ResponseType.XRPCNotSupported;
      } else if (status >= 200 && status < 300) {
        return ResponseType.Success;
      } else if (status >= 300 && status < 400) {
        return ResponseType.XRPCNotSupported;
      } else if (status >= 400 && status < 500) {
        return ResponseType.InvalidRequest;
      } else {
        return ResponseType.InternalServerError;
      }
    }
    function httpResponseCodeToName(status) {
      return ResponseType[httpResponseCodeToEnum(status)];
    }
    exports.ResponseTypeStrings = {
      [ResponseType.Unknown]: "Unknown",
      [ResponseType.InvalidResponse]: "Invalid Response",
      [ResponseType.Success]: "Success",
      [ResponseType.InvalidRequest]: "Invalid Request",
      [ResponseType.AuthenticationRequired]: "Authentication Required",
      [ResponseType.Forbidden]: "Forbidden",
      [ResponseType.XRPCNotSupported]: "XRPC Not Supported",
      [ResponseType.NotAcceptable]: "Not Acceptable",
      [ResponseType.PayloadTooLarge]: "Payload Too Large",
      [ResponseType.UnsupportedMediaType]: "Unsupported Media Type",
      [ResponseType.RateLimitExceeded]: "Rate Limit Exceeded",
      [ResponseType.InternalServerError]: "Internal Server Error",
      [ResponseType.MethodNotImplemented]: "Method Not Implemented",
      [ResponseType.UpstreamFailure]: "Upstream Failure",
      [ResponseType.NotEnoughResources]: "Not Enough Resources",
      [ResponseType.UpstreamTimeout]: "Upstream Timeout"
    };
    function httpResponseCodeToString(status) {
      return exports.ResponseTypeStrings[httpResponseCodeToEnum(status)];
    }
    var XRPCResponse = class {
      constructor(data, headers) {
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: data
        });
        Object.defineProperty(this, "headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: headers
        });
        Object.defineProperty(this, "success", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: true
        });
      }
    };
    exports.XRPCResponse = XRPCResponse;
    var XRPCError = class _XRPCError extends Error {
      constructor(statusCode, error = httpResponseCodeToName(statusCode), message, headers, options) {
        super(message || error || httpResponseCodeToString(statusCode), options);
        Object.defineProperty(this, "error", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: error
        });
        Object.defineProperty(this, "headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: headers
        });
        Object.defineProperty(this, "success", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: false
        });
        Object.defineProperty(this, "status", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.status = httpResponseCodeToEnum(statusCode);
        const cause = options?.cause;
        if (this.cause === void 0 && cause !== void 0) {
          this.cause = cause;
        }
      }
      static from(cause, fallbackStatus) {
        if (cause instanceof _XRPCError) {
          return cause;
        }
        const causeErr = cause instanceof Error ? cause : void 0;
        const causeResponse = cause instanceof Response ? cause : cause?.["response"] instanceof Response ? cause["response"] : void 0;
        const statusCode = (
          // Extract status code from "http-errors" like errors
          causeErr?.["statusCode"] ?? causeErr?.["status"] ?? // Use the status code from the response object as fallback
          causeResponse?.status
        );
        const status = typeof statusCode === "number" ? httpResponseCodeToEnum(statusCode) : fallbackStatus ?? ResponseType.Unknown;
        const message = causeErr?.message ?? String(cause);
        const headers = causeResponse ? Object.fromEntries(causeResponse.headers.entries()) : void 0;
        return new _XRPCError(status, void 0, message, headers, { cause });
      }
    };
    exports.XRPCError = XRPCError;
    var XRPCInvalidResponseError = class extends XRPCError {
      constructor(lexiconNsid, validationError, responseBody) {
        super(
          ResponseType.InvalidResponse,
          // @NOTE: This is probably wrong and should use ResponseTypeNames instead.
          // But it would mean a breaking change.
          exports.ResponseTypeStrings[ResponseType.InvalidResponse],
          `The server gave an invalid response and may be out of date.`,
          void 0,
          { cause: validationError }
        );
        Object.defineProperty(this, "lexiconNsid", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: lexiconNsid
        });
        Object.defineProperty(this, "validationError", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: validationError
        });
        Object.defineProperty(this, "responseBody", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: responseBody
        });
      }
    };
    exports.XRPCInvalidResponseError = XRPCInvalidResponseError;
  }
});

// node_modules/@atproto/xrpc/dist/util.js
var require_util = __commonJS({
  "node_modules/@atproto/xrpc/dist/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isErrorResponseBody = isErrorResponseBody;
    exports.getMethodSchemaHTTPMethod = getMethodSchemaHTTPMethod;
    exports.constructMethodCallUri = constructMethodCallUri;
    exports.constructMethodCallUrl = constructMethodCallUrl;
    exports.encodeQueryParam = encodeQueryParam;
    exports.constructMethodCallHeaders = constructMethodCallHeaders;
    exports.combineHeaders = combineHeaders;
    exports.isBodyInit = isBodyInit;
    exports.isIterable = isIterable;
    exports.encodeMethodCallBody = encodeMethodCallBody;
    exports.httpResponseBodyParse = httpResponseBodyParse;
    var lexicon_1 = require("@atproto/lexicon");
    var types_1 = require_types();
    var ReadableStream = globalThis.ReadableStream || class {
      constructor() {
        throw new Error("ReadableStream is not supported in this environment");
      }
    };
    function isErrorResponseBody(v) {
      return types_1.errorResponseBody.safeParse(v).success;
    }
    function getMethodSchemaHTTPMethod(schema) {
      if (schema.type === "procedure") {
        return "post";
      }
      return "get";
    }
    function constructMethodCallUri(nsid, schema, serviceUri, params) {
      const uri = new URL(constructMethodCallUrl(nsid, schema, params), serviceUri);
      return uri.toString();
    }
    function constructMethodCallUrl(nsid, schema, params) {
      const pathname = `/xrpc/${encodeURIComponent(nsid)}`;
      if (!params)
        return pathname;
      const searchParams = [];
      for (const [key, value] of Object.entries(params)) {
        const paramSchema = schema.parameters?.properties?.[key];
        if (!paramSchema) {
          throw new Error(`Invalid query parameter: ${key}`);
        }
        if (value !== void 0) {
          if (paramSchema.type === "array") {
            const values = Array.isArray(value) ? value : [value];
            for (const val of values) {
              searchParams.push([
                key,
                encodeQueryParam(paramSchema.items.type, val)
              ]);
            }
          } else {
            searchParams.push([key, encodeQueryParam(paramSchema.type, value)]);
          }
        }
      }
      if (!searchParams.length)
        return pathname;
      return `${pathname}?${new URLSearchParams(searchParams).toString()}`;
    }
    function encodeQueryParam(type, value) {
      if (type === "string" || type === "unknown") {
        return String(value);
      }
      if (type === "float") {
        return String(Number(value));
      } else if (type === "integer") {
        return String(Number(value) | 0);
      } else if (type === "boolean") {
        return value ? "true" : "false";
      } else if (type === "datetime") {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return String(value);
      }
      throw new Error(`Unsupported query param type: ${type}`);
    }
    function constructMethodCallHeaders(schema, data, opts) {
      const headers = new Headers();
      if (opts?.headers) {
        for (const name in opts.headers) {
          if (headers.has(name)) {
            throw new TypeError(`Duplicate header: ${name}`);
          }
          const value = opts.headers[name];
          if (value != null) {
            headers.set(name, value);
          }
        }
      }
      if (schema.type === "procedure") {
        if (opts?.encoding) {
          headers.set("content-type", opts.encoding);
        } else if (!headers.has("content-type") && typeof data !== "undefined") {
          if (data instanceof ArrayBuffer || data instanceof ReadableStream || ArrayBuffer.isView(data)) {
            headers.set("content-type", "application/octet-stream");
          } else if (data instanceof FormData) {
            headers.set("content-type", "multipart/form-data");
          } else if (data instanceof URLSearchParams) {
            headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
          } else if (isBlobLike(data)) {
            headers.set("content-type", data.type || "application/octet-stream");
          } else if (typeof data === "string") {
            headers.set("content-type", "text/plain;charset=UTF-8");
          } else if (isIterable(data)) {
            headers.set("content-type", "application/octet-stream");
          } else if (typeof data === "boolean" || typeof data === "number" || typeof data === "string" || typeof data === "object") {
            headers.set("content-type", "application/json");
          } else {
            throw new types_1.XRPCError(types_1.ResponseType.InvalidRequest, `Unsupported data type: ${typeof data}`);
          }
        }
      }
      return headers;
    }
    function combineHeaders(headersInit, defaultHeaders) {
      if (!defaultHeaders)
        return headersInit;
      let headers = void 0;
      for (const [name, definition] of defaultHeaders) {
        if (definition === void 0)
          continue;
        headers ?? (headers = new Headers(headersInit));
        if (headers.has(name))
          continue;
        const value = typeof definition === "function" ? definition() : definition;
        if (typeof value === "string")
          headers.set(name, value);
        else if (value === null)
          headers.delete(name);
        else
          throw new TypeError(`Invalid "${name}" header value: ${typeof value}`);
      }
      return headers ?? headersInit;
    }
    function isBlobLike(value) {
      if (value == null)
        return false;
      if (typeof value !== "object")
        return false;
      if (typeof Blob === "function" && value instanceof Blob)
        return true;
      const tag = value[Symbol.toStringTag];
      if (tag === "Blob" || tag === "File") {
        return "stream" in value && typeof value.stream === "function";
      }
      return false;
    }
    function isBodyInit(value) {
      switch (typeof value) {
        case "string":
          return true;
        case "object":
          return value instanceof ArrayBuffer || value instanceof FormData || value instanceof URLSearchParams || value instanceof ReadableStream || ArrayBuffer.isView(value) || isBlobLike(value);
        default:
          return false;
      }
    }
    function isIterable(value) {
      return value != null && typeof value === "object" && (Symbol.iterator in value || Symbol.asyncIterator in value);
    }
    function encodeMethodCallBody(headers, data) {
      const contentType = headers.get("content-type");
      if (!contentType) {
        return void 0;
      }
      if (typeof data === "undefined") {
        throw new types_1.XRPCError(types_1.ResponseType.InvalidRequest, `A request body is expected but none was provided`);
      }
      if (isBodyInit(data)) {
        if (data instanceof FormData && contentType === "multipart/form-data") {
          headers.delete("content-type");
        }
        return data;
      }
      if (isIterable(data)) {
        return iterableToReadableStream(data);
      }
      if (contentType.startsWith("text/")) {
        return new TextEncoder().encode(String(data));
      }
      if (contentType.startsWith("application/json")) {
        const json = (0, lexicon_1.stringifyLex)(data);
        if (json === void 0) {
          throw new types_1.XRPCError(types_1.ResponseType.InvalidRequest, `Failed to encode request body as JSON`);
        }
        return new TextEncoder().encode(json);
      }
      const type = !data || typeof data !== "object" ? typeof data : data.constructor !== Object && typeof data.constructor === "function" && typeof data.constructor?.name === "string" ? data.constructor.name : "object";
      throw new types_1.XRPCError(types_1.ResponseType.InvalidRequest, `Unable to encode ${type} as ${contentType} data`);
    }
    function iterableToReadableStream(iterable) {
      if ("from" in ReadableStream && typeof ReadableStream.from === "function") {
        return ReadableStream.from(iterable);
      }
      throw new TypeError("ReadableStream.from() is not supported in this environment. It is required to support using iterables as the request body. Consider using a polyfill or re-write your code to use a different body type.");
    }
    function httpResponseBodyParse(mimeType, data) {
      try {
        if (mimeType) {
          if (mimeType.includes("application/json")) {
            const str = new TextDecoder().decode(data);
            return (0, lexicon_1.jsonStringToLex)(str);
          }
          if (mimeType.startsWith("text/")) {
            return new TextDecoder().decode(data);
          }
        }
        if (data instanceof ArrayBuffer) {
          return new Uint8Array(data);
        }
        return data;
      } catch (cause) {
        throw new types_1.XRPCError(types_1.ResponseType.InvalidResponse, void 0, `Failed to parse response body: ${String(cause)}`, void 0, { cause });
      }
    }
  }
});

// node_modules/@atproto/xrpc/dist/fetch-handler.js
var require_fetch_handler = __commonJS({
  "node_modules/@atproto/xrpc/dist/fetch-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildFetchHandler = buildFetchHandler;
    var util_1 = require_util();
    function buildFetchHandler(options) {
      if (typeof options === "function")
        return options;
      if (typeof options === "object" && "fetchHandler" in options) {
        return options.fetchHandler.bind(options);
      }
      const { service, headers: defaultHeaders = void 0, fetch: fetch2 = globalThis.fetch } = typeof options === "string" || options instanceof URL ? { service: options } : options;
      if (typeof fetch2 !== "function") {
        throw new TypeError("XrpcDispatcher requires fetch() to be available in your environment.");
      }
      const defaultHeadersEntries = defaultHeaders != null ? Object.entries(defaultHeaders) : void 0;
      return async function(url, init) {
        const base = typeof service === "function" ? service() : service;
        const fullUrl = new URL(url, base);
        const headers = (0, util_1.combineHeaders)(init.headers, defaultHeadersEntries);
        return fetch2(fullUrl, { ...init, headers });
      };
    }
  }
});

// node_modules/@atproto/xrpc/dist/xrpc-client.js
var require_xrpc_client = __commonJS({
  "node_modules/@atproto/xrpc/dist/xrpc-client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XrpcClient = void 0;
    var lexicon_1 = require("@atproto/lexicon");
    var fetch_handler_1 = require_fetch_handler();
    var types_1 = require_types();
    var util_1 = require_util();
    var XrpcClient2 = class {
      constructor(fetchHandlerOpts, lex) {
        Object.defineProperty(this, "fetchHandler", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: /* @__PURE__ */ new Map()
        });
        Object.defineProperty(this, "lex", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.fetchHandler = (0, fetch_handler_1.buildFetchHandler)(fetchHandlerOpts);
        this.lex = lex instanceof lexicon_1.Lexicons ? lex : new lexicon_1.Lexicons(lex);
      }
      setHeader(key, value) {
        this.headers.set(key.toLowerCase(), value);
      }
      unsetHeader(key) {
        this.headers.delete(key.toLowerCase());
      }
      clearHeaders() {
        this.headers.clear();
      }
      async call(methodNsid, params, data, opts) {
        const def = this.lex.getDefOrThrow(methodNsid);
        if (!def || def.type !== "query" && def.type !== "procedure") {
          throw new TypeError(`Invalid lexicon: ${methodNsid}. Must be a query or procedure.`);
        }
        const reqUrl = (0, util_1.constructMethodCallUrl)(methodNsid, def, params);
        const reqMethod = (0, util_1.getMethodSchemaHTTPMethod)(def);
        const reqHeaders = (0, util_1.constructMethodCallHeaders)(def, data, opts);
        const reqBody = (0, util_1.encodeMethodCallBody)(reqHeaders, data);
        const init = {
          method: reqMethod,
          headers: (0, util_1.combineHeaders)(reqHeaders, this.headers),
          body: reqBody,
          duplex: "half",
          redirect: "follow",
          signal: opts?.signal
        };
        try {
          const response = await this.fetchHandler.call(void 0, reqUrl, init);
          const resStatus = response.status;
          const resHeaders = Object.fromEntries(response.headers.entries());
          const resBodyBytes = await response.arrayBuffer();
          const resBody = (0, util_1.httpResponseBodyParse)(response.headers.get("content-type"), resBodyBytes);
          const resCode = (0, types_1.httpResponseCodeToEnum)(resStatus);
          if (resCode !== types_1.ResponseType.Success) {
            const { error = void 0, message = void 0 } = resBody && (0, util_1.isErrorResponseBody)(resBody) ? resBody : {};
            throw new types_1.XRPCError(resCode, error, message, resHeaders);
          }
          try {
            this.lex.assertValidXrpcOutput(methodNsid, resBody);
          } catch (e) {
            if (e instanceof lexicon_1.ValidationError) {
              throw new types_1.XRPCInvalidResponseError(methodNsid, e, resBody);
            }
            throw e;
          }
          return new types_1.XRPCResponse(resBody, resHeaders);
        } catch (err) {
          throw types_1.XRPCError.from(err);
        }
      }
    };
    exports.XrpcClient = XrpcClient2;
  }
});

// node_modules/@atproto/xrpc/dist/client.js
var require_client = __commonJS({
  "node_modules/@atproto/xrpc/dist/client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServiceClient = exports.Client = void 0;
    var lexicon_1 = require("@atproto/lexicon");
    var util_1 = require_util();
    var xrpc_client_1 = require_xrpc_client();
    var Client = class {
      constructor() {
        Object.defineProperty(this, "lex", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: new lexicon_1.Lexicons()
        });
      }
      /** @deprecated */
      get fetch() {
        throw new Error("Client.fetch is no longer supported. Use an XrpcClient instead.");
      }
      /** @deprecated */
      set fetch(_) {
        throw new Error("Client.fetch is no longer supported. Use an XrpcClient instead.");
      }
      // method calls
      //
      async call(serviceUri, methodNsid, params, data, opts) {
        return this.service(serviceUri).call(methodNsid, params, data, opts);
      }
      service(serviceUri) {
        return new ServiceClient(this, serviceUri);
      }
      // schemas
      // =
      addLexicon(doc) {
        this.lex.add(doc);
      }
      addLexicons(docs) {
        for (const doc of docs) {
          this.addLexicon(doc);
        }
      }
      removeLexicon(uri) {
        this.lex.remove(uri);
      }
    };
    exports.Client = Client;
    var ServiceClient = class extends xrpc_client_1.XrpcClient {
      constructor(baseClient, serviceUri) {
        super(async (input, init) => {
          const headers = (0, util_1.combineHeaders)(init.headers, Object.entries(this.headers));
          return fetch(new URL(input, this.uri), { ...init, headers });
        }, baseClient.lex);
        Object.defineProperty(this, "baseClient", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: baseClient
        });
        Object.defineProperty(this, "uri", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.uri = typeof serviceUri === "string" ? new URL(serviceUri) : serviceUri;
      }
    };
    exports.ServiceClient = ServiceClient;
  }
});

// node_modules/@atproto/xrpc/dist/index.js
var require_dist = __commonJS({
  "node_modules/@atproto/xrpc/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_client(), exports);
    __exportStar(require_fetch_handler(), exports);
    __exportStar(require_types(), exports);
    __exportStar(require_util(), exports);
    __exportStar(require_xrpc_client(), exports);
    var client_1 = require_client();
    var defaultInst = new client_1.Client();
    exports.default = defaultInst;
  }
});

// lex-api/index.ts
var lex_api_exports = {};
__export(lex_api_exports, {
  AppCertifiedLocation: () => location_exports,
  AppCertifiedLocationRecord: () => AppCertifiedLocationRecord,
  AppCertifiedNS: () => AppCertifiedNS,
  AppGainforestCommonDefs: () => defs_exports,
  AppGainforestNS: () => AppGainforestNS,
  AppGainforestOrganizationDefaultSite: () => defaultSite_exports,
  AppGainforestOrganizationDefaultSiteRecord: () => AppGainforestOrganizationDefaultSiteRecord,
  AppGainforestOrganizationDraftEcocert: () => ecocert_exports,
  AppGainforestOrganizationDraftEcocertRecord: () => AppGainforestOrganizationDraftEcocertRecord,
  AppGainforestOrganizationDraftNS: () => AppGainforestOrganizationDraftNS,
  AppGainforestOrganizationGetIndexedOrganizations: () => getIndexedOrganizations_exports,
  AppGainforestOrganizationInfo: () => info_exports,
  AppGainforestOrganizationInfoRecord: () => AppGainforestOrganizationInfoRecord,
  AppGainforestOrganizationLayer: () => layer_exports,
  AppGainforestOrganizationLayerRecord: () => AppGainforestOrganizationLayerRecord,
  AppGainforestOrganizationNS: () => AppGainforestOrganizationNS,
  AppGainforestOrganizationObservationsDendogram: () => dendogram_exports,
  AppGainforestOrganizationObservationsDendogramRecord: () => AppGainforestOrganizationObservationsDendogramRecord,
  AppGainforestOrganizationObservationsFauna: () => fauna_exports,
  AppGainforestOrganizationObservationsFaunaRecord: () => AppGainforestOrganizationObservationsFaunaRecord,
  AppGainforestOrganizationObservationsFlora: () => flora_exports,
  AppGainforestOrganizationObservationsFloraRecord: () => AppGainforestOrganizationObservationsFloraRecord,
  AppGainforestOrganizationObservationsMeasuredTreesCluster: () => measuredTreesCluster_exports,
  AppGainforestOrganizationObservationsMeasuredTreesClusterRecord: () => AppGainforestOrganizationObservationsMeasuredTreesClusterRecord,
  AppGainforestOrganizationObservationsNS: () => AppGainforestOrganizationObservationsNS,
  AppGainforestOrganizationPredictionsFauna: () => fauna_exports2,
  AppGainforestOrganizationPredictionsFaunaRecord: () => AppGainforestOrganizationPredictionsFaunaRecord,
  AppGainforestOrganizationPredictionsFlora: () => flora_exports2,
  AppGainforestOrganizationPredictionsFloraRecord: () => AppGainforestOrganizationPredictionsFloraRecord,
  AppGainforestOrganizationPredictionsNS: () => AppGainforestOrganizationPredictionsNS,
  AppGainforestOrganizationProject: () => project_exports,
  AppGainforestOrganizationProjectRecord: () => AppGainforestOrganizationProjectRecord,
  AppGainforestOrganizationSite: () => site_exports,
  AppGainforestOrganizationSiteRecord: () => AppGainforestOrganizationSiteRecord,
  AppNS: () => AppNS,
  AtpBaseClient: () => AtpBaseClient,
  ComAtprotoNS: () => ComAtprotoNS,
  ComAtprotoRepoNS: () => ComAtprotoRepoNS,
  ComAtprotoRepoStrongRef: () => strongRef_exports,
  ComNS: () => ComNS,
  OrgHypercertsClaimActivity: () => activity_exports,
  OrgHypercertsClaimActivityRecord: () => OrgHypercertsClaimActivityRecord,
  OrgHypercertsClaimCollection: () => collection_exports,
  OrgHypercertsClaimCollectionRecord: () => OrgHypercertsClaimCollectionRecord,
  OrgHypercertsClaimContribution: () => contribution_exports,
  OrgHypercertsClaimContributionRecord: () => OrgHypercertsClaimContributionRecord,
  OrgHypercertsClaimEvaluation: () => evaluation_exports,
  OrgHypercertsClaimEvaluationRecord: () => OrgHypercertsClaimEvaluationRecord,
  OrgHypercertsClaimEvidence: () => evidence_exports,
  OrgHypercertsClaimEvidenceRecord: () => OrgHypercertsClaimEvidenceRecord,
  OrgHypercertsClaimMeasurement: () => measurement_exports,
  OrgHypercertsClaimMeasurementRecord: () => OrgHypercertsClaimMeasurementRecord,
  OrgHypercertsClaimNS: () => OrgHypercertsClaimNS,
  OrgHypercertsClaimRights: () => rights_exports,
  OrgHypercertsClaimRightsRecord: () => OrgHypercertsClaimRightsRecord,
  OrgHypercertsDefs: () => defs_exports2,
  OrgHypercertsNS: () => OrgHypercertsNS,
  OrgNS: () => OrgNS
});
module.exports = __toCommonJS(lex_api_exports);
var import_xrpc = __toESM(require_dist(), 1);

// lex-api/lexicons.ts
var import_lexicon = require("@atproto/lexicon");

// lex-api/util.ts
function isObject(v) {
  return v != null && typeof v === "object";
}
function is$type($type, id24, hash) {
  return hash === "main" ? $type === id24 : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id24.length + 1 + hash.length && $type.charCodeAt(id24.length) === 35 && $type.startsWith(id24) && $type.endsWith(hash)
  );
}
function is$typed(v, id24, hash) {
  return isObject(v) && "$type" in v && is$type(v.$type, id24, hash);
}
function maybe$typed(v, id24, hash) {
  return isObject(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id24, hash) : true);
}

// lex-api/lexicons.ts
var schemaDict = {
  AppCertifiedLocation: {
    lexicon: 1,
    id: "app.certified.location",
    defs: {
      main: {
        type: "record",
        description: "A location reference",
        key: "any",
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
  AppGainforestOrganizationDraftEcocert: {
    lexicon: 1,
    id: "app.gainforest.organization.draft.ecocert",
    defs: {
      main: {
        type: "record",
        description: "A declaration of an unpublished ecocert for an organization",
        key: "tid",
        record: {
          type: "object",
          required: [
            "title",
            "coverImage",
            "workScopes",
            "workStartDate",
            "workEndDate",
            "description",
            "shortDescription",
            "contributors",
            "site",
            "createdAt"
          ],
          nullable: ["coverImage"],
          properties: {
            title: {
              type: "string",
              description: "The title of the ecocert"
            },
            coverImage: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallImage",
              description: "The cover image of the ecocert"
            },
            workScopes: {
              type: "array",
              description: "The work scopes of the ecocert",
              items: {
                type: "string",
                description: "The work scope of the ecocert"
              }
            },
            workStartDate: {
              type: "string",
              description: "The start date of the work",
              format: "datetime"
            },
            workEndDate: {
              type: "string",
              description: "The end date of the work",
              format: "datetime"
            },
            description: {
              type: "string",
              description: "The description of the ecocert in markdown"
            },
            shortDescription: {
              type: "string",
              description: "The short description of the ecocert in markdown"
            },
            contributors: {
              type: "array",
              description: "The contributors of the ecocert in markdown",
              items: {
                type: "string",
                description: "The contributor of the ecocert"
              }
            },
            site: {
              type: "string",
              format: "at-uri",
              description: "The reference to the site record in the PDS"
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
              description: "The long description of the organization or project in markdown",
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
  AppGainforestOrganizationProject: {
    lexicon: 1,
    id: "app.gainforest.organization.project",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a project for an organization",
        key: "tid",
        record: {
          type: "object",
          required: [
            "name",
            "shortDescription",
            "ecocerts",
            "sites",
            "measuredTreesClusters",
            "layers",
            "createdAt"
          ],
          properties: {
            name: {
              type: "string",
              description: "The name of the site"
            },
            description: {
              type: "string",
              description: "The description of the project in markdown"
            },
            shortDescription: {
              type: "string",
              description: "The short description of the project"
            },
            ecocerts: {
              type: "array",
              description: "An array of at-uris pointing to the records of the ecocerts related to the project",
              items: {
                type: "string",
                format: "at-uri",
                description: "The reference to the ecocert record in the PDS"
              }
            },
            layers: {
              type: "array",
              description: "An array of at-uris pointing to the records of the layers related to the project",
              items: {
                type: "string",
                format: "at-uri",
                description: "The reference to the layer record in the PDS"
              }
            },
            sites: {
              type: "array",
              description: "An array of at-uris pointing to the records of the sites related to the project",
              items: {
                type: "string",
                format: "at-uri",
                description: "The reference to the site record in the PDS"
              }
            },
            measuredTreesClusters: {
              type: "array",
              description: "An array of at-uris pointing to the records of the measured trees clusters related to the project",
              items: {
                type: "string",
                format: "at-uri",
                description: "The reference to the measured trees cluster record in the PDS"
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
  AppGainforestOrganizationSite: {
    lexicon: 1,
    id: "app.gainforest.organization.site",
    defs: {
      main: {
        type: "record",
        description: "A declaration of a site for an organization",
        key: "tid",
        record: {
          type: "object",
          required: ["name", "lat", "lon", "area", "shapefile", "createdAt"],
          properties: {
            name: {
              type: "string",
              description: "The name of the site"
            },
            lat: {
              type: "string",
              description: "The latitude of the centerpoint of the site"
            },
            lon: {
              type: "string",
              description: "The longitude of the centerpoint of the site"
            },
            area: {
              type: "string",
              description: "The area of the site in hectares"
            },
            shapefile: {
              type: "ref",
              ref: "lex:app.gainforest.common.defs#smallBlob",
              description: "A blob pointing to a geoJSON file containing the site boundaries"
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
              description: "Title of the hypercert",
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
              description: "The hypercert visual representation as a URI or image blob"
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
              description: "A strong reference to the contributions done to create the impact in the hypercerts. The record referenced must conform with the lexicon org.hypercerts.claim.contribution",
              items: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              }
            },
            rights: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the rights that this hypercert has. The record referenced must conform with the lexicon org.hypercerts.claim.rights"
            },
            location: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the location where the work for done hypercert was located. The record referenced must conform with the lexicon app.certified.location"
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
        description: "Logical scope of the work using label-based conditions. All labels in `allOf` must apply; at least one label in `anyOf` must apply if provided; no label in `noneOf` may apply.",
        properties: {
          allOf: {
            type: "array",
            description: "Labels that MUST all hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          anyOf: {
            type: "array",
            description: "Labels of which AT LEAST ONE must hold (optional). If omitted or empty, imposes no additional condition.",
            items: {
              type: "string"
            },
            maxLength: 100
          },
          noneOf: {
            type: "array",
            description: "Labels that MUST NOT hold for the scope to apply.",
            items: {
              type: "string"
            },
            maxLength: 100
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
          required: ["title", "claims", "createdAt"],
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
            coverPhoto: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "The cover photo of this collection (either in URI format or in a blob)."
            },
            claims: {
              type: "array",
              description: "Array of claims with their associated weights in this collection",
              items: {
                type: "ref",
                ref: "lex:org.hypercerts.claim.collection#claimItem"
              }
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this record was originally created"
            }
          }
        }
      },
      claimItem: {
        type: "object",
        required: ["claim", "weight"],
        properties: {
          claim: {
            type: "ref",
            ref: "lex:com.atproto.repo.strongRef",
            description: "A strong reference to a hypercert claim record. This claim must conform to the lexicon org.hypercerts.claim.activity"
          },
          weight: {
            type: "string",
            description: "The weight/importance of this hypercert claim in the collection (a percentage from 0-100, stored as a string to avoid float precision issues). The total claim weights should add up to 100."
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
        key: "any",
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
      main: {
        type: "record",
        description: "An evaluation of a hypercert or other claim",
        key: "tid",
        record: {
          type: "object",
          required: ["subject", "evaluators", "summary", "createdAt"],
          properties: {
            subject: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the evaluated claim. (e.g measurement, hypercert, contribution, etc)"
            },
            evaluators: {
              type: "array",
              description: "DIDs of the evaluators",
              items: {
                type: "string",
                format: "did"
              },
              maxLength: 100
            },
            evaluations: {
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
            summary: {
              type: "string",
              description: "Brief evaluation summary",
              maxLength: 5e3,
              maxGraphemes: 1e3
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
        description: "A piece of evidence supporting a hypercert claim",
        key: "any",
        record: {
          type: "object",
          required: ["content", "title", "createdAt"],
          properties: {
            activity: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the activity this evidence is for. The record referenced must conform with the lexicon org.hypercerts.claim.activity"
            },
            content: {
              type: "union",
              refs: [
                "lex:org.hypercerts.defs#uri",
                "lex:org.hypercerts.defs#smallBlob"
              ],
              description: "A piece of evidence (URI or blobs) supporting a hypercert claim"
            },
            title: {
              type: "string",
              maxLength: 256,
              description: "Title to describe the nature of the evidence"
            },
            shortDescription: {
              type: "string",
              maxLength: 3e3,
              maxGraphemes: 300,
              description: "Short description explaining what this evidence demonstrates or proves"
            },
            description: {
              type: "string",
              description: "Longer description describing the impact claim evidence.",
              maxLength: 3e4,
              maxGraphemes: 3e3
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Client-declared timestamp when this hypercert claim was originally created"
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
        description: "External measurement data supporting a hypercert claim",
        key: "tid",
        record: {
          type: "object",
          required: ["activity", "measurers", "metric", "value", "createdAt"],
          properties: {
            activity: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef",
              description: "A strong reference to the activity that this measurement is for. The record referenced must conform with the lexicon org.hypercerts.claim.activity"
            },
            measurers: {
              type: "array",
              description: "DIDs of the entity (or entities) that measured this data",
              items: {
                type: "string",
                format: "did"
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
            measurementMethodType: {
              type: "string",
              description: "Short identifier for the measurement methodology",
              maxLength: 30
            },
            measurementMethodURI: {
              type: "string",
              format: "uri",
              description: "URI to methodology documentation, standard protocol, or measurement procedure"
            },
            evidenceURI: {
              type: "array",
              description: "URIs to supporting evidence or data",
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
  OrgHypercertsClaimRights: {
    lexicon: 1,
    id: "org.hypercerts.claim.rights",
    defs: {
      main: {
        type: "record",
        description: "Describes the rights that a contributor and/or an owner has, such as whether the hypercert can be sold, transferred, and under what conditions.",
        key: "any",
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
  }
};
var schemas = Object.values(schemaDict);
var lexicons = new import_lexicon.Lexicons(schemas);
function validate(v, id24, hash, requiredType) {
  return (requiredType ? is$typed : maybe$typed)(v, id24, hash) ? lexicons.validate(`${id24}#${hash}`, v) : {
    success: false,
    error: new import_lexicon.ValidationError(
      `Must be an object with "${hash === "main" ? id24 : `${id24}#${hash}`}" $type property`
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

// lex-api/types/app/gainforest/common/defs.ts
var defs_exports = {};
__export(defs_exports, {
  isIndexedOrganization: () => isIndexedOrganization,
  isLargeBlob: () => isLargeBlob,
  isLargeImage: () => isLargeImage,
  isSmallBlob: () => isSmallBlob,
  isSmallImage: () => isSmallImage,
  isUri: () => isUri,
  validateIndexedOrganization: () => validateIndexedOrganization,
  validateLargeBlob: () => validateLargeBlob,
  validateLargeImage: () => validateLargeImage,
  validateSmallBlob: () => validateSmallBlob,
  validateSmallImage: () => validateSmallImage,
  validateUri: () => validateUri
});
var is$typed3 = is$typed;
var validate3 = validate;
var id2 = "app.gainforest.common.defs";
var hashUri = "uri";
function isUri(v) {
  return is$typed3(v, id2, hashUri);
}
function validateUri(v) {
  return validate3(v, id2, hashUri);
}
var hashSmallBlob = "smallBlob";
function isSmallBlob(v) {
  return is$typed3(v, id2, hashSmallBlob);
}
function validateSmallBlob(v) {
  return validate3(v, id2, hashSmallBlob);
}
var hashLargeBlob = "largeBlob";
function isLargeBlob(v) {
  return is$typed3(v, id2, hashLargeBlob);
}
function validateLargeBlob(v) {
  return validate3(v, id2, hashLargeBlob);
}
var hashSmallImage = "smallImage";
function isSmallImage(v) {
  return is$typed3(v, id2, hashSmallImage);
}
function validateSmallImage(v) {
  return validate3(v, id2, hashSmallImage);
}
var hashLargeImage = "largeImage";
function isLargeImage(v) {
  return is$typed3(v, id2, hashLargeImage);
}
function validateLargeImage(v) {
  return validate3(v, id2, hashLargeImage);
}
var hashIndexedOrganization = "indexedOrganization";
function isIndexedOrganization(v) {
  return is$typed3(v, id2, hashIndexedOrganization);
}
function validateIndexedOrganization(v) {
  return validate3(v, id2, hashIndexedOrganization);
}

// lex-api/types/app/gainforest/organization/defaultSite.ts
var defaultSite_exports = {};
__export(defaultSite_exports, {
  isMain: () => isMain2,
  isRecord: () => isMain2,
  validateMain: () => validateMain2,
  validateRecord: () => validateMain2
});
var is$typed4 = is$typed;
var validate4 = validate;
var id3 = "app.gainforest.organization.defaultSite";
var hashMain2 = "main";
function isMain2(v) {
  return is$typed4(v, id3, hashMain2);
}
function validateMain2(v) {
  return validate4(v, id3, hashMain2, true);
}

// lex-api/types/app/gainforest/organization/draft/ecocert.ts
var ecocert_exports = {};
__export(ecocert_exports, {
  isMain: () => isMain3,
  isRecord: () => isMain3,
  validateMain: () => validateMain3,
  validateRecord: () => validateMain3
});
var is$typed5 = is$typed;
var validate5 = validate;
var id4 = "app.gainforest.organization.draft.ecocert";
var hashMain3 = "main";
function isMain3(v) {
  return is$typed5(v, id4, hashMain3);
}
function validateMain3(v) {
  return validate5(v, id4, hashMain3, true);
}

// lex-api/types/app/gainforest/organization/getIndexedOrganizations.ts
var getIndexedOrganizations_exports = {};
__export(getIndexedOrganizations_exports, {
  toKnownErr: () => toKnownErr
});
function toKnownErr(e) {
  return e;
}

// lex-api/types/app/gainforest/organization/info.ts
var info_exports = {};
__export(info_exports, {
  isMain: () => isMain4,
  isRecord: () => isMain4,
  validateMain: () => validateMain4,
  validateRecord: () => validateMain4
});
var is$typed6 = is$typed;
var validate6 = validate;
var id5 = "app.gainforest.organization.info";
var hashMain4 = "main";
function isMain4(v) {
  return is$typed6(v, id5, hashMain4);
}
function validateMain4(v) {
  return validate6(v, id5, hashMain4, true);
}

// lex-api/types/app/gainforest/organization/layer.ts
var layer_exports = {};
__export(layer_exports, {
  isMain: () => isMain5,
  isRecord: () => isMain5,
  validateMain: () => validateMain5,
  validateRecord: () => validateMain5
});
var is$typed7 = is$typed;
var validate7 = validate;
var id6 = "app.gainforest.organization.layer";
var hashMain5 = "main";
function isMain5(v) {
  return is$typed7(v, id6, hashMain5);
}
function validateMain5(v) {
  return validate7(v, id6, hashMain5, true);
}

// lex-api/types/app/gainforest/organization/observations/dendogram.ts
var dendogram_exports = {};
__export(dendogram_exports, {
  isMain: () => isMain6,
  isRecord: () => isMain6,
  validateMain: () => validateMain6,
  validateRecord: () => validateMain6
});
var is$typed8 = is$typed;
var validate8 = validate;
var id7 = "app.gainforest.organization.observations.dendogram";
var hashMain6 = "main";
function isMain6(v) {
  return is$typed8(v, id7, hashMain6);
}
function validateMain6(v) {
  return validate8(v, id7, hashMain6, true);
}

// lex-api/types/app/gainforest/organization/observations/fauna.ts
var fauna_exports = {};
__export(fauna_exports, {
  isMain: () => isMain7,
  isRecord: () => isMain7,
  validateMain: () => validateMain7,
  validateRecord: () => validateMain7
});
var is$typed9 = is$typed;
var validate9 = validate;
var id8 = "app.gainforest.organization.observations.fauna";
var hashMain7 = "main";
function isMain7(v) {
  return is$typed9(v, id8, hashMain7);
}
function validateMain7(v) {
  return validate9(v, id8, hashMain7, true);
}

// lex-api/types/app/gainforest/organization/observations/flora.ts
var flora_exports = {};
__export(flora_exports, {
  isMain: () => isMain8,
  isRecord: () => isMain8,
  validateMain: () => validateMain8,
  validateRecord: () => validateMain8
});
var is$typed10 = is$typed;
var validate10 = validate;
var id9 = "app.gainforest.organization.observations.flora";
var hashMain8 = "main";
function isMain8(v) {
  return is$typed10(v, id9, hashMain8);
}
function validateMain8(v) {
  return validate10(v, id9, hashMain8, true);
}

// lex-api/types/app/gainforest/organization/observations/measuredTreesCluster.ts
var measuredTreesCluster_exports = {};
__export(measuredTreesCluster_exports, {
  isMain: () => isMain9,
  isRecord: () => isMain9,
  validateMain: () => validateMain9,
  validateRecord: () => validateMain9
});
var is$typed11 = is$typed;
var validate11 = validate;
var id10 = "app.gainforest.organization.observations.measuredTreesCluster";
var hashMain9 = "main";
function isMain9(v) {
  return is$typed11(v, id10, hashMain9);
}
function validateMain9(v) {
  return validate11(v, id10, hashMain9, true);
}

// lex-api/types/app/gainforest/organization/predictions/fauna.ts
var fauna_exports2 = {};
__export(fauna_exports2, {
  isMain: () => isMain10,
  isRecord: () => isMain10,
  validateMain: () => validateMain10,
  validateRecord: () => validateMain10
});
var is$typed12 = is$typed;
var validate12 = validate;
var id11 = "app.gainforest.organization.predictions.fauna";
var hashMain10 = "main";
function isMain10(v) {
  return is$typed12(v, id11, hashMain10);
}
function validateMain10(v) {
  return validate12(v, id11, hashMain10, true);
}

// lex-api/types/app/gainforest/organization/predictions/flora.ts
var flora_exports2 = {};
__export(flora_exports2, {
  isMain: () => isMain11,
  isRecord: () => isMain11,
  validateMain: () => validateMain11,
  validateRecord: () => validateMain11
});
var is$typed13 = is$typed;
var validate13 = validate;
var id12 = "app.gainforest.organization.predictions.flora";
var hashMain11 = "main";
function isMain11(v) {
  return is$typed13(v, id12, hashMain11);
}
function validateMain11(v) {
  return validate13(v, id12, hashMain11, true);
}

// lex-api/types/app/gainforest/organization/project.ts
var project_exports = {};
__export(project_exports, {
  isMain: () => isMain12,
  isRecord: () => isMain12,
  validateMain: () => validateMain12,
  validateRecord: () => validateMain12
});
var is$typed14 = is$typed;
var validate14 = validate;
var id13 = "app.gainforest.organization.project";
var hashMain12 = "main";
function isMain12(v) {
  return is$typed14(v, id13, hashMain12);
}
function validateMain12(v) {
  return validate14(v, id13, hashMain12, true);
}

// lex-api/types/app/gainforest/organization/site.ts
var site_exports = {};
__export(site_exports, {
  isMain: () => isMain13,
  isRecord: () => isMain13,
  validateMain: () => validateMain13,
  validateRecord: () => validateMain13
});
var is$typed15 = is$typed;
var validate15 = validate;
var id14 = "app.gainforest.organization.site";
var hashMain13 = "main";
function isMain13(v) {
  return is$typed15(v, id14, hashMain13);
}
function validateMain13(v) {
  return validate15(v, id14, hashMain13, true);
}

// lex-api/types/com/atproto/repo/strongRef.ts
var strongRef_exports = {};
__export(strongRef_exports, {
  isMain: () => isMain14,
  validateMain: () => validateMain14
});
var is$typed16 = is$typed;
var validate16 = validate;
var id15 = "com.atproto.repo.strongRef";
var hashMain14 = "main";
function isMain14(v) {
  return is$typed16(v, id15, hashMain14);
}
function validateMain14(v) {
  return validate16(v, id15, hashMain14);
}

// lex-api/types/org/hypercerts/claim/activity.ts
var activity_exports = {};
__export(activity_exports, {
  isMain: () => isMain15,
  isRecord: () => isMain15,
  isWorkScope: () => isWorkScope,
  validateMain: () => validateMain15,
  validateRecord: () => validateMain15,
  validateWorkScope: () => validateWorkScope
});
var is$typed17 = is$typed;
var validate17 = validate;
var id16 = "org.hypercerts.claim.activity";
var hashMain15 = "main";
function isMain15(v) {
  return is$typed17(v, id16, hashMain15);
}
function validateMain15(v) {
  return validate17(v, id16, hashMain15, true);
}
var hashWorkScope = "workScope";
function isWorkScope(v) {
  return is$typed17(v, id16, hashWorkScope);
}
function validateWorkScope(v) {
  return validate17(v, id16, hashWorkScope);
}

// lex-api/types/org/hypercerts/claim/collection.ts
var collection_exports = {};
__export(collection_exports, {
  isClaimItem: () => isClaimItem,
  isMain: () => isMain16,
  isRecord: () => isMain16,
  validateClaimItem: () => validateClaimItem,
  validateMain: () => validateMain16,
  validateRecord: () => validateMain16
});
var is$typed18 = is$typed;
var validate18 = validate;
var id17 = "org.hypercerts.claim.collection";
var hashMain16 = "main";
function isMain16(v) {
  return is$typed18(v, id17, hashMain16);
}
function validateMain16(v) {
  return validate18(v, id17, hashMain16, true);
}
var hashClaimItem = "claimItem";
function isClaimItem(v) {
  return is$typed18(v, id17, hashClaimItem);
}
function validateClaimItem(v) {
  return validate18(v, id17, hashClaimItem);
}

// lex-api/types/org/hypercerts/claim/contribution.ts
var contribution_exports = {};
__export(contribution_exports, {
  isMain: () => isMain17,
  isRecord: () => isMain17,
  validateMain: () => validateMain17,
  validateRecord: () => validateMain17
});
var is$typed19 = is$typed;
var validate19 = validate;
var id18 = "org.hypercerts.claim.contribution";
var hashMain17 = "main";
function isMain17(v) {
  return is$typed19(v, id18, hashMain17);
}
function validateMain17(v) {
  return validate19(v, id18, hashMain17, true);
}

// lex-api/types/org/hypercerts/claim/evaluation.ts
var evaluation_exports = {};
__export(evaluation_exports, {
  isMain: () => isMain18,
  isRecord: () => isMain18,
  validateMain: () => validateMain18,
  validateRecord: () => validateMain18
});
var is$typed20 = is$typed;
var validate20 = validate;
var id19 = "org.hypercerts.claim.evaluation";
var hashMain18 = "main";
function isMain18(v) {
  return is$typed20(v, id19, hashMain18);
}
function validateMain18(v) {
  return validate20(v, id19, hashMain18, true);
}

// lex-api/types/org/hypercerts/claim/evidence.ts
var evidence_exports = {};
__export(evidence_exports, {
  isMain: () => isMain19,
  isRecord: () => isMain19,
  validateMain: () => validateMain19,
  validateRecord: () => validateMain19
});
var is$typed21 = is$typed;
var validate21 = validate;
var id20 = "org.hypercerts.claim.evidence";
var hashMain19 = "main";
function isMain19(v) {
  return is$typed21(v, id20, hashMain19);
}
function validateMain19(v) {
  return validate21(v, id20, hashMain19, true);
}

// lex-api/types/org/hypercerts/claim/measurement.ts
var measurement_exports = {};
__export(measurement_exports, {
  isMain: () => isMain20,
  isRecord: () => isMain20,
  validateMain: () => validateMain20,
  validateRecord: () => validateMain20
});
var is$typed22 = is$typed;
var validate22 = validate;
var id21 = "org.hypercerts.claim.measurement";
var hashMain20 = "main";
function isMain20(v) {
  return is$typed22(v, id21, hashMain20);
}
function validateMain20(v) {
  return validate22(v, id21, hashMain20, true);
}

// lex-api/types/org/hypercerts/claim/rights.ts
var rights_exports = {};
__export(rights_exports, {
  isMain: () => isMain21,
  isRecord: () => isMain21,
  validateMain: () => validateMain21,
  validateRecord: () => validateMain21
});
var is$typed23 = is$typed;
var validate23 = validate;
var id22 = "org.hypercerts.claim.rights";
var hashMain21 = "main";
function isMain21(v) {
  return is$typed23(v, id22, hashMain21);
}
function validateMain21(v) {
  return validate23(v, id22, hashMain21, true);
}

// lex-api/types/org/hypercerts/defs.ts
var defs_exports2 = {};
__export(defs_exports2, {
  isLargeBlob: () => isLargeBlob2,
  isLargeImage: () => isLargeImage2,
  isSmallBlob: () => isSmallBlob2,
  isSmallImage: () => isSmallImage2,
  isUri: () => isUri2,
  validateLargeBlob: () => validateLargeBlob2,
  validateLargeImage: () => validateLargeImage2,
  validateSmallBlob: () => validateSmallBlob2,
  validateSmallImage: () => validateSmallImage2,
  validateUri: () => validateUri2
});
var is$typed24 = is$typed;
var validate24 = validate;
var id23 = "org.hypercerts.defs";
var hashUri2 = "uri";
function isUri2(v) {
  return is$typed24(v, id23, hashUri2);
}
function validateUri2(v) {
  return validate24(v, id23, hashUri2);
}
var hashSmallBlob2 = "smallBlob";
function isSmallBlob2(v) {
  return is$typed24(v, id23, hashSmallBlob2);
}
function validateSmallBlob2(v) {
  return validate24(v, id23, hashSmallBlob2);
}
var hashLargeBlob2 = "largeBlob";
function isLargeBlob2(v) {
  return is$typed24(v, id23, hashLargeBlob2);
}
function validateLargeBlob2(v) {
  return validate24(v, id23, hashLargeBlob2);
}
var hashSmallImage2 = "smallImage";
function isSmallImage2(v) {
  return is$typed24(v, id23, hashSmallImage2);
}
function validateSmallImage2(v) {
  return validate24(v, id23, hashSmallImage2);
}
var hashLargeImage2 = "largeImage";
function isLargeImage2(v) {
  return is$typed24(v, id23, hashLargeImage2);
}
function validateLargeImage2(v) {
  return validate24(v, id23, hashLargeImage2);
}

// lex-api/index.ts
var AtpBaseClient = class extends import_xrpc.XrpcClient {
  app;
  com;
  org;
  constructor(options) {
    super(options, schemas);
    this.app = new AppNS(this);
    this.com = new ComNS(this);
    this.org = new OrgNS(this);
  }
  /** @deprecated use `this` instead */
  get xrpc() {
    return this;
  }
};
var AppNS = class {
  _client;
  certified;
  gainforest;
  constructor(client) {
    this._client = client;
    this.certified = new AppCertifiedNS(client);
    this.gainforest = new AppGainforestNS(client);
  }
};
var AppCertifiedNS = class {
  _client;
  location;
  constructor(client) {
    this._client = client;
    this.location = new AppCertifiedLocationRecord(client);
  }
};
var AppCertifiedLocationRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.certified.location",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.certified.location",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.certified.location";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.certified.location";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.certified.location", ...params },
      { headers }
    );
  }
};
var AppGainforestNS = class {
  _client;
  organization;
  constructor(client) {
    this._client = client;
    this.organization = new AppGainforestOrganizationNS(client);
  }
};
var AppGainforestOrganizationNS = class {
  _client;
  defaultSite;
  info;
  layer;
  project;
  site;
  draft;
  observations;
  predictions;
  constructor(client) {
    this._client = client;
    this.draft = new AppGainforestOrganizationDraftNS(client);
    this.observations = new AppGainforestOrganizationObservationsNS(client);
    this.predictions = new AppGainforestOrganizationPredictionsNS(client);
    this.defaultSite = new AppGainforestOrganizationDefaultSiteRecord(client);
    this.info = new AppGainforestOrganizationInfoRecord(client);
    this.layer = new AppGainforestOrganizationLayerRecord(client);
    this.project = new AppGainforestOrganizationProjectRecord(client);
    this.site = new AppGainforestOrganizationSiteRecord(client);
  }
  getIndexedOrganizations(params, opts) {
    return this._client.call(
      "app.gainforest.organization.getIndexedOrganizations",
      params,
      void 0,
      opts
    );
  }
};
var AppGainforestOrganizationDraftNS = class {
  _client;
  ecocert;
  constructor(client) {
    this._client = client;
    this.ecocert = new AppGainforestOrganizationDraftEcocertRecord(client);
  }
};
var AppGainforestOrganizationDraftEcocertRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.draft.ecocert",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.draft.ecocert",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.draft.ecocert";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.draft.ecocert";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.draft.ecocert", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsNS = class {
  _client;
  dendogram;
  fauna;
  flora;
  measuredTreesCluster;
  constructor(client) {
    this._client = client;
    this.dendogram = new AppGainforestOrganizationObservationsDendogramRecord(
      client
    );
    this.fauna = new AppGainforestOrganizationObservationsFaunaRecord(client);
    this.flora = new AppGainforestOrganizationObservationsFloraRecord(client);
    this.measuredTreesCluster = new AppGainforestOrganizationObservationsMeasuredTreesClusterRecord(
      client
    );
  }
};
var AppGainforestOrganizationObservationsDendogramRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.dendogram",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.dendogram",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.dendogram";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.dendogram";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.dendogram",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsFaunaRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.fauna",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.fauna",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.fauna";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.fauna";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.fauna",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsFloraRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.flora",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.flora",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.flora";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.flora";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.flora",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationObservationsMeasuredTreesClusterRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.observations.measuredTreesCluster",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.observations.measuredTreesCluster",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.observations.measuredTreesCluster";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.observations.measuredTreesCluster";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.observations.measuredTreesCluster",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationPredictionsNS = class {
  _client;
  fauna;
  flora;
  constructor(client) {
    this._client = client;
    this.fauna = new AppGainforestOrganizationPredictionsFaunaRecord(client);
    this.flora = new AppGainforestOrganizationPredictionsFloraRecord(client);
  }
};
var AppGainforestOrganizationPredictionsFaunaRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.predictions.fauna",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.predictions.fauna",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.fauna";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.fauna";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.predictions.fauna",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationPredictionsFloraRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.predictions.flora",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.predictions.flora",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.flora";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.predictions.flora";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      {
        collection: "app.gainforest.organization.predictions.flora",
        ...params
      },
      { headers }
    );
  }
};
var AppGainforestOrganizationDefaultSiteRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.defaultSite",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.defaultSite",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.defaultSite";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.defaultSite";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.defaultSite", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationInfoRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.info",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.info",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.info";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      {
        collection,
        rkey: "self",
        ...params,
        record: { ...record, $type: collection }
      },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.info";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.info", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationLayerRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.layer",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.layer",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.layer";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.layer";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.layer", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationProjectRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.project",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.project",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.project";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.project";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.project", ...params },
      { headers }
    );
  }
};
var AppGainforestOrganizationSiteRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "app.gainforest.organization.site",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "app.gainforest.organization.site",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "app.gainforest.organization.site";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "app.gainforest.organization.site";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "app.gainforest.organization.site", ...params },
      { headers }
    );
  }
};
var ComNS = class {
  _client;
  atproto;
  constructor(client) {
    this._client = client;
    this.atproto = new ComAtprotoNS(client);
  }
};
var ComAtprotoNS = class {
  _client;
  repo;
  constructor(client) {
    this._client = client;
    this.repo = new ComAtprotoRepoNS(client);
  }
};
var ComAtprotoRepoNS = class {
  _client;
  constructor(client) {
    this._client = client;
  }
};
var OrgNS = class {
  _client;
  hypercerts;
  constructor(client) {
    this._client = client;
    this.hypercerts = new OrgHypercertsNS(client);
  }
};
var OrgHypercertsNS = class {
  _client;
  claim;
  constructor(client) {
    this._client = client;
    this.claim = new OrgHypercertsClaimNS(client);
  }
};
var OrgHypercertsClaimNS = class {
  _client;
  activity;
  collection;
  contribution;
  evaluation;
  evidence;
  measurement;
  rights;
  constructor(client) {
    this._client = client;
    this.activity = new OrgHypercertsClaimActivityRecord(client);
    this.collection = new OrgHypercertsClaimCollectionRecord(client);
    this.contribution = new OrgHypercertsClaimContributionRecord(client);
    this.evaluation = new OrgHypercertsClaimEvaluationRecord(client);
    this.evidence = new OrgHypercertsClaimEvidenceRecord(client);
    this.measurement = new OrgHypercertsClaimMeasurementRecord(client);
    this.rights = new OrgHypercertsClaimRightsRecord(client);
  }
};
var OrgHypercertsClaimActivityRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.activity",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.activity",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.activity";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.activity";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.activity", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimCollectionRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.collection",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.collection",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.collection";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.collection";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.collection", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimContributionRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.contribution",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.contribution",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.contribution";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.contribution";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.contribution", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimEvaluationRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.evaluation",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.evaluation",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.evaluation";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.evaluation";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.evaluation", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimEvidenceRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.evidence",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.evidence",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.evidence";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.evidence";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.evidence", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimMeasurementRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.measurement",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.measurement",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.measurement";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.measurement";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.measurement", ...params },
      { headers }
    );
  }
};
var OrgHypercertsClaimRightsRecord = class {
  _client;
  constructor(client) {
    this._client = client;
  }
  async list(params) {
    const res = await this._client.call("com.atproto.repo.listRecords", {
      collection: "org.hypercerts.claim.rights",
      ...params
    });
    return res.data;
  }
  async get(params) {
    const res = await this._client.call("com.atproto.repo.getRecord", {
      collection: "org.hypercerts.claim.rights",
      ...params
    });
    return res.data;
  }
  async create(params, record, headers) {
    const collection = "org.hypercerts.claim.rights";
    const res = await this._client.call(
      "com.atproto.repo.createRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async put(params, record, headers) {
    const collection = "org.hypercerts.claim.rights";
    const res = await this._client.call(
      "com.atproto.repo.putRecord",
      void 0,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: "application/json", headers }
    );
    return res.data;
  }
  async delete(params, headers) {
    await this._client.call(
      "com.atproto.repo.deleteRecord",
      void 0,
      { collection: "org.hypercerts.claim.rights", ...params },
      { headers }
    );
  }
};
//# sourceMappingURL=index.cjs.map