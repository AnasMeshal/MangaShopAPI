const slugify = require("slugify");

//Data
let mangas = require("../mangas");

exports.mangaFetch = (req, res) => {
  res.json(mangas);
};

exports.mangaCreate = (req, res) => {
  idCounter = mangas.length + 1;
  const id = idCounter;
  const slug = slugify(req.body.name, { lower: true });
  const newManga = { id, slug, ...req.body };
  mangas.push(newManga);
  this.idCounter++;
  res.status(201).json(newManga);
};

exports.mangaDelete = (req, res) => {
  const { mangaId } = req.params;
  const foundManga = mangas.find((manga) => manga.id === +mangaId);

  if (foundManga) {
    mangas = mangas.filter((_manga) => _manga !== foundManga);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "a manga with this ID doesn't exist." });
  }
};

exports.mangaUpdate = (req, res) => {
  const { mangaId } = req.params;
  const foundManga = mangas.find((manga) => manga.id === +mangaId);

  if (foundManga) {
    for (const key in req.body) foundManga[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "a manga with this ID doesn't exist." });
  }
};
