const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

//Data
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  try {
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedpassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      expires: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      role: user.role,
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
