import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import userController from "./controllers/user.controller";
import commonMiddleware from "../common/middlewares/common.middleware";
import userMiddleware from "./middlewares/user.middleware";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get([userController.getAllUsers])
      .post([
        commonMiddleware.isAuth,
        userMiddleware.validateCreateUserBody,
        userController.createUser
      ]);
    return this.app;
  }
}
