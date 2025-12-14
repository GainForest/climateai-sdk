export { b as BlobRefGenerator, B as BlobRefGeneratorSchema, t as toBlobRef, a as toBlobRefGenerator } from './blobref-e8ss-bC-.cjs';
import z from 'zod';
export { BlobRef } from '@atproto/api';

declare const FileGeneratorSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    dataBase64: z.ZodString;
}, z.core.$strip>;
type FileGenerator = z.infer<typeof FileGeneratorSchema>;
declare const toFile: (fileGenerator: FileGenerator) => Promise<File>;
declare const toFileGenerator: (file: File) => Promise<{
    name: string;
    type: string;
    dataBase64: string;
}>;

export { type FileGenerator, FileGeneratorSchema, toFile, toFileGenerator };
