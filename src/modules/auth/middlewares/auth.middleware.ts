import config from "@config/index";
import userService from "@user/services/user.service";
import { userNotAuthenticated } from "@utils/express";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";

class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
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

export default AuthMiddleware.getInstance();
