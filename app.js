const express = require("express");
const cors = require("cors");

// Routes
const mangaRoutes = require("./routes/mangas");

const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/mangas", mangaRoutes);

app.listen(8000, () => {
  console.log("Running on localhost:8000");
});
