import z from "zod";

export const StrongRefSchema = z.object({
  $type: z.literal("com.atproto.repo.strongRef").optional(),
  uri: z.string().regex(/^at:\/\//),
  cid: z.string(),
});

export type StrongRef = z.infer<typeof StrongRefSchema>;
