const bcrypt = require("bcrypt");

//Data
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  const saltRounds = 10;
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedpassword;

    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
