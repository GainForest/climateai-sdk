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
