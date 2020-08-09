const express = require("express");
const router = express.Router();

//Controller
const { signup } = require("../controller/userController");

router.get("/signup", signup);

module.exports = router;
