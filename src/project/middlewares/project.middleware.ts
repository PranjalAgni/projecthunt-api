import express from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { assert } from "superstruct";
import { CreateProjectStruct } from "../dtos/project.dto";

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
    } catch (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY);
      next(createError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
    }
  }
}

export default ProjectMiddleware.getInstance();
