const express = require('express')
const app = express()
const postRoutes = require('./routes/posts')

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
    // ROUTES
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send({ 'msg': "User postman to consume the api" })
})


module.exports = app