import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import config from "../../config";
import userDao from "../../user/daos/user.dao";
import {
  createTokens,
  verifyAccessToken,
  verifyRefreshToken
} from "../../utils/jwt";
import logger from "../../utils/logger";

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
    const userIsNotAuthorized = () => {
      logger.error("User not authenitcated, going to return 401");
      res.status(StatusCodes.UNAUTHORIZED);
      return next(
        createError(
          StatusCodes.UNAUTHORIZED,
          getReasonPhrase(StatusCodes.UNAUTHORIZED)
        )
      );
    };

    logger.info(`Inside auth interceptor for url ${req.originalUrl}`);

    const accessToken = req.headers["access-token"];

    if (typeof accessToken !== "string") {
      return userIsNotAuthorized();
    }

    let userData = null;
    try {
      userData = verifyAccessToken(accessToken);
      logger.info(`Auth token valid, attaching userId`);
      req.userId = userData.userId;
    } catch (accessTokenEx) {
      if (accessTokenEx.name === "TokenExpiredError") {
        logger.error("Access token expired, going to check refresh token");
        const refreshToken = req.headers["refresh-token"];
        if (typeof refreshToken !== "string") {
          logger.error("Refresh token not present in headers");
          return userIsNotAuthorized();
        }

        try {
          userData = verifyRefreshToken(refreshToken);
          logger.error("Refresh token is valid");
        } catch {
          logger.error("Refresh token is invalid or expired");
          return userIsNotAuthorized();
        }

        logger.info("Going to generate, new tokens now");
        const user = await userDao.findOne(userData.userId);
        if (!user) {
          logger.info("No user found from data of refresh token");
          return userIsNotAuthorized();
        }

        const tokens = createTokens(user);
        res.setHeader("access-token", tokens.accessToken);
        res.setHeader("refresh-token", tokens.refreshToken);
        req.userId = user.userId;
        logger.info("New tokens created and attaching it to userId");
      } else {
        return userIsNotAuthorized();
      }
    }
    return next();
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
