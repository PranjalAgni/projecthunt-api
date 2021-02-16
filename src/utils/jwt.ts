import { sign, verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../entities/User";

export type JWTTokenData = {
  userId: number;
};

export const createTokens = (
  user: User
): {
  refreshToken: string;
  accessToken: string;
} => {
  const refreshToken = sign(
    { userId: user.userId },
    config.jwt.refreshTokenSecret,
    {
      expiresIn: "14d"
    }
  );

  const accessToken = sign(
    { userId: user.userId },
    config.jwt.accessTokenSecret,
    {
      expiresIn: "15min"
    }
  );

  return { refreshToken, accessToken };
};

export const verifyAccessToken = (accessToken: string): JWTTokenData => {
  const data = <JWTTokenData>verify(accessToken, config.jwt.accessTokenSecret);
  return data;
};

export const verifyRefreshToken = (refreshToken: string): JWTTokenData => {
  const data = <JWTTokenData>(
    verify(refreshToken, config.jwt.refreshTokenSecret)
  );
  return data;
};
