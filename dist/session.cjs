'use strict';

var ironSession = require('iron-session');
var headers = require('next/headers');

// src/_internal/oauth/iron-session/helpers.ts

// src/_internal/oauth/iron-session/config.ts
var DEFAULT_MAX_AGE = 60 * 60 * 24 * 30;
var DEFAULT_COOKIE_NAME = "climateai_session";
function getSessionOptions() {
  const cookieSecret = process.env.COOKIE_SECRET;
  if (!cookieSecret) {
    throw new Error(
      "COOKIE_SECRET environment variable is required for iron-session"
    );
  }
  if (cookieSecret.length < 32) {
    throw new Error("COOKIE_SECRET must be at least 32 characters long");
  }
  return {
    password: cookieSecret,
    cookieName: process.env.COOKIE_NAME || DEFAULT_COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: DEFAULT_MAX_AGE,
      path: "/"
    }
  };
}

// src/_internal/oauth/iron-session/helpers.ts
async function getAppSession() {
  const cookieStore = await headers.cookies();
  const session = await ironSession.getIronSession(
    cookieStore,
    getSessionOptions()
  );
  return {
    did: session.did,
    handle: session.handle,
    isLoggedIn: session.isLoggedIn ?? false
  };
}
async function saveAppSession(data) {
  const cookieStore = await headers.cookies();
  const session = await ironSession.getIronSession(
    cookieStore,
    getSessionOptions()
  );
  if (data.did !== void 0) {
    session.did = data.did;
  }
  if (data.handle !== void 0) {
    session.handle = data.handle;
  }
  if (data.isLoggedIn !== void 0) {
    session.isLoggedIn = data.isLoggedIn;
  }
  await session.save();
}
async function clearAppSession() {
  const cookieStore = await headers.cookies();
  const session = await ironSession.getIronSession(
    cookieStore,
    getSessionOptions()
  );
  session.destroy();
}

exports.clearAppSession = clearAppSession;
exports.getAppSession = getAppSession;
exports.saveAppSession = saveAppSession;
//# sourceMappingURL=session.cjs.map
//# sourceMappingURL=session.cjs.map