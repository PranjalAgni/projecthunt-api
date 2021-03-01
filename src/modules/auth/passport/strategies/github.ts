import debug from "debug";
import { Request } from "express";
import { Profile } from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import config from "../../../../config";

const debugLog: debug.IDebugger = debug("server:passport-github");

export default new GithubStrategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.serverUrl + "/auth" + config.github.callbackURL,
    passReqToCallback: true
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: CallableFunction
  ) => {
    debugLog(`Github User: ${req.user}`);
    debugLog(accessToken);
    debugLog(refreshToken);
    cb(null, profile);
  }
);
