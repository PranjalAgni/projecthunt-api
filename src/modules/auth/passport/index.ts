import debug from "debug";
import passport from "passport";

import GithubStrategy from "./strategies/github";

const debugLog: debug.IDebugger = debug("server:passport");

passport.use(GithubStrategy);

passport.serializeUser(function (user, done) {
  debugLog(`Serializing: ${user}`);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  debugLog(`Deserializing: ${user}`);
  return done(null, user);
});

export default passport;
