const User = require("../models/userMode");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sendMaile = require("../middlewares/sendMaile");
require("dotenv").config();

// ######## User registration #########

const registration = async (req, res) => {
  const fuser = await User.findOne({ email: req.body.email });
  if (fuser) {
    return res.status(400).json({ mess: "User already SignUp" });
  }

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user.save();

  const secret = process.env.TOKEN;
  const payloade = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payloade, secret, { expiresIn: "15m" });
  try {
    const link = `http://localhost:5000/api/verify/${user._id}/${token}`;

    await sendMaile(user.email, "Email Verification", link);
    res.json({ mess: "send to email and verify your account" });
  } catch (error) {
    res.status(404).json("Server Error");
  }
};

// ############ verify user ############

const verifyUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.status(401).json({ mess: "Invalid link" });
  }
  const secret = process.env.TOKEN;
  try {
    jwt.verify(req.params.token, secret);
    await User.updateOne({ _id: req.params.id }, { $set: { verified: true } });
    res.render("veryfi");
  } catch (error) {
    res.status(400).json({ mess: "Invalid link" });
  }
};

// ######## User Login #########
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ mess: "User email is not SignUp" });
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.status(400).json({ mess: "User password is not valid" });
  }
  if (!user.verified) {
    return res.status(404).json({ mess: "User is not verified" });
  }

  const value = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const Token = jwt.sign(value, process.env.TOKEN, { expiresIn: "50s" });
  const refreshToken = jwt.sign(value, process.env.REFRESH_TOKEN, {
    expiresIn: "1y",
  });

  res.status(200).json({ token: Token, refreshToken: refreshToken });
};

// ########## User forgot Password ############
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ mess: "Email not registrared" });
  }
  const secret = process.env.TOKEN + user.password;
  const payloade = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payloade, secret, { expiresIn: "15m" });
  try {
    const link = `http://localhost:5000/api/reset-password/${user._id}/${token}`;
    sendMaile(user.email, "password reset", link);
    res.status(200).json({ mess: "Send email to reset your Password" });
  } catch (error) {
    res.status(404).json({ mess: "Not Found" });
  }
};

// ############# get User Reset Password ################
const getresetPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.id !== req.params.id) {
    return res.status(400).json({ mess: "Invalid link" });
  }

  const secret = process.env.TOKEN + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.messages);
    res.status(400).json({ mess: "Invalid link" });
  }
};

// ############# User Reset Password ################

const ResetPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.id !== req.params.id) {
    return res.status(401).json({ mess: "User is not valid" });
  }

  const secret = process.env.TOKEN + user.password;
  jwt.verify(req.params.token, secret);

  try {
    user.password = req.body.password;
    await user.save();
    res.render("index");
    // res.status(201).json({ mess: "Password change sucessfully" });
  } catch (error) {
    res.status(400).json("Invalid link");
  }
};

const refreshToken = ((req, res) => {
  
})

module.exports = {
  registration,
  login,
  getresetPassword,
  forgotPassword,
  ResetPassword,
  verifyUser,
  refreshToken
};
