const Manga = require("./Manga");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

User.hasOne(Vendor, { foreignKey: "userId" });
Vendor.belongsTo(User, { as: "user" });

Vendor.hasMany(Manga, {
  foreignKey: { fieldName: "vendorId", allowNull: false },
  as: "mangas",
});
Manga.belongsTo(Vendor, {
  as: "vendor",
});

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

Order.belongsToMany(Manga, { through: OrderItem, foreignKey: "orderId" });
Manga.belongsToMany(Order, { through: OrderItem, foreignKey: "mangaId" });

module.exports = {
  Manga,
  Vendor,
  User,
  Order,
  OrderItem,
};
