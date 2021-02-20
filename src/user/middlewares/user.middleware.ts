import express from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { assert } from "superstruct";
import { CreateUserStruct, ReadUserByIdStruct } from "../dtos/user.dto";

class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance() {
    if (!UserMiddleware.instance) {
      UserMiddleware.instance = new UserMiddleware();
    }
    return UserMiddleware.instance;
  }

  invalidRequestBodyError(
    res: express.Response,
    next: express.NextFunction,
    error: Error
  ) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY);
    next(createError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
  }

  validateCreateUserBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.body, CreateUserStruct);
      return next();
    } catch (ex) {
      return UserMiddleware.getInstance().invalidRequestBodyError(
        res,
        next,
        ex
      );
    }
  }

  validateUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const params = req.params;
      assert(params, ReadUserByIdStruct);
    } catch (ex) {
      return UserMiddleware.getInstance().invalidRequestBodyError(
        res,
        next,
        ex
      );
    }
  }
}

export default UserMiddleware.getInstance();
