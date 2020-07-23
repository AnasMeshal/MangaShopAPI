const express = require("express");
const cors = require("cors");

//Data
const db = require("./db");

// Routes
const mangaRoutes = require("./routes/mangas");

const bodyParser = require("body-parser");

const app = express();

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/mangas", mangaRoutes);

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
