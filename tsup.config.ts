import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/client/index.ts",
    "src/utilities/index.ts",
    "src/utilities/transformer.ts",
    "src/zod-schemas/index.ts",
    "src/types/index.ts",
    "src/server/session.ts",
    "lex-api/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  target: "node18",
  splitting: false,
  clean: true,
  minify: false,
  outDir: "dist",
  cjsInterop: true,
  shims: false,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".js" : ".cjs",
    };
  },
  esbuildOptions(options) {
    options.platform = "neutral";
  },
});

