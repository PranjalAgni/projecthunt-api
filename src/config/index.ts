import appRoot from "app-root-path";
import dotenv from "dotenv";

const config = dotenv.config();

if (config.error) {
  throw new Error("Could not find .env file");
}

process.env.NODE_ENV = "development" || process.env.NODE_ENV;

export default {
  isDev: process.env.NODE_ENV === "development",
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
  },
  winston: {
    file: {
      level: "info",
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
};
