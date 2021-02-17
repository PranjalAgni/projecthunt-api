import { Response } from "express";

export type ResponseObject = {
  res: Response;
  status: number;
  error?: Error | null;
  result: unknown;
};
