import debug from "debug";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";
import logger from "../../utils/logger";
import { CreateProjectDto } from "../dtos/project.dto";
import projectService from "../services/project.service";
import { formatResponse } from "../../utils/express";
const log: debug.IDebugger = debug("server:user-controller");

class ProjectController {
  private static instance: ProjectController;

  static getInstance(): ProjectController {
    if (!ProjectController.instance) {
      ProjectController.instance = new ProjectController();
    }
    return ProjectController.instance;
  }

  async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateProjectDto;
      const project = projectService.create(body);
      return formatResponse({
        res,
        result: project
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }
}

export default ProjectController.getInstance();
