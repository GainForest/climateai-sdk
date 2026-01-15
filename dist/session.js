import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { CredentialSession } from '@atproto/api';
import '@trpc/server';
import 'zod';

// src/_internal/server/session.ts
var resumeCredentialSession = (service) => {
  const credentialSession = new CredentialSession(
    new URL(`https://${service}`)
  );
  return credentialSession.resumeSession;
};

// src/_internal/server/session.ts
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
async function getSessionFromRequest(service = "climateai.org") {
  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get(`${service}_session`);
  if (!encryptedSession) {
    return null;
  }
  return await decrypt(encryptedSession.value);
}

export { getSessionFromRequest, resumeCredentialSession };
//# sourceMappingURL=session.js.map
//# sourceMappingURL=session.js.map