import z from "zod";

export const FileGeneratorSchema = z.object({
  name: z.string(),
  type: z.string(),
  dataBase64: z.string(),
});

export type FileGenerator = z.infer<typeof FileGeneratorSchema>;

export const toFile = async (fileGenerator: FileGenerator) => {
  const file = new File(
    [Buffer.from(fileGenerator.dataBase64, "base64")],
    fileGenerator.name,
    { type: fileGenerator.type }
  );
  return file;
};

export const toFileGenerator = async (file: File) => {
  return {
    name: file.name,
    type: file.type,
    dataBase64: await file
      .arrayBuffer()
      .then((buffer) => Buffer.from(buffer).toString("base64")),
  };
};
