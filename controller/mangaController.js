const slugify = require("slugify");

//Data
const { Manga } = require("../db/models");

exports.mangaFetch = async (req, res) => {
  try {
    const mangas = await Manga.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(mangas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mangaCreate = async (req, res) => {
  try {
    const newManga = await Manga.create(req.body);
    res.status(201).json(newManga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mangaDelete = async (req, res) => {
  const { mangaId } = req.params;
  try {
    const foundManga = await Manga.findByPk(mangaId);
    if (foundManga) {
      await foundManga.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Manga not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mangaUpdate = async (req, res) => {
  const { mangaId } = req.params;
  try {
    const foundManga = await Manga.findByPk(mangaId);
    if (foundManga) {
      await foundManga.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Manga not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
