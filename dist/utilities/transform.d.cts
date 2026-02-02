import { DataTransformer } from '@trpc/server';
import { SuperJSONResult } from 'superjson';
import { b as BlobRefGenerator } from '../blobref-e8ss-bC-.cjs';
import { BlobRef } from '@atproto/api';
import 'zod';

type ReplaceType<T, U, V> = T extends U ? V : T extends (infer Item)[] ? ReplaceType<Item, U, V>[] : T extends object ? {
    [K in keyof T]: ReplaceType<T[K], U, V>;
} : T;
type Serialize<T> = ReplaceType<T, BlobRef, BlobRefGenerator>;
declare const customTransformer: DataTransformer;
type SerializedSuperjson<T> = Omit<SuperJSONResult, "json"> & {
    json: Serialize<T>;
};
declare const serialize: <T>(data: T) => SerializedSuperjson<T>;
declare const deserialize: <T>(object: SerializedSuperjson<T>) => T;

export { type SerializedSuperjson, customTransformer, deserialize, serialize };
