const express = require('express')
const app = express()
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
require("dotenv").config();

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send({ 'msg': "Use postman to consume the api" })
})
module.exports = app