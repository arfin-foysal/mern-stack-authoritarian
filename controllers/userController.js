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

  const secret = process.env.TOKEN
  const payloade = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payloade, secret, { expiresIn: "15m" });
  try {
    const link = `http://localhost:5000/api/verify/${user._id}/${token}`;

    await sendMaile(user.email, "User Email Verifiquation", link);
    res.json({ mess: "email send to account Verifi" });
  } catch (error) {
    res.status(404).json("Server Error");
  }
};

// ############ verify user ############

const verifyUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
 
  if (!user) {
    return res.status(401).json({ mess: "invalited link" });
  }
  const secret = process.env.TOKEN
  try {
    jwt.verify(req.params.token,secret);
    await User.updateOne({_id:req.params.id}, {$set:{verified:true}})
    res.render("veryfi");
  } catch (error) {
    res.status(400).json({mess:"invalated token"});
  }
};

// ######## User Login #########
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ mess: "User Email is not SignUp" });
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    return res.status(400).json({ mess: "User password is Valid" });
  }
  if (!user.verified) {
    return res.status(404).json({mess:"User is not active"})
  }

  const value = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  var Token = jwt.sign(value, process.env.TOKEN, { expiresIn: "2h" });

  res.status(200).json({ token: Token });
};

// ########## User forgot Password ############
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json("email not registrared");
    return;
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
    // console.log(link);
    res.status(200).json("password send email");
  } catch (error) {
    res.status(404).json("Not Found");
  }
};

// ############# get User Reset Password ################
const getresetPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  // res.send(user);

  if (user.id !== req.params.id) {
    return res.status(400).json({ mess: "id is not valited" });
  }

  const secret = process.env.TOKEN + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.messages);
    res.send("invalated token");
  }
};

// ############# User Reset Password ################

const ResetPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.id !== req.params.id) {
    return res.status(401).json({ mess: "User id is not valited" });
  }

  const secret = process.env.TOKEN + user.password;
  jwt.verify(req.params.token, secret);

  try {
    user.password = req.body.password;
    await user.save();
    res.render("index");
    // res.status(201).json({ mess: "Password change sucessfully" });
  } catch (error) {
    res.status(201).json("invalated token");
  }
};

module.exports = {
  registration,
  login,
  getresetPassword,
  forgotPassword,
  ResetPassword,
  verifyUser,
};
