---
"gainforest-sdk-nextjs": patch
---

Refactored LinearDocument support into a dedicated Zod schema module (`zod-schemas/linear-document`) with reusable `LinearDocumentSchema` and `toLinearDocument` converter, replacing the ad-hoc string-based `longDescription`/`description` fields in organization info and hypercerts collection inputs.
