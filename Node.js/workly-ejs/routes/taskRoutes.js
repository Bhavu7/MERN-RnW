const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', taskController.getMyTasks);
router.get('/all', authorizeRoles('admin'), taskController.getAllTasks);
router.get('/create', taskController.showCreateForm);
router.post('/create', taskController.createTask);
router.get('/:id/edit', taskController.showEditForm);
router.post('/:id/edit', taskController.updateTask);
router.post('/:id/delete', taskController.deleteTask);

module.exports = router;
