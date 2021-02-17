import { Response } from "express";

export type ResponseObject = {
  res: Response;
  status?: number;
  error?: Error | null;
  result: unknown;
};

export type JWTTokenData = {
  userId: number;
};

export type AuthorizationTokens = {
  refreshToken: string;
  accessToken: string;
};
