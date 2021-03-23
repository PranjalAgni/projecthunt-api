import { CommonRoutesConfig } from "@common/common.routes.config";
import authMiddleware from "@auth/middlewares/auth.middleware";
import userController from "@user/controllers/user.controller";
import userMiddleware from "@user/middlewares/user.middleware";
import express from "express";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/users")
      .get(userController.getAllUsers)
      .post([userMiddleware.validateCreateUserBody, userController.createUser]);

    this.app.route("/users/:userId").get([userController.getUserById]);

    this.app
      .route("/users/:userId/projects")
      .get([userController.getProjectsByUserId]);

    this.app
      .route("/users/:userId/votes")
      .get([authMiddleware.isAuth, userController.getVotesByUserId]);

    this.app
      .route("/users/:userId/comments")
      .get(userController.getCommentsByUserId);

    this.app.route("/hashtags").get(userController.getHashTags);

    return this.app;
  }
}
