import { CommonRoutesConfig } from "@common/common.routes.config";
import userController from "@user/controllers/user.controller";
import debug from "debug";
import express from "express";
import passport from "./passport";

const debugLog: debug.IDebugger = debug("server:auth-routes");

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.get("/auth/github", passport.authenticate("github"));

    this.app.get(
      "/auth/github/callback",
      passport.authenticate("github"),
      userController.createGithubUser
    );

    return this.app;
  }
}
