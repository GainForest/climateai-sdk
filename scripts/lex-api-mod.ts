const imports = `/**
 * The following lines are added by lex-api-mod.ts to fix build errors.
 */
import {
  ComAtprotoRepoListRecords,
  ComAtprotoRepoGetRecord,
  ComAtprotoRepoCreateRecord,
  ComAtprotoRepoPutRecord,
  ComAtprotoRepoDeleteRecord,
} from "@atproto/api";
/**
 * GENERATED CODE - DO NOT MODIFY
 */
`;
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const targetPath = resolve(__dirname, "../lex-api/index.ts");

if (!existsSync(targetPath)) {
  console.error("lex-api/index.ts not found, skipping lex-api-mod.");
  process.exit(1);
}

const file = readFileSync(targetPath, "utf8");

if (file.includes(imports)) {
  console.log("lex-api/index.ts already contains lex-api-mod imports.");
  process.exit(0);
}

writeFileSync(targetPath, `${imports}\n${file}`, "utf8");
console.log("Inserted lex-api-mod imports into lex-api/index.ts.");
