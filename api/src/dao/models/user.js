const { DataTypes } = require("sequelize");
const { db } = require("../db/connection");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
      validate: {
        isEmail: {
          msg: "Must be an email",
        },
        len: {
          args: [2, 255],
          msg: "The username must be at least two characters long",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      validate: {
        len: {
          args: [6, 30],
          msg: "The password must be at least 6 characters long ",
        },
      },
    },
  },
  { timestamps: true }
);
User.sync({ alter: true });

module.exports = User;
