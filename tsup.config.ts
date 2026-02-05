import { defineConfig } from "tsup";

export default defineConfig({
  /**
   * PUBLIC ENTRYPOINTS ONLY
   */
  entry: {
    index: "src/_public/index.ts",
    "lex-api": "src/_public/lex-api/index.ts",
    "lex-api/utils": "src/_public/lex-api/utils.ts",
    utilities: "src/_public/utilities/index.ts",
    "utilities/atproto": "src/_public/utilities/atproto.ts",
    "utilities/hypercerts": "src/_public/utilities/hypercerts.ts",
    "utilities/transform": "src/_public/utilities/transform.ts",
    "utilities/geojson": "src/_public/utilities/geojson.ts",
    client: "src/_public/client.ts",
    session: "src/_public/session.ts",
    oauth: "src/_public/oauth.ts",
    types: "src/_public/types.ts",
    zod: "src/_public/zod.ts",
  },

  /**
   * Output formats
   */
  format: ["esm", "cjs"],

  /**
   * Types
   */
  dts: {
    resolve: true,
  },

  /**
   * Build behavior
   */
  clean: true,
  sourcemap: true,
  target: "es2020",

  /**
   * SDK-friendly output
   */
  treeshake: true,
  splitting: false,
  minify: false,

  /**
   * Do NOT bundle deps
   */
  skipNodeModulesBundle: true,

  /**
   * Safety: keep runtime imports external
   */
  external: ["next/headers"],
});
