import { ResponseObject } from "./types";
import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

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
  res.status(StatusCodes.UNPROCESSABLE_ENTITY);
  next(createError(StatusCodes.UNPROCESSABLE_ENTITY, error.message));
};
