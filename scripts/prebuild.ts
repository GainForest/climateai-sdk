// Check if any src/_public files use path aliases in imports.
// This is a pre-build check to ensure that no path aliases are used in the public API.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "src", "_public");

const FORBIDDEN_ALIAS = "@/";

const ALLOWED_EXTENSIONS = new Set([".ts", ".tsx"]);

const SHOULD_FIX = process.argv.includes("--fix");

type Violation = {
  file: string;
  line: number;
  text: string;
};

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (ALLOWED_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findViolations(source: string): number[] {
  const lines = source.split("\n");
  const violatingLines: number[] = [];

  lines.forEach((line, index) => {
    if (
      (line.includes("import") || line.includes("export")) &&
      (line.includes(`"${FORBIDDEN_ALIAS}`) ||
        line.includes(`'${FORBIDDEN_ALIAS}`))
    ) {
      violatingLines.push(index);
    }
  });

  return violatingLines;
}

function getReplacementForDepth(depth: number): string {
  // depth 0 (directly under _public) -> "../"
  // depth 1 (one level deep) -> "../../"
  // depth x -> x+1 "../"s
  return "../".repeat(depth + 1);
}

function applyFix(source: string, filePath: string): string {
  const relativePath = relative(PUBLIC_DIR, filePath);
  // Count depth: number of directories in the path (excluding filename)
  const depth = relativePath.split("/").length - 1;
  const replacement = getReplacementForDepth(depth);

  return source
    .replaceAll(`"${FORBIDDEN_ALIAS}`, `"${replacement}`)
    .replaceAll(`'${FORBIDDEN_ALIAS}`, `'${replacement}`);
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const violations: Violation[] = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    const violatingLines = findViolations(source);

    if (violatingLines.length > 0) {
      if (SHOULD_FIX) {
        const fixed = applyFix(source, file);
        await writeFile(file, fixed, "utf8");
      } else {
        const lines = source.split("\n");
        violatingLines.forEach((line) => {
          violations.push({
            file,
            line: line + 1,
            text: lines[line]?.trim() ?? "",
          });
        });
      }
    }
  }

  if (violations.length > 0) {
    console.error(
      "\n❌ Forbidden path alias imports detected in src/_public:\n"
    );

    for (const v of violations) {
      console.error(
        `• ${v.file.replace(process.cwd(), "")}:${v.line}\n  → ${v.text}\n`
      );
    }

    console.error(
      "Public API files must use ONLY relative imports.\n" +
        "Path aliases (e.g. @/) are allowed in src/_internal, but NEVER in src/_public.\n\n" +
        "👉 Run this command to auto-fix:\n\n" +
        "   bun run scripts/pre-build.ts --fix\n"
    );

    process.exit(1);
  }

  if (SHOULD_FIX) {
    console.log("✅ Alias imports fixed successfully in src/_public");
  } else {
    console.log("✅ Public API import check passed");
  }
}

main().catch((err) => {
  console.error("Pre-build check failed:", err);
  process.exit(1);
});
