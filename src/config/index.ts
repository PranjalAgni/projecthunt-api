import appRoot from "app-root-path";

process.env.NODE_ENV = "development" || process.env.NODE_ENV;

export default {
  isDev: process.env.NODE_ENV === "development",
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  serverUrl: process.env.SERVER_URL,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
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
