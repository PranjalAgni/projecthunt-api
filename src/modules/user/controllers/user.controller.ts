import { ReadProjectByUserIdStruct } from "@project/dtos/project.dto";
import projectService from "@project/services/project.service";
import {
  CreateGithubUserDto,
  CreateUserDto,
  ReadUserByIdStruct,
  ReadUserStruct
} from "@user/dtos/user.dto";
import userService from "@user/services/user.service";
import { formatResponse } from "@utils/express";
import logger from "@utils/logger";
import { addSessionToken } from "@utils/session";
import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { create } from "superstruct";

const debugLog: debug.IDebugger = debug("server:user-controller");

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateUserDto;
      const user = await userService.create(data);
      debugLog(user);
      addSessionToken(res, user);
      return formatResponse({
        res,
        result: { done: true }
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = create(req.query, ReadUserStruct);
      const userList = await userService.getAllUsers(data);
      return formatResponse({
        res,
        result: userList
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = create(req.params, ReadUserByIdStruct);

      const user = await userService.findUserById(userId);
      return formatResponse({
        res,
        result: user
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getProjectsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { limit, page } = req.query;
      const data = {
        userId,
        limit,
        page
      };

      const payload = create(data, ReadProjectByUserIdStruct);

      const projects = await projectService.getProjectByUserId(
        payload.userId,
        payload.page,
        payload.limit
      );
      return formatResponse({
        res,
        result: projects
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getVotesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = create(req.params, ReadUserByIdStruct);
      const votes = await userService.getVotesByUserId(userId);
      return formatResponse({
        res,
        result: votes
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getCommentsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = create(req.params, ReadUserByIdStruct);
      const comments = await userService.getCommentsByUserId(userId);

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

  async getHashTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await userService.getHashTags();
      return formatResponse({
        res,
        result: tags
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async createGithubUser(req: Request, res: Response, next: NextFunction) {
    try {
      const githubData = req.user as CreateGithubUserDto;
      debugLog(githubData);
      const githubUser = await userService.createGithubUser(githubData);
      await addSessionToken(res, githubUser.user);
      return formatResponse({ res, result: githubUser });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }
}

export default UserController.getInstance();
