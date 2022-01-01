const User = require("../models/userMode");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const registration = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ mess: "User already signin" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const saveUser = await user.save();
    res.status(200).json({ mess: "registration sucessfull", data: saveUser });
  } catch (error) {
    res.status(400).send("server err");
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ mess: "User Email is worng" });
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.status(400).json({ mess: "User password is worng" });
  }

  const value = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  var Token = jwt.sign(value, process.env.TOKEN, { expiresIn: "2h" });

  res.status(200).json({ token: Token });
};

module.exports = {
  registration,
  login,
};
