import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import userService from "../../user/services/user.service";
import config from "../../config";
import userDao from "../../user/daos/user.dao";
import {
  createTokens,
  verifyAccessToken,
  verifyRefreshToken
} from "../../utils/jwt";
import logger from "../../utils/logger";
import { userNotAuthenticated } from "../../utils/express";

// const debugLog = debug("server:common-middleware");
class CommonMiddleware {
  private static instance: CommonMiddleware;

  static getInstance() {
    if (!CommonMiddleware.instance) {
      CommonMiddleware.instance = new CommonMiddleware();
    }
    return CommonMiddleware.instance;
  }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(`Inside auth interceptor for url ${req.originalUrl}`);
      const authHeader = req.headers["authorization"];
      let token = null;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
      }

      if (!token) {
        return userNotAuthenticated(res, next);
      }

      logger.info(`Extracted token: ${token}`);

      const user = await userService.getUserBySessionId(token);

      if (!user) {
        logger.error("No user found");
        return userNotAuthenticated(res, next);
      }

      logger.info("User fetched, attaching it to request object");
      req.user = user;
      return next();
    } catch (error) {
      logger.error(error.message);
      return userNotAuthenticated(res, next);
    }
  }

  notFound(req: Request, res: Response, next: NextFunction) {
    res.status(StatusCodes.NOT_FOUND);
    return next(
      createError(StatusCodes.NOT_FOUND, `${req.originalUrl} not found`)
    );
  }

  errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) {
    const statusCode = res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode);
    return res.json({
      status: statusCode,
      result: null,
      error: config.isDev ? error.stack : []
    });
  }
}

export default CommonMiddleware.getInstance();
