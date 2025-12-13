import { validateRecordOrThrow } from "@/server/utils/validate-record-or-throw";
import { toBlobRef, toFile } from "@/zod-schemas";
import { Agent, CredentialSession } from "@atproto/api";
import { AppGainforestOrganizationSite } from "lex-api";

const session = new CredentialSession(new URL("https://climateai.org"));
session.resumeSession({
  accessJwt:
    "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImNvbS5hdHByb3RvLmFjY2VzcyIsImF1ZCI6ImRpZDp3ZWI6Y2xpbWF0ZWFpLm9yZyIsInN1YiI6ImRpZDpwbGM6Y3BvYWdvZHBxcmdzNHQ3dGhpNXozN3VmIiwiaWF0IjoxNzY1NjIyNjUyLCJleHAiOjE3NjU2Mjk4NTJ9.CofQKBKbKGH3UPhI2iOqxUplSRzjmLKXNVmqfTO-_8E",
  refreshJwt:
    "eyJ0eXAiOiJyZWZyZXNoK2p3dCIsImFsZyI6IkhTMjU2In0.eyJzY29wZSI6ImNvbS5hdHByb3RvLnJlZnJlc2giLCJhdWQiOiJkaWQ6d2ViOmNsaW1hdGVhaS5vcmciLCJzdWIiOiJkaWQ6cGxjOmNwb2Fnb2RwcXJnczR0N3RoaTV6Mzd1ZiIsImp0aSI6Iis0TlFQdGlpajZkeWV1Z2NQMFV6MWQzZ2o1dmJZUUhkblEwbVRlYnZrS2MiLCJpYXQiOjE3NjU2MjI2NTIsImV4cCI6MTc3MzM5ODY1Mn0.2lhL_jHmKT3uiDLtArBebqft_tyMeal5MRcMe5pzyqw",
  did: "did:plc:cpoagodpqrgs4t7thi5z37uf",
  handle: "satyam2.climateai.org",
  active: true,
});

const fileGenerator = {
  name: "drawn-polygon.geojson",
  type: "application/geo+json",
  dataBase64:
    "eyJ0eXBlIjoiRmVhdHVyZSIsImdlb21ldHJ5Ijp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy02LjI2Nzg3MzcyNjg1NDcwMjUsMy4yNDkzMDk1MDE0Mzg2NDU1XSxbNC45NzMyNzUwMDMyMTAyNjE1LDIwLjM0NzA1MzUxNjYyNzk1Ml0sWzE0LjM5MDQ3ODg4NTU4NTI4MSwzLjY4MTk3NzY0MTkxNjYxNzVdLFsxNS4wOTEzNTcxNzc5NjcwOTcsLTE0LjA5MzQwODM0MDM1MjgzOF0sWy0xOC4wNzU0NDM2NTMyNDQ1NzcsLTkuMjAwNzgyODQ0MTAyMjkyXSxbLTExLjY1NDQ2ODQxODM4NDYyNCwxMS41NDU0NjcxMjA1MDI1NzldLFstNi4yNjc4NzM3MjY4NTQ3MDI1LDMuMjQ5MzA5NTAxNDM4NjQ1NV1dXX0sInByb3BlcnRpZXMiOnt9fQ==",
};
const file = await toFile(fileGenerator);

const agent = new Agent(session);
const blobRef = await agent.uploadBlob(file);
console.log(typeof blobRef.data.blob, blobRef.data.blob);

const site = {
  $type: "app.gainforest.organization.site",
  name: "Test Site",
  lat: "10.000000",
  lon: "20.000000",
  area: "100.00",
  shapefile: {
    $type: "app.gainforest.common.defs#smallBlob",
    blob: blobRef.data.blob,
  },
  createdAt: "2021-01-01T00:00:00.000Z",
};

console.log(
  `SITE SHAPEFILE\ntype:${typeof blobRef.data.blob}\nvalue:\n`,
  JSON.stringify(blobRef.data.blob)
);

validateRecordOrThrow(site, AppGainforestOrganizationSite);
