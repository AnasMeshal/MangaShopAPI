const { DataTypes, Model } = require("sequelize");

const db = require("../db");

class OrderItem extends Model {}

OrderItem.init(
  {
    qty: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = OrderItem;
