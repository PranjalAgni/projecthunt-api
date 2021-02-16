import debug from "debug";
import { Request, Response } from "express";
const debugLog: debug.IDebugger = debug("server:user-controller");

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  createUser(req: Request, res: Response) {
    debugLog(req.body);
    return res.status(200).json({ done: true });
  }
}

export default UserController.getInstance();
