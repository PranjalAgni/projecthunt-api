// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require("path");

module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  database: process.env.DB_SCHEMA,
  entities: [join(__dirname, "dist/entities", "*.{ts,js}")],
  migrations: [__dirname + "/src/migrations/*.{ts,js}"],
  subscribers: [__dirname + "/src/subscribers/*.{ts,js}"]
};