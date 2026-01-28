# Agent Instructions

## 🦋 Changesets

**Mandatory for all Pull Requests affecting code.**

### 1. Workflow
- **Trigger**: Always run `npx changeset` before requesting a review if you have modified code.
- **Consolidation**: If a changeset file already exists in the PR, **modify the existing file** instead of creating a new one.
- **One per PR**: Never create multiple changeset files for a single PR.

### 2. Quality Standards
The changeset summary is published to the changelog. Write it for human users.
- ✅ **Good**: "Added a bulk export feature to the admin dashboard."
- ❌ **Bad**: "feat: add export", "fixed bug", "wip", "update utils".

### 3. Verification
- Ensure a markdown file was created in the `.changeset/` directory (e.g., `.changeset/tasty-apples-fly.md`).

---

## Core Principles

1. **Scalability first** - Code must be organized so any developer intuitively knows where to find files
2. **Single responsibility** - Each file contains only what it needs; reusable logic lives elsewhere
3. **Strict typing** - Never use `any` type; all code must be tightly typed with no loose ends
4. **Controlled public API** - Only `_public/` defines what consumers can import

---

## Internal vs Public

| Aspect | `_internal/` | `_public/` |
|--------|--------------|------------|
| Purpose | All implementation code | Public API surface |
| Imports | Use `@/` path aliases | **NEVER use aliases** - use relative paths only |
| Contents | Full implementations | Thin re-exports only |

---

## File Naming Rules

- Use **lowercase with hyphens** for most files: `get-blob-url.ts`, `validate-record.ts`
- Use **PascalCase** for type/class files: `Ecocert.ts`, `LinearDocument.ts`
- One primary export per file when possible
- Name files by what they do, making their purpose immediately clear

---

## Import Rules

### In `_internal/` - Use Path Aliases
```typescript
// CORRECT
import { getReadAgent } from "@/_internal/server/utils/agent";

// AVOID deep relative paths
import { getReadAgent } from "../../../server/utils/agent";
```

### In `_public/` - NEVER Use Aliases
```typescript
// CORRECT - relative paths only
export * from "../../_internal/utilities/atproto";

// WRONG - will break the build
export * from "@/_internal/utilities/atproto";
```

---

## Adding New Exports

When exposing new functionality to consumers, you must update:

1. **Create implementation** in `_internal/`
2. **Create re-export** in `_public/` using relative paths (no aliases)
3. **Update `package.json`** exports field with types, import, and require paths
4. **Update `tsup.config.ts`** entry points
5. **Run build** to verify IntelliSense works

---

## TypeScript Rules

### Never Use `any`
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

### Use Type Guards
```typescript
export const isObject = (value: unknown): value is object => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
```

### Use `satisfies` for Compile-Time Checks
```typescript
return {
  uri: response.data.uri,
  cid: response.data.cid,
  value: record,
} satisfies PutRecordResponse<MyRecord>;
```

### Infer Types from Zod Schemas
```typescript
const MySchema = z.object({ id: z.string(), name: z.string() });
type MyType = z.infer<typeof MySchema>;
```

---

## Code Organization Rules

### Single Responsibility
Each file should have one clear purpose. If you find yourself adding unrelated functionality, create a new file.

### Reusable Code
If code could be used by multiple files, extract it to a shared location where it makes sense. Never duplicate logic across files.

### Pluggable Design
Structure code so components can be imported and used independently. Avoid tight coupling between unrelated modules.

---

## Error Handling

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

## Zod Schema Naming

```typescript
// Schema names end with "Schema"
export const BlobRefGeneratorSchema = z.object({ ... });

// Converter functions match the type
export const toBlobRefGenerator = (blobRef: BlobRef): BlobRefGenerator => { ... };
export const toBlobRef = (generator: BlobRefGenerator): BlobRef => { ... };
```

---

## Checklist for New Features

- [ ] Implementation in `_internal/` with proper organization
- [ ] Types are strict - no `any` usage
- [ ] Reusable logic extracted to appropriate shared location
- [ ] Re-export in `_public/` using relative paths (no aliases)
- [ ] `package.json` exports field updated
- [ ] `tsup.config.ts` entry points updated
- [ ] Build passes without errors
