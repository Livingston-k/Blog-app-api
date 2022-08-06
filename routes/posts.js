const postController = require('../controllers/postController')
const router = require('express').Router()
const checkAuthMiddleware = require('../middleware/check-auth')
router.post('/create', checkAuthMiddleware.checkAuth, postController.savePost)
router.get('/all', checkAuthMiddleware.checkAuth, postController.getPosts)
router.get('/:id', checkAuthMiddleware.checkAuth, postController.showPost)
router.put('/update/:id', checkAuthMiddleware.checkAuth, postController.updatePost)
router.delete('/delete/:id', checkAuthMiddleware.checkAuth, postController.deletePost)

module.exports = router