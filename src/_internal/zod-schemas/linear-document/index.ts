import { z } from "zod";
import { BlockContentSchema } from "./blocks";

/**
 * Text alignment enum for linear document blocks
 */
export const AlignmentSchema = z.enum([
  "lex:pub.leaflet.pages.linearDocument#textAlignLeft",
  "lex:pub.leaflet.pages.linearDocument#textAlignCenter",
  "lex:pub.leaflet.pages.linearDocument#textAlignRight",
  "lex:pub.leaflet.pages.linearDocument#textAlignJustify",
]).optional();

export type Alignment = z.infer<typeof AlignmentSchema>;

/**
 * Linear document block wrapper schema
 */
export const LinearDocumentBlockSchema = z.object({
  $type: z.literal("pub.leaflet.pages.linearDocument#block").optional(),
  block: BlockContentSchema,
  alignment: AlignmentSchema,
});

export type LinearDocumentBlock = z.infer<typeof LinearDocumentBlockSchema>;

/**
 * Main linear document schema
 */
export const LinearDocumentSchema = z.object({
  $type: z.literal("pub.leaflet.pages.linearDocument").optional(),
  id: z.string().optional(),
  blocks: z.array(LinearDocumentBlockSchema).min(1, "At least one block is required"),
});

export type LinearDocument = z.infer<typeof LinearDocumentSchema>;

// Re-export all schemas and types
export * from "./facet";
export * from "./blocks";
export * from "./converters";
