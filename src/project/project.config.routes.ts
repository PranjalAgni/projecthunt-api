import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class ProjectRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProjectRoutes");
  }

  configureRoutes(): express.Application {
    return this.app;
  }
}
