// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true
});
require("module-alias/register");
import config from "@config/index";
import debug from "debug";
import logger from "@utils/logger";
import "reflect-metadata";
import initalizeApp from "./app";

const startServer = async () => {
  const debugLog: debug.IDebugger = debug("server");

  const app = await initalizeApp();

  app.listen(config.port, () => {
    logger.info(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );
    debugLog(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

startServer();
