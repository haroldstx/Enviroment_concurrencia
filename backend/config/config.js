require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST_DB || "localhost",
    port: process.env.PGPORT || 5436,
    dialect: "postgres",
    dialectOptions: {},
    logging: false,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST_DB || "postgres",
    port: process.env.PGPORT || 5436,
    dialect: "postgres",
    dialectOptions: {},
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST_DB || "postgres",
    port: process.env.PGPORT || 5436,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario en algunos proveedores cloud
      },
    },
    logging: false,
  },
};
