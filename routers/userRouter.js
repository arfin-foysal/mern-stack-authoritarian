const express = require('express');
const router = express.Router()
const passport = require('passport')

const { registration, login, ResetPassword, forgotPassword, getresetPassword, verifyUser, } = require('../controllers/userController');

const CLIENT_URL="http://localhost:3000/auth/login"

router.post('/registration',registration)
router.get('/verify/:id/:token',verifyUser)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',getresetPassword)
router.post('/reset-password/:id/:token', ResetPassword)

// google auth

// router.get("/login", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             sucess:true,
//             message: "sucessfull",
//             user:req.user
//         })
//     }
// })
// router.get("/login/failed", (req, res) => {
  
//         res.status(401).json({
//             sucess:false,
//             message: "faield",
//         })
    
// })

router.get('/google',passport.authenticate('google',{scope:["profile"]}))
router.post('/google/callback', passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect:"/login/failed"
}))

module.exports=router;