import express from "express";
import commonMiddleware from "./middlewares/common.middleware";

export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  getName(): string {
    return this.name;
  }

  static applyErrorHandleMiddlewares(app: express.Application): void {
    app.use(commonMiddleware.notFound);
    app.use(commonMiddleware.errorHandler);
  }

  abstract configureRoutes(): express.Application;
}
