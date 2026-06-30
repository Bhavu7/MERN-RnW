// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { isLoggedIn } = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');

router.get('/', postController.index);
router.get('/new', isLoggedIn, postController.newForm);
router.post('/', isLoggedIn, postController.create);
router.get('/:id', postController.show);
router.get('/:id/edit', isLoggedIn, checkOwnership, postController.editForm);
router.put('/:id', isLoggedIn, checkOwnership, postController.update);
router.delete('/:id', isLoggedIn, checkOwnership, postController.destroy);

// Comments (nested under a post)
router.post('/:id/comments', isLoggedIn, commentController.create);
router.delete('/:id/comments/:commentId', isLoggedIn, commentController.destroy);

module.exports = router;
