import express from "express";
import commonMiddleware from "./middlewares/common.middleware";

export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
    this.applyCommonMiddlewares();
  }

  getName(): string {
    return this.name;
  }

  applyCommonMiddlewares(): void {
    this.app.use(commonMiddleware.notFound);
    this.app.use(commonMiddleware.errorHandler);
  }

  abstract configureRoutes(): express.Application;
}
