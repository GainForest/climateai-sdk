'use strict';

var headers = require('next/headers');
var jose = require('jose');
var api = require('@atproto/api');
require('@trpc/server');
require('zod');

// src/_internal/server/session.ts
var resumeCredentialSession = (service) => {
  const credentialSession = new api.CredentialSession(
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
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}
async function getSessionFromRequest(service = "climateai.org") {
  const cookieStore = await headers.cookies();
  const encryptedSession = cookieStore.get(`${service}_session`);
  if (!encryptedSession) {
    return null;
  }
  return await decrypt(encryptedSession.value);
}

exports.getSessionFromRequest = getSessionFromRequest;
exports.resumeCredentialSession = resumeCredentialSession;
//# sourceMappingURL=session.cjs.map
//# sourceMappingURL=session.cjs.map