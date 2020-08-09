const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controller
const { signup, signin } = require("../controller/userController");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
