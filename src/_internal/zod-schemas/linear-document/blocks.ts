import { z } from "zod";
import { FacetSchema } from "./facet";
import { BlobRefGeneratorSchema } from "../blobref";
import { StrongRefSchema } from "../strongref";

/**
 * Text block schema
 */
export const TextBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.text"),
  plaintext: z.string(),
  textSize: z.enum(["default", "small", "large"]).optional(),
  facets: z.array(FacetSchema).optional(),
});

export type TextBlock = z.infer<typeof TextBlockSchema>;

/**
 * Header block schema
 */
export const HeaderBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.header"),
  plaintext: z.string(),
  level: z.number().int().min(1).max(6).optional(),
  facets: z.array(FacetSchema).optional(),
});

export type HeaderBlock = z.infer<typeof HeaderBlockSchema>;

/**
 * Image aspect ratio schema
 */
export const AspectRatioSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.image#aspectRatio").optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type AspectRatio = z.infer<typeof AspectRatioSchema>;

/**
 * Image block schema
 */
export const ImageBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.image"),
  image: BlobRefGeneratorSchema,
  alt: z.string().optional(),
  aspectRatio: AspectRatioSchema,
});

export type ImageBlock = z.infer<typeof ImageBlockSchema>;

/**
 * Blockquote block schema
 */
export const BlockquoteBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.blockquote"),
  plaintext: z.string(),
  facets: z.array(FacetSchema).optional(),
});

export type BlockquoteBlock = z.infer<typeof BlockquoteBlockSchema>;

/**
 * Code block schema
 */
export const CodeBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.code"),
  plaintext: z.string(),
  language: z.string().optional(),
  syntaxHighlightingTheme: z.string().optional(),
});

export type CodeBlock = z.infer<typeof CodeBlockSchema>;

/**
 * List item content schema (for unordered lists)
 */
const ListItemContentSchema = z.union([
  TextBlockSchema,
  HeaderBlockSchema,
  ImageBlockSchema,
]);

export type ListItemContent = z.infer<typeof ListItemContentSchema>;

/**
 * List item schema (recursive)
 */
export type ListItem = {
  $type?: "pub.leaflet.blocks.unorderedList#listItem";
  content: ListItemContent;
  children?: ListItem[];
};

export const ListItemSchema: z.ZodType<ListItem> = z.object({
  $type: z.literal("pub.leaflet.blocks.unorderedList#listItem").optional(),
  content: ListItemContentSchema,
  children: z.lazy(() => z.array(ListItemSchema)).optional(),
});

/**
 * Unordered list block schema
 */
export const UnorderedListBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.unorderedList"),
  children: z.array(ListItemSchema),
});

export type UnorderedListBlock = z.infer<typeof UnorderedListBlockSchema>;

/**
 * Horizontal rule block schema
 */
export const HorizontalRuleBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.horizontalRule"),
});

export type HorizontalRuleBlock = z.infer<typeof HorizontalRuleBlockSchema>;

/**
 * Iframe block schema
 */
export const IframeBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.iframe"),
  url: z.string().url(),
  height: z.number().int().positive().optional(),
});

export type IframeBlock = z.infer<typeof IframeBlockSchema>;

/**
 * Math block schema
 */
export const MathBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.math"),
  tex: z.string(),
});

export type MathBlock = z.infer<typeof MathBlockSchema>;

/**
 * Website block schema
 */
export const WebsiteBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.website"),
  src: z.string().url(),
  previewImage: BlobRefGeneratorSchema.optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export type WebsiteBlock = z.infer<typeof WebsiteBlockSchema>;

/**
 * Bluesky post block schema
 */
export const BskyPostBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.bskyPost"),
  postRef: StrongRefSchema,
});

export type BskyPostBlock = z.infer<typeof BskyPostBlockSchema>;

/**
 * Page block schema
 */
export const PageBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.page"),
  id: z.string(),
});

export type PageBlock = z.infer<typeof PageBlockSchema>;

/**
 * Poll block schema
 */
export const PollBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.poll"),
  pollRef: StrongRefSchema,
});

export type PollBlock = z.infer<typeof PollBlockSchema>;

/**
 * Button block schema
 */
export const ButtonBlockSchema = z.object({
  $type: z.literal("pub.leaflet.blocks.button"),
  text: z.string(),
  url: z.string().url(),
});

export type ButtonBlock = z.infer<typeof ButtonBlockSchema>;

/**
 * Union of all block content types
 */
export const BlockContentSchema = z.discriminatedUnion("$type", [
  TextBlockSchema,
  HeaderBlockSchema,
  ImageBlockSchema,
  BlockquoteBlockSchema,
  CodeBlockSchema,
  UnorderedListBlockSchema,
  HorizontalRuleBlockSchema,
  IframeBlockSchema,
  MathBlockSchema,
  WebsiteBlockSchema,
  BskyPostBlockSchema,
  PageBlockSchema,
  PollBlockSchema,
  ButtonBlockSchema,
]);

export type BlockContent = z.infer<typeof BlockContentSchema>;
