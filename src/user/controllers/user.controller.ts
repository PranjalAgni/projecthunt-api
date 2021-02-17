import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger";
import { formatResponse } from "../../utils/express";
import { CreateUserDto } from "../dtos/user.dto";

const debugLog: debug.IDebugger = debug("server:user-controller");

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateUserDto;

      return formatResponse({
        res,
        status: 200,
        result: { done: true }
      });
    } catch (ex) {
      debugLog(ex.message);
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }
}

export default UserController.getInstance();
