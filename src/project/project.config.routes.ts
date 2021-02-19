import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import commonMiddleware from "../common/middlewares/common.middleware";
import projectController from "./controllers/project.controller";
import projectMiddleware from "./middlewares/project.middleware";

export class ProjectRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProjectRoutes");
  }

  configureRoutes(): express.Application {
    console.log("Project:: configureRoutes()");
    this.app
      .route("/projects")
      .post([
        projectMiddleware.validateCreateProjectBody,
        projectController.createProject
      ]);

    this.app
      .route("/projects/:projectId/vote")
      .post([
        commonMiddleware.isAuth,
        projectController.getTotalVotesOfProject
      ]);

    this.app
      .route("/projects/:projectId/comments")
      .get([commonMiddleware.isAuth, projectController.getComments])
      .post([commonMiddleware.isAuth, projectController.createComment]);

    return this.app;
  }
}
