var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// node_modules/@atproto/xrpc/dist/types.js
var require_types = __commonJS({
  "node_modules/@atproto/xrpc/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XRPCInvalidResponseError = exports.XRPCError = exports.XRPCResponse = exports.ResponseTypeStrings = exports.ResponseType = exports.errorResponseBody = void 0;
    exports.httpResponseCodeToEnum = httpResponseCodeToEnum;
    exports.httpResponseCodeToName = httpResponseCodeToName;
    exports.httpResponseCodeToString = httpResponseCodeToString;
    var zod_1 = __require("zod");
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
    var XRPCError6 = class _XRPCError extends Error {
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
    exports.XRPCError = XRPCError6;
    var XRPCInvalidResponseError = class extends XRPCError6 {
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
    var lexicon_1 = __require("@atproto/lexicon");
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
    var lexicon_1 = __require("@atproto/lexicon");
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
    var lexicon_1 = __require("@atproto/lexicon");
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

// src/index.ts
import { z as z23 } from "zod";

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

// src/lib/geojson/validate.ts
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

// src/server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";

// src/server/session.ts
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function encrypt(payload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(SECRET_KEY);
}
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
async function saveSession(session, service = "climateai.org") {
  const cookieStore = await cookies();
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
  const cookieStore = await cookies();
  cookieStore.delete(`${service}_session`);
}

// src/utilities/transformer.ts
import superjson from "superjson";

// src/zod-schemas/blobref.ts
import z from "zod";
import { CID } from "multiformats/cid";
import { BlobRef as BlobRef2 } from "@atproto/lexicon";
var BlobRefGeneratorSchema = z.object({
  $type: z.literal("blob-ref-generator"),
  ref: z.object({
    $link: z.string()
  }),
  mimeType: z.string(),
  size: z.number()
});
var toBlobRef = (input) => {
  const validCID = CID.parse(
    input.ref.$link
  );
  return BlobRef2.fromJsonRef({
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

// src/lib/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Set) && !(value instanceof Map);
};

// src/utilities/transformer.ts
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
import z3 from "zod";

// src/server/utils/agent.ts
import { Agent, CredentialSession } from "@atproto/api";
import { TRPCError as TRPCError2 } from "@trpc/server";
var getReadAgent = (pdsDomain) => {
  return new Agent({
    service: new URL(`https://${pdsDomain}`)
  });
};
var getWriteAgent = async (pdsDomain) => {
  const session = await getSessionFromRequest(pdsDomain);
  if (!session)
    throw new TRPCError2({
      code: "UNAUTHORIZED",
      message: "You are not authorized."
    });
  const credentialSession = new CredentialSession(
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
    throw new TRPCError2({
      code: "UNAUTHORIZED",
      message: "Failed to resume session."
    });
  return new Agent(credentialSession);
};

// src/zod-schemas/file.ts
import z2 from "zod";
var FileGeneratorSchema = z2.object({
  name: z2.string(),
  type: z2.string(),
  dataBase64: z2.string()
});
var toFile = async (fileGenerator) => {
  const file2 = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  return file2;
};

// src/server/routers/atproto/common/uploadFileAsBlob.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
var uploadFileAsBlobPure = async (file2, agent) => {
  let fileToUpload;
  if (file2 instanceof File) {
    fileToUpload = file2;
  } else {
    fileToUpload = await toFile(file2);
  }
  const response = await agent.uploadBlob(fileToUpload);
  if (response.success !== true) {
    throw new TRPCError3({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload file as blob."
    });
  }
  return response.data;
};
var uploadFileAsBlobFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z3.object({
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
import { CredentialSession as CredentialSession2 } from "@atproto/api";
import { TRPCError as TRPCError4 } from "@trpc/server";
import z4 from "zod";
var loginFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z4.object({
      handlePrefix: z4.string().regex(/^^[a-zA-Z0-9-]+$/),
      // alphanumerics and hyphens only
      service: allowedPDSDomainSchema,
      password: z4.string()
    })
  ).mutation(async ({ input }) => {
    const session = new CredentialSession2(
      new URL(`https://${input.service}`)
    );
    const result = await session.login({
      identifier: `${input.handlePrefix}.${input.service}`,
      password: input.password
    });
    if (!result.success) {
      throw new TRPCError4({
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
import { TRPCError as TRPCError5 } from "@trpc/server";
import z5 from "zod";
var resumeFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z5.object({
      service: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const session = await getSessionFromRequest(input.service);
    if (!session) {
      throw new TRPCError5({
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
import z6 from "zod";
var logoutFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z6.object({
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
import { z as z7 } from "zod";

// src/lib/tryCatch.ts
var tryCatch = async (promise) => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};

// src/server/routers/atproto/gainforest/organizationInfo/get.ts
var import_xrpc2 = __toESM(require_dist(), 1);

// lex-api/index.ts
var import_xrpc = __toESM(require_dist(), 1);

// lex-api/lexicons.ts
import {
  Lexicons,
  ValidationError
} from "@atproto/lexicon";

// lex-api/util.ts
function isObject2(v) {
  return v != null && typeof v === "object";
}
function is$type($type, id8, hash) {
  return hash === "main" ? $type === id8 : (
    // $type === `${id}#${hash}`
    typeof $type === "string" && $type.length === id8.length + 1 + hash.length && $type.charCodeAt(id8.length) === 35 && $type.startsWith(id8) && $type.endsWith(hash)
  );
}
function is$typed(v, id8, hash) {
  return isObject2(v) && "$type" in v && is$type(v.$type, id8, hash);
}
function maybe$typed(v, id8, hash) {
  return isObject2(v) && ("$type" in v ? v.$type === void 0 || is$type(v.$type, id8, hash) : true);
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
var lexicons = new Lexicons(schemas);
function validate(v, id8, hash, requiredType) {
  return (requiredType ? is$typed : maybe$typed)(v, id8, hash) ? lexicons.validate(`${id8}#${hash}`, v) : {
    success: false,
    error: new ValidationError(
      `Must be an object with "${hash === "main" ? id8 : `${id8}#${hash}`}" $type property`
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

// lex-api/types/app/gainforest/organization/observations/measuredTreesCluster.ts
var measuredTreesCluster_exports = {};
__export(measuredTreesCluster_exports, {
  isMain: () => isMain4,
  isRecord: () => isMain4,
  validateMain: () => validateMain4,
  validateRecord: () => validateMain4
});
var is$typed5 = is$typed;
var validate5 = validate;
var id4 = "app.gainforest.organization.observations.measuredTreesCluster";
var hashMain4 = "main";
function isMain4(v) {
  return is$typed5(v, id4, hashMain4);
}
function validateMain4(v) {
  return validate5(v, id4, hashMain4, true);
}

// lex-api/types/app/gainforest/organization/site.ts
var site_exports = {};
__export(site_exports, {
  isMain: () => isMain5,
  isRecord: () => isMain5,
  validateMain: () => validateMain5,
  validateRecord: () => validateMain5
});
var is$typed6 = is$typed;
var validate6 = validate;
var id5 = "app.gainforest.organization.site";
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
  isMain: () => isMain6,
  isRecord: () => isMain6,
  isWorkScope: () => isWorkScope,
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

// src/server/utils/classify-xrpc-error.ts
import { TRPCError as TRPCError6 } from "@trpc/server";
var xrpcErrorToTRPCError = (error) => {
  if (error.error === "InvalidRequest") {
    return new TRPCError6({
      code: "BAD_REQUEST",
      message: "This resource does not exist."
    });
  } else if (error.error === "RecordNotFound") {
    return new TRPCError6({
      code: "NOT_FOUND",
      message: "The resource you are looking for does not exist."
    });
  } else {
    console.error("xrpc error could not be classified by trpc. error:", error);
    return new TRPCError6({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  }
};

// src/server/routers/atproto/gainforest/organizationInfo/get.ts
import { TRPCError as TRPCError8 } from "@trpc/server";

// src/server/utils/validate-record-or-throw.ts
import { TRPCError as TRPCError7 } from "@trpc/server";
var validateRecordOrThrow = (record, { validateRecord }) => {
  const validation = validateRecord(record);
  if (!validation.success) {
    throw new TRPCError7({
      code: "UNPROCESSABLE_CONTENT",
      message: validation.error.message,
      cause: validation.error
    });
  }
  return record;
};

// src/server/routers/atproto/gainforest/organizationInfo/get.ts
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
    if (error instanceof import_xrpc2.XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      console.error("getOrganizationInfo error:", error);
      throw new TRPCError8({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    console.error("getOrganizationInfo error: response.success is not true");
    throw new TRPCError8({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow(response.data.value, info_exports);
  return response.data;
};
var getOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(z7.object({ did: z7.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    return await getOrganizationInfoPure(input.did, input.pdsDomain);
  });
};

// src/server/routers/atproto/gainforest/site/get.ts
import { z as z8 } from "zod";
var getSiteFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z8.object({
      did: z8.string(),
      rkey: z8.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.site",
      repo: input.did,
      rkey: input.rkey
    });
    if (response.success !== true) {
      throw new Error("Failed to get the site.");
    }
    validateRecordOrThrow(response.data.value, site_exports);
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/site/getDefault.ts
import z9 from "zod";
var getDefaultProjectSiteFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z9.object({
      did: z9.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent(input.pdsDomain);
    const response = await agent.com.atproto.repo.getRecord({
      collection: "app.gainforest.organization.defaultSite",
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get default project site");
    }
    validateRecordOrThrow(
      response.data.value,
      defaultSite_exports
    );
    return response.data;
  });
};

// src/server/routers/atproto/gainforest/measuredTrees/get.ts
import z10 from "zod";
var getMeasuredTreesFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z10.object({
      did: z10.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    const agent = getReadAgent(input.pdsDomain);
    const nsid = "app.gainforest.organization.observations.measuredTreesCluster";
    const response = await agent.com.atproto.repo.getRecord({
      collection: nsid,
      repo: input.did,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new Error("Failed to get measured trees");
    }
    validateRecordOrThrow(response.data.value, measuredTreesCluster_exports);
    return response.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/create.ts
import z11 from "zod";
import { TRPCError as TRPCError9 } from "@trpc/server";
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
  return protectedProcedure.input(
    z11.object({
      activity: z11.object({
        title: z11.string(),
        shortDescription: z11.string(),
        description: z11.string().optional(),
        workScopes: z11.array(z11.string()),
        startDate: z11.string(),
        endDate: z11.string()
      }),
      uploads: z11.object({
        image: FileGeneratorSchema,
        contributors: z11.array(z11.string()).refine((v) => v.length > 0, {
          message: "At least one contribution is required"
        }),
        siteAtUri: z11.string()
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    const did = agent.did;
    if (!did) {
      throw new TRPCError9({
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
    const validatedLocation = validateRecordOrThrow(
      location,
      location_exports
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
    const validatedActivity = validateRecordOrThrow(
      activity,
      activity_exports
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
    const validatedContribution = validateRecordOrThrow(
      contribution,
      contribution_exports
    );
    const locationWriteResponse = await agent.com.atproto.repo.createRecord({
      repo: did,
      collection: locationNSID,
      record: validatedLocation
    });
    if (locationWriteResponse.success !== true) {
      throw new TRPCError9({
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
          image: toBlobRef(imageBlobRef)
        },
        location: {
          $type: "com.atproto.repo.strongRef",
          uri: locationWriteResponse.data.uri,
          cid: locationWriteResponse.data.cid
        }
      }
    });
    if (activityResponse.success !== true) {
      throw new TRPCError9({
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
      throw new TRPCError9({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to write contribution record"
      });
    }
    return activityResponse;
  });
};

// src/server/routers/atproto/gainforest/organizationInfo/createOrUpdate.ts
import z12 from "zod";
import { TRPCError as TRPCError10 } from "@trpc/server";
var createOrUpdateOrganizationInfoFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z12.object({
      did: z12.string(),
      info: z12.object({
        displayName: z12.string(),
        shortDescription: z12.string(),
        longDescription: z12.string(),
        website: z12.string().optional(),
        logo: BlobRefGeneratorSchema.optional(),
        coverImage: BlobRefGeneratorSchema.optional(),
        objectives: z12.array(
          z12.enum([
            "Conservation",
            "Research",
            "Education",
            "Community",
            "Other"
          ])
        ),
        startDate: z12.string().optional(),
        country: z12.string(),
        visibility: z12.enum(["Public", "Hidden"])
      }),
      uploads: z12.object({
        logo: FileGeneratorSchema.optional(),
        coverImage: FileGeneratorSchema.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    const logoBlob = input.uploads?.logo ? (await uploadFileAsBlobPure(input.uploads.logo, agent)).blob : input.info.logo ? toBlobRef(input.info.logo) : void 0;
    const coverImageBlob = input.uploads?.coverImage ? (await uploadFileAsBlobPure(input.uploads.coverImage, agent)).blob : input.info.coverImage ? toBlobRef(input.info.coverImage) : void 0;
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
    validateRecordOrThrow(info, info_exports);
    const response = await agent.com.atproto.repo.putRecord({
      repo: input.did,
      collection: "app.gainforest.organization.info",
      record: info,
      rkey: "self"
    });
    if (response.success !== true) {
      throw new TRPCError10({
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
import { z as z13 } from "zod";
import { TRPCError as TRPCError11 } from "@trpc/server";
var import_xrpc3 = __toESM(require_dist(), 1);
var getAllSitesFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(z13.object({ did: z13.string(), pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = getReadAgent(input.pdsDomain);
    const listSitesTryCatchPromise = tryCatch(
      agent.com.atproto.repo.listRecords({
        collection: "app.gainforest.organization.site",
        repo: input.did
      })
    );
    const getDefaultSiteTryCatchPromise = tryCatch(
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
      if (errorListSites instanceof import_xrpc3.XRPCError) {
        const trpcError = xrpcErrorToTRPCError(errorListSites);
        throw trpcError;
      }
      throw new TRPCError11({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    } else if (listSitesResponse.success !== true) {
      throw new TRPCError11({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
    const validRecords = listSitesResponse.data.records.map((record) => {
      const result = site_exports.validateRecord(
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
        validateRecordOrThrow(
          defaultSite.value,
          defaultSite_exports
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
import { z as z14 } from "zod";
import { TRPCError as TRPCError13 } from "@trpc/server";

// src/server/routers/atproto/gainforest/site/utils.ts
import { TRPCError as TRPCError12 } from "@trpc/server";

// src/lib/geojson/computations.ts
import {
  area as turfArea,
  bbox as turfBbox,
  centerOfMass,
  centroid as turfCentroid,
  featureCollection
} from "@turf/turf";
var HECTARES_PER_SQUARE_METER = 1e-4;
var isFeatureCollection = (value) => value.type === "FeatureCollection";
var isFeature = (value) => value.type === "Feature";
var isGeometryCollection = (value) => value.type === "GeometryCollection";
var isPolygon = (value) => value.type === "Polygon";
var isMultiPolygon = (value) => value.type === "MultiPolygon";
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
var computeCentroid = (features) => {
  if (features.length === 0) return null;
  const collection = featureCollection(features);
  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turfCentroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computePolygonMetrics = (geoJson) => {
  const polygonFeatures = extractPolygonFeatures(geoJson);
  if (polygonFeatures.length === 0) {
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: null,
      bbox: null
    };
  }
  const areaSqMeters = polygonFeatures.reduce(
    (acc, feature) => acc + turfArea(feature),
    0
  );
  const centroidPosition = computeCentroid(polygonFeatures);
  const bbox = turfBbox(featureCollection(polygonFeatures));
  let centroid = null;
  if (centroidPosition && centroidPosition[0] !== void 0 && centroidPosition[1] !== void 0) {
    const [lon, lat] = centroidPosition;
    centroid = { lat, lon };
  }
  return {
    areaSqMeters,
    areaHectares: areaSqMeters * HECTARES_PER_SQUARE_METER,
    centroid,
    bbox
  };
};

// src/server/routers/atproto/gainforest/site/utils.ts
async function fetchGeojsonFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new TRPCError12({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch site"
    });
  }
  const blob = await response.blob();
  if (blob.type !== "application/geo+json") {
    throw new TRPCError12({
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
    throw new TRPCError12({
      code: "BAD_REQUEST",
      message: "Site must be a GeoJSON file"
    });
  }
  const geojsonText = await file2.text();
  const geojson = JSON.parse(geojsonText);
  const [validatedGeojsonObject, geojsonValidationError] = await tryCatch(
    new Promise((r) => r(validateGeojsonOrThrow(geojson)))
  );
  if (geojsonValidationError) {
    throw new TRPCError12({
      code: "BAD_REQUEST",
      message: "Invalid GeoJSON file: " + geojsonValidationError.message
    });
  }
  const polygonMetrics = computePolygonMetrics(validatedGeojsonObject);
  const lat = polygonMetrics.centroid?.lat;
  const lon = polygonMetrics.centroid?.lon;
  const area = polygonMetrics.areaHectares;
  if (!lat || !lon || !area) {
    throw new TRPCError12({
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
  return protectedProcedure.input(
    z14.object({
      rkey: z14.string().optional(),
      site: z14.object({
        name: z14.string().min(1)
      }),
      uploads: z14.object({
        shapefile: z14.union([z14.url(), FileGeneratorSchema])
      }),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError13({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const file2 = typeof input.uploads.shapefile === "string" ? await fetchGeojsonFromUrl(input.uploads.shapefile) : await toFile(input.uploads.shapefile);
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
    const validationResult = site_exports.validateRecord(site);
    if (!validationResult.success) {
      throw new TRPCError13({
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
      throw new TRPCError13({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add new site"
      });
    }
    return creationResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/update.ts
import { z as z15 } from "zod";
import { TRPCError as TRPCError14 } from "@trpc/server";
var updateSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z15.object({
      rkey: z15.string(),
      site: z15.object({
        name: z15.string().min(1),
        shapefile: z15.object({
          $type: z15.literal("app.gainforest.common.defs#smallBlob"),
          blob: BlobRefGeneratorSchema
        }).optional(),
        lat: z15.string(),
        lon: z15.string(),
        area: z15.string()
      }),
      uploads: z15.object({
        shapefile: FileGeneratorSchema.optional()
      }).optional(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError14({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    let file2 = null;
    if (input.uploads) {
      if (input.uploads.shapefile === void 0) {
        file2 = null;
      } else {
        file2 = await toFile(input.uploads.shapefile);
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
        blob: toBlobRef(input.site.shapefile.blob)
      };
      lat = input.site.lat;
      lon = input.site.lon;
      area = input.site.area;
    } else {
      throw new TRPCError14({
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
    const validationResult = site_exports.validateRecord(site);
    if (!validationResult.success) {
      throw new TRPCError14({
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
      throw new TRPCError14({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update site"
      });
    }
    return updateResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/setDefault.ts
import z16 from "zod";
import { TRPCError as TRPCError15 } from "@trpc/server";
var setDefaultSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z16.object({
      siteAtUri: z16.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError15({
        code: "UNAUTHORIZED",
        message: "You are not authenticated"
      });
    }
    const siteUri = input.siteAtUri;
    const siteNSID = "app.gainforest.organization.site";
    if (!(siteUri.startsWith(`at://`) && siteUri.includes(siteNSID))) {
      throw new TRPCError15({
        code: "BAD_REQUEST",
        message: "Invalid site URI"
      });
    }
    const site = await agent.com.atproto.repo.getRecord({
      collection: siteNSID,
      repo: agent.did,
      rkey: parseAtUri_default(siteUri).rkey
    });
    if (site.success !== true) {
      throw new TRPCError15({
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
    validateRecordOrThrow(defaultSite, defaultSite_exports);
    const updateDefaultSiteResponse = await agent.com.atproto.repo.putRecord({
      collection: defaultSiteNSID,
      repo: agent.did,
      rkey: "self",
      record: defaultSite
    });
    if (updateDefaultSiteResponse.success !== true) {
      throw new TRPCError15({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update default site"
      });
    }
    return updateDefaultSiteResponse.data;
  });
};

// src/server/routers/atproto/gainforest/site/delete.ts
import { TRPCError as TRPCError16 } from "@trpc/server";
import z17 from "zod";
var deleteSiteFactory = (allowedPDSDomainSchema) => {
  return protectedProcedure.input(
    z17.object({ siteAtUri: z17.string(), pdsDomain: allowedPDSDomainSchema })
  ).mutation(async ({ input }) => {
    const agent = await getWriteAgent(input.pdsDomain);
    if (!agent.did) {
      throw new TRPCError16({
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
      validateRecordOrThrow(
        defaultSiteResponse.data.value,
        defaultSite_exports
      );
      const defaultSite = defaultSiteResponse.data.value;
      if (defaultSite.site === input.siteAtUri) throw new Error("Equal");
    } catch (error) {
      if (error instanceof Error && error.message === "Equal") {
        throw new TRPCError16({
          code: "BAD_REQUEST",
          message: "Cannot delete default site"
        });
      }
    }
    const deletionResponse = await agent.com.atproto.repo.deleteRecord({
      collection: "app.gainforest.organization.site",
      repo: agent.did,
      rkey: parseAtUri_default(input.siteAtUri).rkey
    });
    if (deletionResponse.success !== true)
      throw new TRPCError16({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete site"
      });
    return deletionResponse.data;
  });
};

// src/server/routers/atproto/hypercerts/claim/activity/getAllAcrossOrgs.ts
import { z as z19 } from "zod";
import { TRPCError as TRPCError18 } from "@trpc/server";

// src/server/routers/atproto/hypercerts/claim/activity/getAll.ts
import { z as z18 } from "zod";
import { TRPCError as TRPCError17 } from "@trpc/server";
var import_xrpc4 = __toESM(require_dist(), 1);
var getAllClaimActivitiesPure = async (did, pdsDomain) => {
  const activityNSID = "org.hypercerts.claim.activity";
  const agent = getReadAgent(pdsDomain);
  const [listClaimActivitiesResponse, errorListClaimActivities] = await tryCatch(
    agent.com.atproto.repo.listRecords({
      collection: activityNSID,
      repo: did
    })
  );
  if (errorListClaimActivities) {
    if (errorListClaimActivities instanceof import_xrpc4.XRPCError) {
      const trpcError = xrpcErrorToTRPCError(errorListClaimActivities);
      throw trpcError;
    }
    throw new TRPCError17({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  } else if (listClaimActivitiesResponse.success !== true) {
    throw new TRPCError17({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred."
    });
  }
  const validRecords = listClaimActivitiesResponse.data.records.map((record) => {
    try {
      validateRecordOrThrow(record.value, activity_exports);
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
  return publicProcedure.input(z19.object({ pdsDomain: allowedPDSDomainSchema })).query(async ({ input }) => {
    const agent = getReadAgent(input.pdsDomain);
    const [repositoriesListResponse, repositoriesListFetchError] = await tryCatch(
      agent.com.atproto.sync.listRepos({
        limit: 100
      })
    );
    if (repositoriesListFetchError || repositoriesListResponse.success !== true) {
      throw new TRPCError18({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch repositories list"
      });
    }
    const repositoriesList = repositoriesListResponse.data.repos;
    const [organizationRepositories, organizationsFetchError] = await tryCatch(
      Promise.all(
        repositoriesList.map(async (repo) => {
          const [organizationInfoResponse, organizationInfoFetchError] = await tryCatch(
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
      throw new TRPCError18({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch organizations list"
      });
    }
    const validOrganizationRepositories = organizationRepositories.filter(
      (org) => org !== null
    );
    const [activities, activitiesFetchError] = await tryCatch(
      Promise.all(
        validOrganizationRepositories.map(async (organization) => {
          const [activitiesResponse, activitiesFetchError2] = await tryCatch(
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
      throw new TRPCError18({
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
import { z as z20 } from "zod";
var import_xrpc5 = __toESM(require_dist(), 1);
import { TRPCError as TRPCError19 } from "@trpc/server";
var getClaimActivityPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const nsid = "org.hypercerts.claim.activity";
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: nsid,
    repo: did,
    rkey
  });
  const [response, error] = await tryCatch(getRecordPromise);
  if (error) {
    if (error instanceof import_xrpc5.XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      throw new TRPCError19({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new TRPCError19({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow(response.data.value, activity_exports);
  return response.data;
};
var getCliamActivityFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z20.object({
      did: z20.string(),
      rkey: z20.string(),
      pdsDomain: allowedPDSDomainSchema
    })
  ).query(async ({ input }) => {
    return await getClaimActivityPure(input.did, input.rkey, input.pdsDomain);
  });
};

// src/server/routers/atproto/hypercerts/location/get.ts
import { z as z21 } from "zod";
var import_xrpc6 = __toESM(require_dist(), 1);
import { TRPCError as TRPCError20 } from "@trpc/server";
var getCertifiedLocationPure = async (did, rkey, pdsDomain) => {
  const agent = getReadAgent(pdsDomain);
  const getRecordPromise = agent.com.atproto.repo.getRecord({
    collection: "app.certified.location",
    repo: did,
    rkey
  });
  const [response, error] = await tryCatch(getRecordPromise);
  if (error) {
    if (error instanceof import_xrpc6.XRPCError) {
      const trpcError = xrpcErrorToTRPCError(error);
      throw trpcError;
    } else {
      throw new TRPCError20({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred."
      });
    }
  }
  if (response.success !== true) {
    throw new TRPCError20({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get organization info."
    });
  }
  validateRecordOrThrow(response.data.value, location_exports);
  return response.data;
};
var getCertifiedLocationFactory = (allowedPDSDomainSchema) => {
  return publicProcedure.input(
    z21.object({
      did: z21.string(),
      rkey: z21.string(),
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
import z22 from "zod";
var AppRouterFactory = class {
  allowedPDSDomains;
  allowedPDSDomainSchema;
  appRouter;
  constructor(_allowedPDSDomains) {
    this.allowedPDSDomains = _allowedPDSDomains;
    this.allowedPDSDomainSchema = z22.enum(this.allowedPDSDomains);
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
var supportedPDSDomainSchema = z23.enum(supportedDomains);
var supportedPDSDomainsSchema = z23.array(supportedPDSDomainSchema);
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