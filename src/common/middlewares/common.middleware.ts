import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import config from "../../config";
import { User } from "../../entities/User";
import {
  createTokens,
  verifyAccessToken,
  verifyRefreshToken
} from "../../utils/jwt";
import logger from "../../utils/logger";

const debugLog = debug("server:common-middleware");
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
      logger.error("User not authenticated");
      res.status(StatusCodes.UNAUTHORIZED);
      return next(
        createError(
          StatusCodes.UNAUTHORIZED,
          getReasonPhrase(StatusCodes.UNAUTHORIZED)
        )
      );
    };

    const accessToken = req.headers["access-token"];

    if (typeof accessToken !== "string") {
      return userIsNotAuthorized();
    }

    let userData = null;
    try {
      userData = verifyAccessToken(accessToken);
      req.userId = userData.userId;
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.headers["refresh-token"];
        if (typeof refreshToken !== "string") {
          return userIsNotAuthorized();
        }

        try {
          userData = verifyRefreshToken(refreshToken);
        } catch (ex) {
          return userIsNotAuthorized();
        }

        const user = await User.findOne(userData.userId);
        if (!user) {
          return userIsNotAuthorized();
        }

        const tokens = createTokens(user);
        res.setHeader("access-token", tokens.accessToken);
        res.setHeader("refresh-token", tokens.refreshToken);
        req.userId = user.userId;
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
