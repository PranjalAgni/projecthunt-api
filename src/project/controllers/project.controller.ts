import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { create } from "superstruct";
import userService from "../../user/services/user.service";
import { formatResponse } from "../../utils/express";
import logger from "../../utils/logger";
import {
  CreateCommentStruct,
  CreateProjectDto,
  ReadProjectIdStruct
} from "../dtos/project.dto";
import projectService from "../services/project.service";

// const debugLog: debug.IDebugger = debug("server:project-controller");

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
      const project = await projectService.create(body);
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

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = create(req.params, ReadProjectIdStruct);
      const project = await projectService.findById(projectId);
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

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const body = create(
        {
          ...req.body,
          projectId: req.params.projectId
        },
        CreateCommentStruct
      );

      const project = await projectService.findById(body.projectId);
      if (!project) {
        throw new Error("Project not exists");
      }

      const user = await userService.findUserById(req.userId);
      const comment = await projectService.createComment(user, project, body);
      return formatResponse({
        res,
        result: comment
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getTotalVotesOfProject(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { projectId } = create(req.params, ReadProjectIdStruct);
      const votes = await projectService.getVotesOnProject(projectId);
      return formatResponse({
        res,
        result: { votes }
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = create(req.params, ReadProjectIdStruct);
      const comments = await projectService.getComments(projectId);
      return formatResponse({
        res,
        result: comments
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }
}

export default ProjectController.getInstance();
