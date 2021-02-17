import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { create } from "superstruct";
import { formatResponse } from "../../utils/express";
import { createTokens } from "../../utils/jwt";
import logger from "../../utils/logger";
import { CreateUserDto, ReadUserDto, ReadUserStruct } from "../dtos/user.dto";
import userService from "../services/user.service";

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
      const { accessToken, refreshToken } = createTokens(user);
      res.setHeader("access-token", accessToken);
      res.setHeader("refresh-token", refreshToken);
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
}

export default UserController.getInstance();
