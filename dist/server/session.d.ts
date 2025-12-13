import { JwtPayload } from '@atproto/oauth-client-node';
import { SupportedPDSDomain } from '@/index';

interface StoredSession extends JwtPayload {
    accessJwt: string;
    refreshJwt: string;
    did: string;
    handle: string;
}
declare function getSessionFromRequest(service?: SupportedPDSDomain): Promise<StoredSession | null>;
declare function saveSession(session: StoredSession, service?: SupportedPDSDomain): Promise<string>;
declare function clearSession(service?: SupportedPDSDomain): Promise<void>;

export { type StoredSession, clearSession, getSessionFromRequest, saveSession };
