const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class Manga extends Model {}

Manga.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },

    description: { type: DataTypes.STRING, allowNull: false },

    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },

    author: { type: DataTypes.STRING, allowNull: false },

    img: { type: DataTypes.STRING, isUrl: true },
  },
  {
    sequelize: db,
  }
);

module.exports = Manga;
