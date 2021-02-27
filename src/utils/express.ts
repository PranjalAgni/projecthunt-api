import { ResponseObject } from "./types";
import { Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import createError from "http-errors";
import logger from "./logger";

export const formatResponse = (payload: ResponseObject): void => {
  const { res, result, error = null, status = 200 } = payload;
  res.status(status).json({
    status,
    result,
    error
  });
};

export const unprocessableEntityError = (
  error: Error,
  res: Response,
  next: NextFunction
): void => {
  logger.error(error);
  res.status(StatusCodes.UNPROCESSABLE_ENTITY);
  next(createError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
};

export const userNotAuthenticated = (
  res: Response,
  next: NextFunction
): void => {
  logger.error("User not authenitcated, going to return 401");
  res.status(StatusCodes.UNAUTHORIZED);
  next(
    createError(
      StatusCodes.UNAUTHORIZED,
      getReasonPhrase(StatusCodes.UNAUTHORIZED)
    )
  );
};
