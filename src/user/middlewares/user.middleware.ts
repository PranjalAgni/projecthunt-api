import express from "express";

class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance() {
    if (!UserMiddleware.instance) {
      UserMiddleware.instance = new UserMiddleware();
    }
    return UserMiddleware.instance;
  }

  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res
        .status(400)
        .send({ error: `Missing required fields email and password` });
    }
  }
}

export default UserMiddleware.getInstance();
