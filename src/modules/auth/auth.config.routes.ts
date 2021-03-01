import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import passport from "./passport";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.get("/auth/github", passport.authenticate("github"));

    this.app.get(
      "/auth/github/callback",
      passport.authenticate("github"), (req, res, next) => {
        console.log("User: ", req.user)
        res.json({text: "one life"})
      })
    );
    return this.app;
  }
}
