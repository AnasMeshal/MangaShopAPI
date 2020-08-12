const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class User extends Model {}

User.init(
  {
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },

    email: {
      type: DataTypes.STRING,
      isEmail: true,
    },

    password: { type: DataTypes.STRING, allowNull: false },

    firstName: { type: DataTypes.STRING },

    lastName: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
