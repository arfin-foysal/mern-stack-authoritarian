const express = require('express');
const { registration, login, resetPassword, forgotPassword, postResetPassword } = require('../controllers/userController');

const router = express.Router()

router.post('/registration',registration)
router.post('/login',login)
router.post('/forgot-password',forgotPassword)
router.get('/reset-password/:id/:token',resetPassword)
// router.post('/reset-password/:id/:token',postResetPassword)

module.exports=router;