//Data
const { Manga } = require("../db/models");

exports.fetchManga = async (MangaId, next) => {
  try {
    const manga = await Manga.findByPk(MangaId);
    return manga;
  } catch (error) {
    next(error);
  }
};

exports.mangaFetch = async (req, res, next) => {
  try {
    const mangas = await Manga.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(mangas);
  } catch (error) {
    next(error);
  }
};

exports.mangaCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newManga = await Manga.create(req.body);
    res.status(201).json(newManga);
  } catch (error) {
    next(error);
  }
};

exports.mangaUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.manga.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.mangaDelete = async (req, res, next) => {
  try {
    await req.manga.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
