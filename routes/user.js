const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/sign-up', userController.signUp)

module.exports = router