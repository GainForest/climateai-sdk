export { B as BlobRefGenerator, a as BlobRefGeneratorSchema, t as toBlobRef, b as toBlobRefGenerator } from '../../blobref-CzIHHOw4.cjs';
import z from 'zod';
import '@atproto/lexicon';

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
