const Manga = require("./Manga");
const Vendor = require("./Vendor");

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
};
