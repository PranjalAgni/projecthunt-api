import config from "@config/index";
import debug from "debug";
import { Request } from "express";
import { Profile, Strategy as GithubStrategy } from "passport-github2";
const debugLog: debug.IDebugger = debug("server:passport-github");

export default new GithubStrategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.serverUrl + "/auth" + config.github.callbackURL,
    passReqToCallback: true
  },
  async (
    _req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: CallableFunction
  ) => {
    debugLog(`Profile: ${JSON.stringify(profile.id, undefined, 3)}`);

    // check if profile.id exists means user is already signed up
    // if not signed up, it means he is a new user

    const githubData = {
      ...profile,
      accessToken,
      refreshToken
    };

    cb(null, githubData);
  }
);
