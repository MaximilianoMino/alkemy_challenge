require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY,
};
