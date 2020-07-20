const express = require("express");
const cors = require("cors");

//Data
const mangas = require("./mangas");

const app = express();

app.use(cors());

app.get("/mangas", (req, res) => {
  res.json(mangas);
});

app.listen(8000, () => {
  console.log("Running on localhost:8000");
});
