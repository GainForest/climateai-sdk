import { publicProcedure, protectedProcedure } from "@/_internal/server/trpc";
import { z } from "zod";
import type { SupportedPDSDomain } from "@/_internal/index";
import type { Agent } from "@atproto/api";
import { getWriteAgent } from "./agent";

// ============================================================================
// Query Factories
// ============================================================================

/**
 * Creates a public query factory for GET endpoints that only need did + pdsDomain.
 *
 * @example
 * export const getOrganizationInfoFactory = createDidQueryFactory(getOrganizationInfoPure);
 */
export function createDidQueryFactory<TResult>(
  handler: <T extends SupportedPDSDomain>(did: string, pdsDomain: T) => Promise<TResult>
) {
  return <T extends SupportedPDSDomain>(
    allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
  ) =>
    publicProcedure
      .input(
        z.object({
          did: z.string(),
          pdsDomain: allowedPDSDomainSchema,
        })
      )
      .query(({ input }) => handler(input.did, input.pdsDomain));
}

/**
 * Creates a public query factory for GET endpoints that need did + rkey + pdsDomain.
 *
 * @example
 * export const getLayerFactory = createDidRkeyQueryFactory(getLayerPure);
 */
export function createDidRkeyQueryFactory<TResult>(
  handler: <T extends SupportedPDSDomain>(
    did: string,
    rkey: string,
    pdsDomain: T
  ) => Promise<TResult>
) {
  return <T extends SupportedPDSDomain>(
    allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
  ) =>
    publicProcedure
      .input(
        z.object({
          did: z.string(),
          rkey: z.string(),
          pdsDomain: allowedPDSDomainSchema,
        })
      )
      .query(({ input }) => handler(input.did, input.rkey, input.pdsDomain));
}

// ============================================================================
// Mutation Factories
// ============================================================================

/**
 * Creates a protected mutation factory with custom additional input.
 *
 * @param additionalInput - Schema for additional input fields beyond did/pdsDomain
 * @param handler - Function that receives agent and full input, returns result
 *
 * @example
 * export const createOrUpdateLayerFactory = createMutationFactory(
 *   {
 *     layer: LayerInputSchema,
 *     uploads: LayerUploadsSchema.optional(),
 *     rkey: z.string().optional(),
 *   },
 *   (agent, input) => createOrUpdateLayerPure(agent, input.did, input.layer, input.uploads, input.rkey)
 * );
 */
export function createMutationFactory<
  TAdditional extends z.ZodRawShape,
  TResult,
>(
  additionalInput: TAdditional,
  handler: (
    agent: Agent,
    input: { did: string; pdsDomain: SupportedPDSDomain } & z.infer<
      z.ZodObject<TAdditional>
    >
  ) => Promise<TResult>
) {
  return <T extends SupportedPDSDomain>(
    allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
  ) =>
    protectedProcedure
      .input(
        z.object({
          did: z.string(),
          pdsDomain: allowedPDSDomainSchema,
          ...additionalInput,
        })
      )
      .mutation(async ({ input }) => {
        const typedInput = input as { did: string; pdsDomain: SupportedPDSDomain } & z.infer<z.ZodObject<TAdditional>>;
        const agent = await getWriteAgent(typedInput.pdsDomain);
        return handler(agent, typedInput);
      });
}

/**
 * Creates a protected mutation factory for delete operations.
 *
 * @example
 * export const deleteLayerFactory = createDeleteMutationFactory(deleteLayerPure);
 */
export function createDeleteMutationFactory(
  handler: (agent: Agent, did: string, rkey: string) => Promise<{ success: true }>
) {
  return <T extends SupportedPDSDomain>(
    allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
  ) =>
    protectedProcedure
      .input(
        z.object({
          did: z.string(),
          rkey: z.string(),
          pdsDomain: allowedPDSDomainSchema,
        })
      )
      .mutation(async ({ input }) => {
        const typedInput = input as { did: string; rkey: string; pdsDomain: T };
        const agent = await getWriteAgent(typedInput.pdsDomain);
        return handler(agent, typedInput.did, typedInput.rkey);
      });
}
