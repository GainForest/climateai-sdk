---
"gainforest-sdk-nextjs": minor
---

Added audio recording utilities for the GainForest SDK with full CRUD operations.

### New Features
- **Audio Recording CRUD**: Added `get`, `getAll`, `create`, `update`, and `delete` utilities for audio recordings
- **Automatic Metadata Extraction**: Uses `music-metadata` library to automatically extract technical metadata (codec, channels, duration, sampleRate) from uploaded audio files

### API
- `gainforest.organization.recordings.audio.get` - Get a single audio recording by DID and rkey
- `gainforest.organization.recordings.audio.getAll` - List all audio recordings for a DID
- `gainforest.organization.recordings.audio.create` - Create a new audio recording (auto-extracts metadata)
- `gainforest.organization.recordings.audio.update` - Update an existing audio recording
- `gainforest.organization.recordings.audio.delete` - Delete an audio recording by AT URI

### User Input (Create/Update)
Users only need to provide:
- `audioFile` - URL or base64-encoded file
- `recordedAt` - Recording timestamp
- `name` - Recording name
- `coordinates` (optional) - GPS coordinates
- `description` (optional) - Richtext description

Technical metadata (codec, channels, duration, sampleRate) is automatically extracted from the audio file.

### Breaking Changes (lexicon refactor)
- `audioBlob` field renamed to `blob` on the audio recording record
- `format` field removed from recording metadata (format information is available via the blob's MIME type)
- `name` field is now required when creating or updating an audio recording
