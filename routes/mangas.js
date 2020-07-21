const express = require("express");
const router = express.Router();

//Controller
const {
  mangaFetch,
  mangaCreate,
  mangaUpdate,
  mangaDelete,
} = require("../controller/mangaController");

router.get("/", mangaFetch);

router.post("/", mangaCreate);

router.put("/:mangaId", mangaUpdate);

router.delete("/:mangaId", mangaDelete);

module.exports = router;
