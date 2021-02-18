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
    this.app
      .route("/projects")
      .post([
        commonMiddleware.isAuth,
        projectMiddleware.validateCreateProjectBody,
        projectController.createProject
      ]);

    return this.app;
  }
}
