const { DataTypes, Model } = require("sequelize");

const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Manga extends Model {}

Manga.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    description: { type: DataTypes.STRING, allowNull: false },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },

    author: { type: DataTypes.STRING, allowNull: false },

    image: { type: DataTypes.STRING },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Manga, {
  source: ["name"],
});

module.exports = Manga;
