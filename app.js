const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

// Passport Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//Data
const db = require("./db");

// Routes
const mangaRoutes = require("./routes/mangas");
const vendorRoutes = require("./routes/vendors");
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");

const app = express();

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  app.use(cors());
  app.use(bodyParser.json());

  //Routes
  app.use("/vendors", vendorRoutes);
  app.use("/mangas", mangaRoutes);
  app.use("/media", express.static(path.join(__dirname, "media")));
  app.use(userRoutes);

  app.use((req, res, next) => {
    const error = new Error("Path Not Found");
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err.message || "Internal Server Error.");
  });

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
