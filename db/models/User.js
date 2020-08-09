const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
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
