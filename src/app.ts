import { AuthRoutes } from "@auth/auth.config.routes";
import passport from "@auth/passport";
import { CommonRoutesConfig } from "@common/common.routes.config";
import { ProjectRoutes } from "@project/project.config.routes";
import { UserRoutes } from "@user/user.config.routes";
import logger, { loggerStreamWrite } from "@utils/logger";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";

const initalizeApp = async (): Promise<express.Application> => {
  const app: express.Application = express();
  const routes: Array<CommonRoutesConfig> = [];
  const debugLog: debug.IDebugger = debug("server:app");

  const db = await createConnection();
  debugLog("DB connected");
  await db.synchronize();
  debugLog("DB synced");
  logger.info("DB connected");

  // If we are behind some reverse proxy like Nginx then we can trust this X-Forwarded-For header
  // Read More: https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(
    morgan("combined", {
      stream: {
        write: loggerStreamWrite
      }
    })
  );
  app.use(passport.initialize());

  routes.push(new AuthRoutes(app), new UserRoutes(app), new ProjectRoutes(app));

  CommonRoutesConfig.applyErrorHandleMiddlewares(app);

  app.get("/", (_req: express.Request, res: express.Response) => {
    res
      .status(200)
      .send(`Server running at http://localhost:${process.env.PORT}`);
  });

  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });

  return app;
};

export default initalizeApp;
