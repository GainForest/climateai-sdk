import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import { AppGainforestOrganizationLayer } from "@/../lex-api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";

const LayerTypeEnum = z.enum([
  "geojson_points",
  "geojson_points_trees",
  "geojson_line",
  "choropleth",
  "choropleth_shannon",
  "raster_tif",
  "tms_tile",
]);

export const createOrUpdateLayerFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        rkey: z.string().optional(),
        layer: z.object({
          name: z.string(),
          type: LayerTypeEnum,
          uri: z.string(),
          description: z.string().optional(),
          createdAt: z.string().optional(),
        }),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const agent = await getWriteAgent(input.pdsDomain);

      const layer: AppGainforestOrganizationLayer.Record = {
        $type: "app.gainforest.organization.layer",
        name: input.layer.name,
        type: input.layer.type,
        uri: input.layer.uri,
        description: input.layer.description,
        createdAt:
          input.layer.createdAt ?
            input.layer.createdAt
          : new Date().toISOString(),
      };

      const validatedLayer = validateRecordOrThrow(
        layer,
        AppGainforestOrganizationLayer
      );

      const collection = "app.gainforest.organization.layer";
      const response =
        input.rkey ?
          await agent.com.atproto.repo.putRecord({
            repo: input.did,
            collection,
            record: validatedLayer,
            rkey: input.rkey,
          })
        : await agent.com.atproto.repo.createRecord({
            repo: input.did,
            collection,
            record: validatedLayer,
          });

      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create or update layer",
        });
      }

      return {
        uri: response.data.uri,
        cid: response.data.cid,
        validationStatus: response.data.validationStatus,
        value: validatedLayer,
      } satisfies PutRecordResponse<AppGainforestOrganizationLayer.Record>;
    });
};
