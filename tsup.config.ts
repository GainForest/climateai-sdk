import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "client/index": "src/client/index.ts",
    "utilities/index": "src/utilities/index.ts",
    "utilities/transformer": "src/utilities/transformer.ts",
    "zod-schemas/index": "src/zod-schemas/index.ts",
    "types/index": "src/types/index.ts",
    "server/session": "src/server/session.ts",
    "lex-api/index": "lex-api/index.ts",
  },
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

