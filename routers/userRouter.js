const express = require('express');
const { registration, login, ResetPassword, forgotPassword, getresetPassword, verifyUser,  } = require('../controllers/userController');

const router = express.Router()

router.post('/registration',registration)
router.get('/verify/:id/:token',verifyUser)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',getresetPassword)
router.post('/reset-password/:id/:token',ResetPassword)

module.exports=router;