declare namespace Express {
  interface Request {
    userId?: number;
    user?: import("../src/entities/User").User;
  }
}
