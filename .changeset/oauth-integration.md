---
"climateai-sdk": minor
---

Added OAuth authentication support using @hypercerts-org/sdk-core. This replaces the previous credential-based authentication with a secure OAuth flow that stores tokens in Supabase and user identity in encrypted iron-session cookies. Improved error handling in session and state stores to distinguish between "not found" and actual database failures.

### Breaking Changes
- **Removed**: `/api/oauth/login`, `/api/oauth/logout`, `/api/oauth/resume` routes (credential-based auth)
- **Changed**: `getWriteAgent()` now requires `sdk` parameter: `getWriteAgent(ctx.sdk)` instead of `getWriteAgent()`
- **Changed**: `createContext()` now requires `sdk` option: `createContext({ sdk, allowedPDSDomains })`

### New Features
- **Added**: `miscellaneous.onboard` procedure for creating organization info records using JWT credentials directly (bypassing OAuth). This enables seamless onboarding flows where users can complete account setup immediately after `createAccount` without requiring an OAuth redirect.
- **Added**: `createAgentFromJwt()` helper function to create authenticated ATProto agents from JWT credentials
- **Added**: `JwtCredentialsSchema` for validating JWT credential objects (did, handle, accessJwt, refreshJwt)
