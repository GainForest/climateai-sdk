import z from 'zod';
import { BlobRef } from '@atproto/api';

declare const BlobRefGeneratorSchema: z.ZodObject<{
    $type: z.ZodLiteral<"blob-ref-generator">;
    ref: z.ZodObject<{
        $link: z.ZodString;
    }, z.core.$strip>;
    mimeType: z.ZodString;
    size: z.ZodNumber;
}, z.core.$strip>;
type BlobRefGenerator = z.infer<typeof BlobRefGeneratorSchema>;
declare const toBlobRef: (input: BlobRefGenerator) => BlobRef;
declare const toBlobRefGenerator: (blobRef: BlobRef) => BlobRefGenerator;

export { type BlobRefGenerator as B, BlobRefGeneratorSchema as a, toBlobRefGenerator as b, toBlobRef as t };
