---
"gainforest-sdk-nextjs": minor
---

Added `miscellaneous.onboard` tRPC route for credential-based organization onboarding.

### New Features
- **`miscellaneous.onboard`**: A new tRPC mutation that creates or updates organization info using raw ATProto credentials (DID, handle, accessJwt, refreshJwt) supplied directly in the request body, bypassing the OAuth session store. Intended for server-to-server calls and bootstrapping flows where the caller already holds valid JWT tokens.

### API
- `miscellaneous.onboard` — accepts `credentials`, `pdsDomain`, `info` (same schema as `gainforest.organization.info.createOrUpdate`), and optional `uploads` (logo, coverImage)

### Implementation Details
- Internally reuses `createOrUpdateOrganizationInfoPure` from the existing organization info router
- Builds an authenticated `AtpAgent` on the spot via `resumeSession`, with automatic token refresh if the access JWT is expired
