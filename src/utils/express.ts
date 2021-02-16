import { NextFunction, RequestHandler, Request, Response } from "express";
import logger from "./logger";

export const asyncUtil = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const fnReturn = fn(req, res, next);
  return Promise.resolve(fnReturn).catch((err) => {
    logger.error(err);
    next(err);
  });
};
