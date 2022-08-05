const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

// ROUTES
router.post('/sign-up', userController.signUp)
router.post('/login', userController.Login)

module.exports = router