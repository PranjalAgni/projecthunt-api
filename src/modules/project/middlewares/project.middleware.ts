import { CreateProjectStruct } from "@project/dtos/project.dto";
import { unprocessableEntityError } from "@utils/express";
import express from "express";
import { assert } from "superstruct";

class ProjectMiddleware {
  private static instance: ProjectMiddleware;

  static getInstance() {
    if (!ProjectMiddleware.instance) {
      ProjectMiddleware.instance = new ProjectMiddleware();
    }
    return ProjectMiddleware.instance;
  }

  async validateCreateProjectBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.body, CreateProjectStruct);
      return next();
    } catch (ex) {
      return unprocessableEntityError(ex, res, next);
    }
  }
}

export default ProjectMiddleware.getInstance();
