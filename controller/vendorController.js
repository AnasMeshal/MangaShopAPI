//Data
const { Vendor, Manga, User } = require("../db/models");

exports.fetchVendor = async (VendorId, next) => {
  try {
    const vendor = await Vendor.findByPk(VendorId);
    return vendor;
  } catch (error) {
    next(error);
  }
};

exports.vendorList = async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Manga,
        as: "mangas",
        attributes: ["id"],
      },
    });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

exports.vendorCreate = async (req, res, next) => {
  try {
    const foundVendor = await Vendor.findOne({
      where: { userId: req.user.id },
    });
    if (foundVendor) {
      const error = new Error("Oops, you have created more than one vendor");
      error.status = 403;
      next(error);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
  }
};

exports.vendorUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.vendor.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.vendor.update(req.body);
      res.status(204).end();
    } else {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.vendorDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.bakery.userId) {
      await req.vendor.destroy();
      res.status(204).end();
    } else {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.mangaCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.vendor.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.vendorId = req.vendor.id;
      const newManga = await Manga.create(req.body);
      res.status(201).json(newManga);
    } else {
      const error = new Error("Unauthorized");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
