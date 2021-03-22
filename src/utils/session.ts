import { User } from "@entities/User";
import userService from "@user/services/user.service";
import { Response } from "express";

export const addSessionToken = async (
  res: Response,
  user: User
): Promise<void> => {
  const sessionId = await userService.createUserSession(user);
  return res.setHeader("authorization", sessionId);
};
