import { ResponseObject } from "./types";

export const formatResponse = (payload: ResponseObject) => {
  const { res, result, error = null, status = 200 } = payload;
  res.status(status).json({
    status,
    result,
    error
  });
};
