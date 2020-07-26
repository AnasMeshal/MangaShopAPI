const express = require("express");
const router = express.Router();

//Controller
const {
  fetchManga,
  mangaFetch,
  mangaCreate,
  mangaUpdate,
  mangaDelete,
} = require("../controller/mangaController");

router.param("mangaId", async (req, res, next, mangaId) => {
  const manga = await fetchManga(mangaId, next);
  if (manga) {
    req.manga = manga;
    next();
  } else {
    const error = new Error("Manga Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", mangaFetch);

router.post("/", mangaCreate);

router.put("/:mangaId", mangaUpdate);

router.delete("/:mangaId", mangaDelete);

module.exports = router;
