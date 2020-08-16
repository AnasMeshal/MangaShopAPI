//Data
const { Manga, Vendor } = require("../db/models");

exports.fetchManga = async (MangaId, next) => {
  try {
    const manga = await Manga.findByPk(MangaId, {
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["userId"],
      },
    });
    return manga;
  } catch (error) {
    next(error);
  }
};

exports.mangaList = async (req, res, next) => {
  try {
    const mangas = await Manga.findAll({
      attributes: { exclude: ["vendorId", "createdAt", "updatedAt"] },
      include: {
        model: Vendor,
        as: "vendor",
        attributes: ["name"],
      },
    });
    res.json(mangas);
  } catch (error) {
    next(error);
  }
};

exports.mangaUpdate = async (req, res, next) => {
  try {
    console.log(req.manga.vendor.userId);
    if (req.user.id === req.manga.vendor.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      await req.manga.update(req.body);
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

exports.mangaDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.manga.vendor.userId) {
      await req.manga.destroy();
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
