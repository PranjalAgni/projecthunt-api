import { CommonRoutesConfig } from "@common/common.routes.config";
import commonMiddleware from "@common/middlewares/common.middleware";
import projectController from "@project/controllers/project.controller";
import projectMiddleware from "@project/middlewares/project.middleware";
import express from "express";

export class ProjectRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProjectRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/projects")
      .post([
        projectMiddleware.validateCreateProjectBody,
        projectController.createProject
      ]);

    this.app
      .route("/projects/:projectId")
      .get([commonMiddleware.isAuth, projectController.getProjectById]);

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
