import { z } from "zod";

/**
 * ByteSlice schema for facet positioning
 */
export const ByteSliceSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#byteSlice").optional(),
  byteStart: z.number().int().min(0),
  byteEnd: z.number().int().min(0),
});

export type ByteSlice = z.infer<typeof ByteSliceSchema>;

/**
 * Link feature schema
 */
export const LinkFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#link"),
  uri: z.string().url(),
});

export type LinkFeature = z.infer<typeof LinkFeatureSchema>;

/**
 * DID mention feature schema
 */
export const DidMentionFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#didMention"),
  did: z.string().regex(/^did:/),
});

export type DidMentionFeature = z.infer<typeof DidMentionFeatureSchema>;

/**
 * AT mention feature schema
 */
export const AtMentionFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#atMention"),
  atURI: z.string().regex(/^at:\/\//),
});

export type AtMentionFeature = z.infer<typeof AtMentionFeatureSchema>;

/**
 * Code feature schema
 */
export const CodeFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#code"),
});

export type CodeFeature = z.infer<typeof CodeFeatureSchema>;

/**
 * Highlight feature schema
 */
export const HighlightFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#highlight"),
});

export type HighlightFeature = z.infer<typeof HighlightFeatureSchema>;

/**
 * Underline feature schema
 */
export const UnderlineFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#underline"),
});

export type UnderlineFeature = z.infer<typeof UnderlineFeatureSchema>;

/**
 * Strikethrough feature schema
 */
export const StrikethroughFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#strikethrough"),
});

export type StrikethroughFeature = z.infer<typeof StrikethroughFeatureSchema>;

/**
 * ID feature schema
 */
export const IdFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#id"),
  id: z.string().optional(),
});

export type IdFeature = z.infer<typeof IdFeatureSchema>;

/**
 * Bold feature schema
 */
export const BoldFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#bold"),
});

export type BoldFeature = z.infer<typeof BoldFeatureSchema>;

/**
 * Italic feature schema
 */
export const ItalicFeatureSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet#italic"),
});

export type ItalicFeature = z.infer<typeof ItalicFeatureSchema>;

/**
 * Union of all facet feature types
 */
export const FacetFeatureSchema = z.discriminatedUnion("$type", [
  LinkFeatureSchema,
  DidMentionFeatureSchema,
  AtMentionFeatureSchema,
  CodeFeatureSchema,
  HighlightFeatureSchema,
  UnderlineFeatureSchema,
  StrikethroughFeatureSchema,
  IdFeatureSchema,
  BoldFeatureSchema,
  ItalicFeatureSchema,
]);

export type FacetFeature = z.infer<typeof FacetFeatureSchema>;

/**
 * Main facet schema
 */
export const FacetSchema = z.object({
  $type: z.literal("pub.leaflet.richtext.facet").optional(),
  index: ByteSliceSchema,
  features: z.array(FacetFeatureSchema),
});

export type Facet = z.infer<typeof FacetSchema>;
