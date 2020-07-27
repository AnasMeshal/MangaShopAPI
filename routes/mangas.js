const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

//Controller
const {
  fetchManga,
  mangaList,
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

router.get("/", mangaList);

router.put("/:mangaId", upload.single("image"), mangaUpdate);

router.delete("/:mangaId", mangaDelete);

module.exports = router;
