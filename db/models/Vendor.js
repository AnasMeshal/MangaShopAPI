const { DataTypes, Model } = require("sequelize");

const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Vendor extends Model {}

Vendor.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },

    image: { type: DataTypes.STRING },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Vendor, {
  source: ["name"],
});

module.exports = Vendor;
