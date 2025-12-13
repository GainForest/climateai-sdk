import { Uri, SmallImage, LargeImage, SmallBlob, LargeBlob } from '@/../lex-api/types/app/gainforest/common/defs';
import { $Typed } from '@/../lex-api/util';
import { BlobRefGenerator } from '@/zod-schemas/blobref';
import { BlobRef } from '@atproto/api';
import { SupportedPDSDomain } from '../index.cjs';
import { GeoJsonObject } from 'geojson';
import '../lex-api/util.cjs';
import '@atproto/lexicon';
import '../info-xhW3nV2i.cjs';
import '../blobref-CzIHHOw4.cjs';
import 'zod';
import '@trpc/server/unstable-core-do-not-import';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '../server/session.cjs';
import '@atproto/oauth-client-node';
import '@/index';

declare const getBlobUrl: <T extends SupportedPDSDomain>(did: string, imageData: string | BlobRef | BlobRefGenerator | $Typed<Uri | SmallImage | LargeImage | SmallBlob | LargeBlob> | Uri | SmallImage | LargeImage | SmallBlob | LargeBlob, pdsDomain: T) => string;

declare const parseAtUri: (atUri: string) => {
    did: string;
    collection: string;
    rkey: string;
};

/**
 * Validates if an unknown object is a valid GeoJSON object.
 * @param value - The value to validate
 * @returns The validated GeoJSON object
 * @throws Error if the value is not a valid GeoJSON object
 */
declare function validateGeojsonOrThrow(value: unknown): GeoJsonObject;

export { getBlobUrl, parseAtUri, validateGeojsonOrThrow };
