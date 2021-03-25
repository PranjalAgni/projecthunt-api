import config from "@config/index";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";

// const debugLog = debug("server:common-middleware");
class CommonMiddleware {
  private static instance: CommonMiddleware;

  static getInstance() {
    if (!CommonMiddleware.instance) {
      CommonMiddleware.instance = new CommonMiddleware();
    }
    return CommonMiddleware.instance;
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
