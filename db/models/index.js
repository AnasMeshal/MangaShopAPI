const Manga = require("./Manga");
const Vendor = require("./Vendor");
const User = require("./User");

User.hasOne(Vendor, { foreignKey: "userId" });

Vendor.belongsTo(User, { as: "user" });

Vendor.hasMany(Manga, {
  foreignKey: { fieldName: "vendorId", allowNull: false },
  as: "mangas",
});

Manga.belongsTo(Vendor, {
  as: "vendor",
});

module.exports = {
  Manga,
  Vendor,
  User,
};
