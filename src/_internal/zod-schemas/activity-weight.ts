import z from "zod";
import { StrongRefSchema } from "./strongref";
import { Item } from "lex-api/types/org/hypercerts/claim/collection";

/**
 * Schema for collection items (previously ActivityWeight).
 * Used for weighted references in collections.
 */
export const CollectionItemSchema = z.object({
  $type: z.literal("org.hypercerts.claim.collection#item").optional(),
  itemIdentifier: StrongRefSchema,
  itemWeight: z.string().optional(),
});

// Compile time check that the CollectionItemSchema is compatible with the Item type
const _typeCheck = null as unknown as z.infer<
  typeof CollectionItemSchema
> satisfies Item;

// Export with old name for backwards compatibility
export const ActivityWeightSchema = CollectionItemSchema;
