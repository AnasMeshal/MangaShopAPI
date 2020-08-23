const Manga = require("./Manga");
const Vendor = require("./Vendor");
const User = require("./User");
const Order = require("./Order");

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

module.exports = {
  Manga,
  Vendor,
  User,
  Order,
};
