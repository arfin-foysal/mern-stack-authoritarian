const express = require('express');
const { registration } = require('../controllers/userController');

const router = express.Router()

router.post('/registration',registration)
router.post('/login',)

module.exports=router;