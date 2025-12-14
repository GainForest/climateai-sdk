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

export { BlobRefGeneratorSchema as B, toBlobRefGenerator as a, type BlobRefGenerator as b, toBlobRef as t };
