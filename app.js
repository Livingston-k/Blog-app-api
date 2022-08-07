const express = require('express')
const app = express()
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const imagesRoutes = require('./routes/images')
require("dotenv").config();

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

// ROUTES
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/images', imagesRoutes)

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send({ 'msg': "Use postman to consume the api" })
})
module.exports = app