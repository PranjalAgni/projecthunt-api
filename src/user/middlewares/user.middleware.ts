import express from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { assert } from "superstruct";
import { CreateUserStruct } from "../dtos/user.dto";

class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance() {
    if (!UserMiddleware.instance) {
      UserMiddleware.instance = new UserMiddleware();
    }
    return UserMiddleware.instance;
  }

  async validateCreateUserBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.body, CreateUserStruct);
      return next();
    } catch (ex) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY);
      return next(createError(StatusCodes.UNPROCESSABLE_ENTITY, ex.message));
    }
  }
}

export default UserMiddleware.getInstance();
