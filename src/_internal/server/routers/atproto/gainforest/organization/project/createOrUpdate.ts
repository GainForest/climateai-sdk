import { protectedProcedure } from "@/_internal/server/trpc";
import z from "zod";
import { AppGainforestOrganizationProject } from "@/../lex-api";
import type { PutRecordResponse } from "@/_internal/server/utils/response-types";
import { TRPCError } from "@trpc/server";
import { getWriteAgent } from "@/_internal/server/utils/agent";
import { validateRecordOrThrow } from "@/_internal/server/utils/validate-record-or-throw";
import type { SupportedPDSDomain } from "@/_internal/index";
import { filterProjectByOwnership } from "./utils";

export const createOrUpdateProjectFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return protectedProcedure
    .input(
      z.object({
        did: z.string(),
        rkey: z.string().optional(),
        project: z.object({
          name: z.string().min(1),
          shortDescription: z.string(),
          description: z.string().optional(),
          sites: z.array(z.string()).optional(),
          measuredTreesClusters: z.array(z.string()).optional(),
          layers: z.array(z.string()).optional(),
          ecocerts: z.array(z.string()).optional(),
        }),
        pdsDomain: allowedPDSDomainSchema,
      })
    )
    .mutation(async ({ input }) => {
      const agent = await getWriteAgent(input.pdsDomain);
      if (!agent.did) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authenticated",
        });
      }

      const project: AppGainforestOrganizationProject.Record = {
        $type: "app.gainforest.organization.project",
        name: input.project.name,
        shortDescription: input.project.shortDescription,
        description:
          input.project.description ? input.project.description : undefined,
        sites: input.project.sites ? input.project.sites : [],
        measuredTreesClusters:
          input.project.measuredTreesClusters ?
            input.project.measuredTreesClusters
          : [],
        layers: input.project.layers ? input.project.layers : [],
        ecocerts: input.project.ecocerts ? input.project.ecocerts : [],
        createdAt: new Date().toISOString(),
      };

      const validatedProject = validateRecordOrThrow(
        project,
        AppGainforestOrganizationProject
      );
      const ownershipCheckedProject = filterProjectByOwnership(
        validatedProject,
        input.did
      );
      const projectToCreateOrUpdate = ownershipCheckedProject;

      let response;
      if (input.rkey) {
        response = await agent.com.atproto.repo.putRecord({
          repo: input.did,
          collection: "app.gainforest.organization.project",
          record: projectToCreateOrUpdate,
          rkey: input.rkey,
        });
      } else {
        response = await agent.com.atproto.repo.createRecord({
          repo: input.did,
          collection: "app.gainforest.organization.project",
          record: projectToCreateOrUpdate,
        });
      }

      if (response.success !== true) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create or update project",
        });
      }

      return {
        uri: response.data.uri,
        cid: response.data.cid,
        validationStatus: response.data.validationStatus,
        value: project,
      } satisfies PutRecordResponse<AppGainforestOrganizationProject.Record>;
    });
};
