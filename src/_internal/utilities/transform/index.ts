// utils/transformer.ts
import type { DataTransformer } from "@trpc/server";
import superjson, { type SuperJSONResult } from "superjson";
import {
  type BlobRefGenerator,
  toBlobRef,
} from "@/_internal/zod-schemas/blobref";
import { BlobRef } from "@atproto/api";
import { isObject } from "@/_internal/lib/isObject";

type ReplaceType<T, U, V> =
  // If T directly extends U, substitute to V
  T extends U ? V
  : // If T is an array, recursively apply ReplaceType on the element type
  T extends (infer Item)[] ? ReplaceType<Item, U, V>[]
  : // If T is an object, recursively apply ReplaceType on all properties
  T extends object ? { [K in keyof T]: ReplaceType<T[K], U, V> }
  : // Otherwise, keep original type
    T;

type Serialize<T> = ReplaceType<T, BlobRef, BlobRefGenerator>;

const _serialize = <T>(data: T): Serialize<T> => {
  return JSON.parse(JSON.stringify(data)) as Serialize<T>;
};

const _deserialize = <T>(data: Serialize<T>): T => {
  const isObj = isObject(data);
  if (!isObj) {
    if (Array.isArray(data)) {
      return data.map(_deserialize) as T;
    }
    return data as T;
  }
  if ("$type" in data && data.$type === "blob" && "ref" in data) {
    try {
      return toBlobRef(data as unknown as BlobRefGenerator) as T;
    } catch {
      return data as T;
    }
  }

  const obj = data as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, _deserialize(value)])
  ) as T;
};

export const customTransformer: DataTransformer = {
  serialize: (object) => {
    // typeof object = object
    // This logic runs for transforming the query or mutation parameters before they are sent to the server.
    // Conversion of object to string is automatically handled by TRPC.
    const atprotoSerialized = _serialize(object);
    const serializedObject = superjson.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: <T>(object: SuperJSONResult): T => {
    // typeof object = { json: object }
    // This logic runs for transforming the query or mutation response before it is received by the client.
    // The received response is automatically converted from stringified JSON to object by TRPC.
    const superjsonDeserialized = superjson.deserialize(object) as Serialize<T>;
    const deserializedObject = _deserialize(superjsonDeserialized);
    // console.log("deserialized object", deserializedObject);
    return deserializedObject as T;
  },
};

export type SerializedSuperjson<T> = Omit<SuperJSONResult, "json"> & {
  json: Serialize<T>;
};

export const serialize = <T>(data: T) => {
  const result = customTransformer.serialize(data);
  return result as SerializedSuperjson<T>;
};

export const deserialize = <T>(object: SerializedSuperjson<T>): T => {
  return customTransformer.deserialize(object);
};
