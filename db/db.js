const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "1234",
  database: "db",
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db;
