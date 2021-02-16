import express from "express";
import { asyncUtil } from "../utils/express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import userController from "./controllers/user.controller";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route("/user").post(asyncUtil(userController.createUser));
    return this.app;
  }
}
