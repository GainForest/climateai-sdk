import { defineConfig } from "tsup";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamically read package.json to extract all dependencies
function getExternalDependencies(): (string | RegExp)[] {
  const packageJsonPath = resolve(__dirname, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  const externals: string[] = [];

  // Add all dependencies
  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach((dep) => {
      externals.push(dep);
      // Handle subpath imports (e.g., "multiformats/cid" -> also externalize "multiformats")
      if (dep.includes("/")) {
        const [pkg] = dep.split("/");
        if (pkg && !externals.includes(pkg)) {
          externals.push(pkg);
        }
      }
    });
  }

  // Add all peerDependencies
  if (packageJson.peerDependencies) {
    Object.keys(packageJson.peerDependencies).forEach((dep) => {
      if (!externals.includes(dep)) {
        externals.push(dep);
      }
    });
  }

  return externals;
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "client/index": "src/client/index.ts",
    "utilities/index": "src/utilities/index.ts",
    "utilities/transformer": "src/utilities/transformer.ts",
    "utilities/hypercerts": "src/utilities/hypercerts.ts",
    "zod-schemas/index": "src/zod-schemas/index.ts",
    "types/index": "src/types/index.ts",
    "server/session": "src/server/session.ts",
    "lex-api/index": "lex-api/index.ts",
    "lex-api/util": "lex-api/util.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  target: "node18",
  splitting: false,
  clean: true,
  minify: false,
  outDir: "dist",
  // Externalize all dependencies dynamically from package.json
  // This prevents bundling and the __require polyfill that breaks Next.js
  // Next.js will handle these dependencies at runtime
  noExternal: [],
  external: [
    // Dynamically get all dependencies from package.json
    ...getExternalDependencies(),
    // Also externalize any import that doesn't start with . or / (i.e., all node_modules)
    // BUT exclude @/ path aliases which should be resolved to relative paths
    // This regex matches: package names, @scoped/packages, but NOT @/ (path aliases)
    /^(?!@\/|\.|\/).+/,
  ],
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
