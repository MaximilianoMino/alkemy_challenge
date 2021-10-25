const { Sequelize } = require("sequelize");
const {
  DB_DATABASE,
  DB_USERNAME,
  DB_HOST,
  PORT,
} = require("../../config/globals");

const db = new Sequelize(DB_DATABASE, DB_USERNAME, "", {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const getConnection = async () => {
  try {
    await db.authenticate();
    return "Connection has been established successfully.";
  } catch (error) {
    return "Unable to connect to the database:", error;
  }
};

module.exports = {
  getConnection,
  db,
};
