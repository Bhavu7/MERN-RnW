import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  getUsersForAssignment,
  updateTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, authorize('admin'), getUsersForAssignment);
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);
router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
