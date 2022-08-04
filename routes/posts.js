const postController = require('../controllers/postController')
const router = require('express').Router()

router.post('/create', postController.savePost)
router.get('/all', postController.getPosts)
router.get('/:id', postController.showPost)
router.put('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)

module.exports = router