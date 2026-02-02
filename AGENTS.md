# AGENTS.md - ClimateAI SDK Development Guide

This guide provides essential information for AI coding agents working on the ClimateAI SDK codebase.

## Build & Test Commands

### Installation
```bash
bun install
```

### Build
```bash
bun run build           # Full build (runs prebuild + tsup)
bun run prebuild        # Pre-build checks (validates no path aliases in _public)
```

### Lexicon Generation
```bash
bun run lexgen          # Generate TypeScript types from lexicons
```

### Testing
Currently no test commands configured. Tests are located in `tests/` directory.
To run a single test file (when test framework is added):
```bash
# Pattern (example for future):
bun test tests/server-caller-types.ts
```

## Code Style Guidelines

### Import Organization
1. **External dependencies** (npm packages)
2. **Internal types** (with `type` keyword when type-only)
3. **Internal utilities** (from `@/` alias or relative paths)
4. **Relative imports** (sibling/child files)

```typescript
// Good
import { z } from "zod";
import type { SupportedPDSDomain } from "@/_internal/types";
import { tryCatch } from "@/_internal/lib/tryCatch";
import { getBlobUrl } from "./getBlobUrl";
```

### Path Aliases
- **NEVER use `@/` aliases in `src/_public/`** - only relative imports allowed
- **Always use `@/` aliases in `src/_internal/`** to reference internal code
- Path alias `@/` maps to `./src/*`

```typescript
// ✅ Good - in _internal files
import { ClimateAiSDK } from "@/_internal/index";

// ❌ Bad - in _public files
import { something } from "@/_internal/client";  // Use relative path instead

// ✅ Good - in _public files
import { something } from "../_internal/client";
```

### Formatting
- **No explicit linter/formatter config** - rely on TypeScript strict mode
- **2 spaces** for indentation (observed pattern)
- **Double quotes** for strings (preferred)
- **Semicolons** required at end of statements
- **No trailing commas** in single-line objects

### Types
- **Prefer `type` over `interface`** for all type definitions
- **PascalCase** for type names: `GetRecordResponse`, `SupportedPDSDomain`
- **Use `type` keyword** for type-only imports: `import type { Foo }`
- **Generic constraints**: `<T extends SupportedPDSDomain>`
- **Type suffixes**: `Response`, `Schema`, `Factory`, `Record`, `Generator`

```typescript
// ✅ Good
export type GetRecordResponse<T> = {
  uri: string;
  value: T;
};

// ❌ Avoid
export interface GetRecordResponse<T> {
  uri: string;
  value: T;
}
```

### Naming Conventions

#### Files & Directories
- **kebab-case** for files: `classify-xrpc-error.ts`, `validate-record-or-throw.ts`
- **lowercase** for directories: `atproto`, `gainforest`, `hypercerts`
- **Prefix `_`** for special directories: `_internal`, `_public`

#### Functions
- **camelCase**: `tryCatch`, `getBlobUrl`, `parseAtUri`
- **Verb-first**: `getOrganizationInfo`, `createClaimActivity`, `validateRecordOrThrow`
- **Factory suffix**: `loginFactory`, `getSiteFactory`
- **Pure suffix**: `getOrganizationInfoPure` (for reusable logic without side effects)

#### Variables
- **camelCase**: `allowedPDSDomains`, `trpcEndpoint`, `activityResponse`
- **SCREAMING_SNAKE_CASE** for constants: `HECTARES_PER_SQUARE_METER`
- **Boolean prefixes**: `is`, `has` (e.g., `isObject`, `hasPolygons`)

#### Classes
- **PascalCase**: `ClimateAiSDK`, `AppRouterFactory`

### Error Handling

#### Tuple Pattern (Preferred)
```typescript
import { tryCatch } from "@/_internal/lib/tryCatch";

const [response, error] = await tryCatch(getRecordPromise);
if (error) {
  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
}
// Use response safely
```

#### Validation with Throwing
```typescript
export const validateRecordOrThrow = <T>(
  record: unknown,
  { validateRecord }: { validateRecord: (record: unknown) => ValidationResult<T> }
) => {
  const result = validateRecord(record);
  if (!result.success) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: result.error,
    });
  }
  return result.data;
};
```

#### Error Classification
- Convert `XRPCError` → `TRPCError` using `xrpcErrorToTRPCError`
- Use appropriate TRPC error codes: `BAD_REQUEST`, `NOT_FOUND`, `UNAUTHORIZED`, `INTERNAL_SERVER_ERROR`, `UNPROCESSABLE_CONTENT`

### Validation & Runtime Safety
- **Zod schemas** for runtime validation
- **Type inference**: `type Foo = z.infer<typeof FooSchema>`
- **Validate then type-assert** pattern:
  ```typescript
  const parsed = FooSchema.parse(unknownData);
  // parsed is now typed as Foo
  ```

### Code Organization

#### Directory Structure
```text
src/
├── _internal/              # Private implementation (use @/ aliases)
│   ├── client/            # Client-side TRPC setup
│   ├── oauth/             # OAuth utilities
│   │   ├── iron-session/  # Cookie-based session management
│   │   └── stores/        # Supabase session/state stores
│   ├── server/            # Server-side routers & utils
│   │   ├── routers/       # Feature-based routing
│   │   └── utils/         # Server utilities
│   ├── lib/               # Shared utilities
│   ├── types/             # Type definitions
│   ├── utilities/         # Utility functions
│   └── zod-schemas/       # Zod validators
└── _public/               # Public API surface (relative imports only!)
```

#### Feature-Based Routing
- Mirror domain structure: `atproto/gainforest/organization/info/get.ts`
- Each feature: `get.ts`, `create.ts`, `update.ts`, `delete.ts`
- Use factory pattern for typed procedures

#### Factory Pattern
```typescript
export const getSiteFactory = <T extends SupportedPDSDomain>(
  allowedPDSDomainSchema: z.ZodEnum<Record<T, T>>
) => {
  return publicProcedure
    .input(z.object({ did: z.string() }))
    .query(async ({ input }) => {
      // implementation
    });
};
```

### TypeScript Configuration
- **Strict mode enabled**: `"strict": true`
- **Index access checking**: `"noUncheckedIndexedAccess": true`
- **Module resolution**: `"moduleResolution": "bundler"`
- **Target**: `ESNext`

### Comments & Documentation
- Add **TODO comments** when work is incomplete
- **JSDoc** for public API functions
- Describe **why**, not what (code should be self-documenting)

### Generated Code
- Files in `lex-api/` are **auto-generated** - do not modify
- Run `bun run lexgen` to regenerate from lexicons
- Header: `"GENERATED CODE - DO NOT MODIFY"`

## Common Patterns

### Type Guards
```typescript
const isObject = (value: unknown): value is object => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};
```

### Serialization
```typescript
import { serialize, deserialize } from "@/_internal/utilities/transform";

const serialized = serialize(data);
const deserialized = deserialize<MyType>(serialized);
```

### Async Error Handling
```typescript
const [result, error] = await tryCatch(asyncOperation());
if (error) {
  // handle error
  return;
}
// use result
```

## Critical Rules

1. **NEVER import from `_public` in `_internal` files** - only the reverse is allowed
2. **NEVER use path aliases (`@/`) in `src/_public/`** - pre-build will fail
3. **NEVER modify files in `lex-api/`** - they are generated
4. **ALWAYS use tuple pattern** for async error handling when available
5. **ALWAYS validate unknown data** with Zod before using
6. **PREFER `type` over `interface`** for consistency
7. **KEEP server-only code in `_internal`** - never expose to client builds

## OAuth & Authentication

The SDK uses ATProto OAuth for authentication. Key concepts:

- **iron-session**: Stores minimal user identity (DID, handle) in an encrypted cookie
- **Supabase stores**: Store full OAuth tokens and temporary auth state in PostgreSQL
- **SDK injection**: The `ATProtoSDK` instance is passed to tRPC context, not imported as a singleton

For full setup instructions, see [`docs/oauth-setup-guide.md`](docs/oauth-setup-guide.md).

### Supabase Error Handling

When querying Supabase with `.single()`, distinguish "not found" from actual DB errors:

```typescript
const { data, error } = await supabase.from(TABLE).select().eq("id", id).single();

// "Not found" - PGRST116 means no rows returned for .single()
if (error?.code === "PGRST116") {
  return undefined;
}

// Actual DB error - throw so callers can handle appropriately
if (error) {
  throw new Error(`Failed to get record: ${error.message}`);
}
```

## Changesets

**Mandatory for all Pull Requests affecting code.**

### Workflow
- **Trigger**: Always run `npx changeset` before requesting a review if you have modified code.
- **Consolidation**: If a changeset file already exists in the PR, **modify the existing file** instead of creating a new one.
- **One per PR**: Never create multiple changeset files for a single PR.
- **Naming**: Use descriptive names (e.g., `oauth-integration.md`), not random generated names.

### Quality Standards
The changeset summary is published to the changelog. Write it for human users.
- **Good**: "Added OAuth authentication support with iron-session and Supabase stores."
- **Bad**: "feat: add oauth", "fixed bug", "wip", "update utils".

### Verification
Ensure a markdown file was created in the `.changeset/` directory (e.g., `.changeset/oauth-integration.md`).
---

## What is this SDK?

A batteries-included tRPC SDK for Next.js applications that need to interact with Gainforest/Hypercerts ATProto PDSes.

### The Problem

Multiple applications need to fetch data from our ATProto PDSes (and other supported ones). Without this SDK, each app would reimplement the same logic for authentication, data fetching, mutations, and type definitions.

### The Solution

This SDK extracts all shared logic into a single, scalable package that any Next.js application can use. It provides:

- **Type-safe data fetching and mutations** - Full end-to-end type safety with tRPC
- **Out-of-the-box authentication** - Session management with secure cookie-based auth
- **Pre-built utilities** - ATProto helpers, blob URL resolution, URI parsing
- **Zod validation schemas** - Reusable schemas for common data structures
- **Domain types** - Shared TypeScript types for Ecocerts, claims, organizations, etc.

### Who should use it?

- **Internal apps** - Any Gainforest Next.js application that needs PDS data
- **External developers** - Anyone building Next.js apps that interact with our PDSes

### Why Next.js only?

The SDK uses Next.js-specific features (server components, API routes, cookies via `next/headers`) for optimal integration. This constraint enables better DX and type safety.

---

## Development Rules

### Core Principles

1. **Scalability first** - Code must be organized so any developer intuitively knows where to find files
2. **Single responsibility** - Each file contains only what it needs; reusable logic lives elsewhere
3. **Strict typing** - Never use `any` type; all code must be tightly typed with no loose ends
4. **Controlled public API** - Only `_public/` defines what consumers can import

---

### Internal vs Public

| Aspect | `_internal/` | `_public/` |
|--------|--------------|------------|
| Purpose | All implementation code | Public API surface |
| Imports | Use `@/` path aliases | **NEVER use aliases** - use relative paths only |
| Contents | Full implementations | Thin re-exports only |

---

### File Naming Rules

- Use **lowercase with hyphens** for most files: `get-blob-url.ts`, `validate-record.ts`
- Use **PascalCase** for type/class files: `Ecocert.ts`, `LinearDocument.ts`
- One primary export per file when possible
- Name files by what they do, making their purpose immediately clear

---

### Import Rules

#### In `_internal/` - Use Path Aliases
```typescript
// CORRECT
import { getReadAgent } from "@/_internal/server/utils/agent";

// AVOID deep relative paths
import { getReadAgent } from "../../../server/utils/agent";
```

#### In `_public/` - NEVER Use Aliases
```typescript
// CORRECT - relative paths only
export * from "../../_internal/utilities/atproto";

// WRONG - will break the build
export * from "@/_internal/utilities/atproto";
```

---

### Adding New Exports

When exposing new functionality to consumers, you must update:

1. **Create implementation** in `_internal/`
2. **Create re-export** in `_public/` using relative paths (no aliases)
3. **Update `package.json`** exports field with types, import, and require paths
4. **Update `tsup.config.ts`** entry points
5. **Run build** to verify IntelliSense works

---

### TypeScript Rules

#### Never Use `any`
```typescript
// WRONG
function process(data: any) { ... }

// CORRECT - use generics
function process<T extends Record<string, unknown>>(data: T) { ... }

// CORRECT - use unknown and narrow
function process(data: unknown) {
  if (isObject(data)) { ... }
}
```

#### Use Type Guards
```typescript
export const isObject = (value: unknown): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
```

#### Use `satisfies` for Compile-Time Checks
```typescript
return {
  uri: response.data.uri,
  cid: response.data.cid,
  value: record,
} satisfies PutRecordResponse<MyRecord>;
```

#### Infer Types from Zod Schemas
```typescript
const MySchema = z.object({ id: z.string(), name: z.string() });
type MyType = z.infer<typeof MySchema>;
```

---

### Code Organization Rules

#### Single Responsibility
Each file should have one clear purpose. If you find yourself adding unrelated functionality, create a new file.

#### Reusable Code
If code could be used by multiple files, extract it to a shared location where it makes sense. Never duplicate logic across files.

#### Pluggable Design
Structure code so components can be imported and used independently. Avoid tight coupling between unrelated modules.

---

### Error Handling

```typescript
import { TRPCError } from "@trpc/server";

if (!response.success) {
  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Failed to create record",
  });
}
```

---

### Zod Schema Naming

```typescript
// Schema names end with "Schema"
export const BlobRefGeneratorSchema = z.object({ ... });

// Converter functions match the type
export const toBlobRefGenerator = (blobRef: BlobRef): BlobRefGenerator => { ... };
export const toBlobRef = (generator: BlobRefGenerator): BlobRef => { ... };
```

---

### Checklist for New Features

- [ ] Implementation in `_internal/` with proper organization
- [ ] Types are strict - no `any` usage
- [ ] Reusable logic extracted to appropriate shared location
- [ ] Re-export in `_public/` using relative paths (no aliases)
- [ ] `package.json` exports field updated
- [ ] `tsup.config.ts` entry points updated
- [ ] Build passes without errors
