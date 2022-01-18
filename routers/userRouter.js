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



module.exports=router;