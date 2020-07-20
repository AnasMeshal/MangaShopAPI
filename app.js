const express = require("express");
const cors = require("cors");

//Data
let mangas = require("./mangas");

const app = express();

app.use(cors());

app.get("/mangas", (req, res) => {
  res.json(mangas);
});

app.delete("/mangas/:mangaId", (req, res) => {
  const { mangaId } = req.params;
  const foundManga = mangas.find((manga) => manga.id === +mangaId);

  if (foundManga) {
    mangas = mangas.filter((_manga) => _manga !== foundManga);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "a manga with this ID doesn't exist." });
  }
});

app.listen(8000, () => {
  console.log("Running on localhost:8000");
});
