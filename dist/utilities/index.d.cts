import { U as Uri, S as SmallImage, L as LargeImage, a as SmallBlob, b as LargeBlob } from '../info-CKHQe3VC.cjs';
import { $Typed } from '../lex-api/util.cjs';
import { B as BlobRefGenerator } from '../blobref-dnAPTT_v.cjs';
import { BlobRef } from '@atproto/api';
import { S as SupportedPDSDomain } from '../index-H9nozGt2.cjs';
import { GeoJsonObject } from 'geojson';
import '@atproto/lexicon';
import '../activity-86GSii7W.cjs';
import 'zod';
import 'node_modules/@trpc/server/dist/unstable-core-do-not-import.d-1RewV6pM.d.mts';
import '@atproto/api/dist/client/types/com/atproto/sync/listRepos';
import '@atproto/api/dist/client/types/com/atproto/repo/deleteRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/putRecord';
import '@atproto/api/dist/client/types/com/atproto/repo/createRecord';
import '../response-types-a9c2mEQD.cjs';
import '@atproto/api/dist/client/types/com/atproto/repo/uploadBlob';
import '@trpc/server';
import '@atproto/oauth-client-node';

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
