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
    res.status(200).json({ mess: "registration sucessfull" });
  } catch (error) {
    res.status(400).json({ mess: "this is server err" });
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

// post
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email});

  if (!user) {
    res.send("email not registrared");
    return;
  }
  const secret = process.env.TOKEN + user.password;
  const payloade = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payloade, secret, { expiresIn: "15m" });
  const link = `localhost:5000/api/reset-password/${user._id}/${token}`;
  console.log(link);
  res.send("password send email");
};

// get
const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id:id });

  if (id !== user._id) {
    req.send("invalated id");
  }

  const secret = process.env.TOKEN + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.messages);
    res.send(error.messages);
  }
};

const postResetPassword = async(req, res) => {
  const { id, token } = req.params;
  const { password, confirmpassword } = req.body;
  const user = await User.findOne({ _id: id });
  if (id !== user._id) {
    req.send("invalated id");
  }
  const secret = process.env.TOKEN + user.password;
  const payload = jwt.verify(token, secret);
  try {
    if (password === confirmpassword) {
      const user = new User({
        password: req.body.password,
      });
      user.save();
      res.send("Password Change Sucessfull");
    }
  } catch (error) {
    console.log(error.messages);
    res.send(error.messages);
  }
};

module.exports = {
  registration,
  login,
  forgotPassword,
  resetPassword,
  postResetPassword,
};
