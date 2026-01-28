import z from "zod";
import { AppGainforestOrganizationLayer } from "@/../lex-api";
import { createOrUpdateRecord } from "@/_internal/server/utils/atproto-crud";
import { createMutationFactory } from "@/_internal/server/utils/procedure-factories";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import type { Agent } from "@atproto/api";

const COLLECTION = "app.gainforest.organization.layer" as const;
const RESOURCE_NAME = "layer" as const;

/**
 * Zod schema for layer type enum - matches the lexicon definition
 */
export const LayerTypeSchema = z.enum([
  "geojson_points",
  "geojson_points_trees",
  "geojson_line",
  "choropleth",
  "choropleth_shannon",
  "raster_tif",
  "tms_tile",
]);

export type LayerType = z.infer<typeof LayerTypeSchema>;

/**
 * Input schema for creating/updating a layer
 */
export const LayerInputSchema = z.object({
  name: z.string().min(1, "Layer name is required"),
  type: LayerTypeSchema,
  uri: z.string().url("Layer URI must be a valid URL"),
  description: z.string().optional(),
  createdAt: z.string().datetime().optional(),
});

export type LayerInput = z.infer<typeof LayerInputSchema>;

/**
 * Pure function to create or update a layer.
 * Can be reused outside of tRPC context.
 */
export const createOrUpdateLayerPure = async (
  agent: Agent,
  did: string,
  layerInput: LayerInput,
  rkey?: string
): Promise<PutRecordResponse<AppGainforestOrganizationLayer.Record>> => {
  const layer: AppGainforestOrganizationLayer.Record = {
    $type: COLLECTION,
    name: layerInput.name,
    type: layerInput.type,
    uri: layerInput.uri,
    description: layerInput.description,
    createdAt: layerInput.createdAt ?? new Date().toISOString(),
  };

  return createOrUpdateRecord({
    agent,
    collection: COLLECTION,
    repo: did,
    record: layer,
    validator: AppGainforestOrganizationLayer,
    resourceName: RESOURCE_NAME,
    rkey,
  });
};

/**
 * Factory to create the tRPC procedure for creating/updating a layer.
 */
export const createOrUpdateLayerFactory = createMutationFactory(
  {
    layer: LayerInputSchema,
    rkey: z.string().optional(),
  },
  (agent, input) => createOrUpdateLayerPure(agent, input.did, input.layer, input.rkey)
);
