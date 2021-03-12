import { Response } from "express";
import { User } from "../entities/User";
import userService from "../modules/user/services/user.service";

export const addSessionToken = async (
  res: Response,
  user: User
): Promise<void> => {
  const sessionId = await userService.createUserSession(user);
  return res.setHeader("authorization", sessionId);
};
