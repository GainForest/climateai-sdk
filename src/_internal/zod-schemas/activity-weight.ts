import z from "zod";
import { StrongRefSchema } from "./strongref";
import { ActivityWeight } from "lex-api/types/org/hypercerts/claim/activity";

export const ActivityWeightSchema = z.object({
  $type: z.literal("org.hypercerts.claim.activity#activityWeight").optional(),
  activity: StrongRefSchema,
  weight: z.string(),
});

// Compile time check that the ActivityWeightSchema is compatible with the ActivityWeight type
const test = null as unknown as z.infer<
  typeof ActivityWeightSchema
> satisfies ActivityWeight;
