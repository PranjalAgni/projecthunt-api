const { join } = require("path");

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  user: "pranjal",
  password: "",
  logging: true,
  database: "shawarma",
  entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  migrations: [__dirname + "/src/migrations/*.{ts,js}"],
  subscribers: [__dirname + "/src/subscribers/*.{ts,js}"]
};
