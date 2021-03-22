import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

class HttpErrors {
  private static instance: HttpErrors;

  static getInstance() {
    if (!HttpErrors.instance) {
      HttpErrors.instance = new HttpErrors();
    }
    return HttpErrors.instance;
  }

  handleError(error: Error, res: Response, next: NextFunction) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    next(createError(StatusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
}

export default HttpErrors.getInstance();
