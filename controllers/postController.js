const models = require('../models')

// MODELS
const Post = models.Post

// CREATE PRODUCT
const savePost = (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.body.userId,
    }
    Post.create(post).then((data) => {
        res.status(200).send({ 'msg': 'Post created successfully', 'post': data })
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error creating post', 'error': err })
    })
}

// ALL POST
const getPosts = (req, res) => {
    Post.findAll({}).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error Retrieving posts', 'error': err })
    })
}

// GET POST DETAILS
const showPost = (req, res) => {
    const id = req.params.id
    Post.findByPk(id).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error Retrieving post', 'error': err })
    })
}

// UPDATE POST
const updatePost = (req, res) => {
    const id = req.params.id
    Post.update(req.body, { where: { id: id } }).then((data) => {
        res.status(200).send({ 'msg': 'Post updated successfully' })
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error updating post', 'error': err })
    })
}

// DELETE POST
const deletePost = (req, res) => {
    const id = req.params.id
    Post.destroy({ where: { id: id } }).then((data) => {
        res.status(200).send({ 'msg': 'Post deleted successfully' })
    }).catch((err) => {
        res.status(500).send({ 'msg': 'Error deleting post', 'error': err })
    })
}
module.exports = {
    savePost,
    getPosts,
    showPost,
    updatePost,
    deletePost
}