// src/server/session.ts
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
var SECRET_KEY = new TextEncoder().encode(
  process.env.COOKIE_SECRET || "your-secret-key-min-32-chars-long"
);
async function encrypt(payload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(SECRET_KEY);
}
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
async function saveSession(session, service = "climateai.org") {
  const cookieStore = await cookies();
  const encrypted = await encrypt(session);
  cookieStore.set(`${service}_session`, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });
  return encrypted;
}
async function clearSession(service = "climateai.org") {
  const cookieStore = await cookies();
  cookieStore.delete(`${service}_session`);
}
export {
  clearSession,
  getSessionFromRequest,
  saveSession
};
//# sourceMappingURL=session.js.map