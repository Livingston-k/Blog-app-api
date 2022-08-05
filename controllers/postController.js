const models = require('../models')
const Validator = require("fastest-validator");
const v = new Validator();

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
    const schema = {
        title: { type: "string", optional: false, max: 300 },
        content: { type: "string", max: 1000 },
        imageUrl: { type: "string" },
        categoryId: { type: "number", optional: false },
        userId: { type: "number", optional: false },
    };
    const validation = v.validate(post, schema)
    if (validation != true) {
        return res.status(400).send(validation)
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