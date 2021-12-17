const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
};
