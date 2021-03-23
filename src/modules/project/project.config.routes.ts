import { CommonRoutesConfig } from "@common/common.routes.config";
import authMiddleware from "@auth/middlewares/auth.middleware";
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
      .get([authMiddleware.isAuth, projectController.getProjectById]);

    this.app
      .route("/projects/:projectId/vote")
      .post([authMiddleware.isAuth, projectController.getTotalVotesOfProject]);

    this.app
      .route("/projects/:projectId/comments")
      .get([authMiddleware.isAuth, projectController.getComments])
      .post([authMiddleware.isAuth, projectController.createComment]);

    return this.app;
  }
}
