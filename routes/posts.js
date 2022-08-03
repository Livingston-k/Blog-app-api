const express = require('express')
const postController = require('../controllers/postController')
const router = require('express').Router()

router.get('/all', postController.index)

module.exports = router