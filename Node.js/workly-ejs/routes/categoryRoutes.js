const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect, authorizeRoles('admin'));
router.get('/', categoryController.getCategories);
router.post('/create', categoryController.createCategory);
router.post('/:id/delete', categoryController.deleteCategory);

module.exports = router;
