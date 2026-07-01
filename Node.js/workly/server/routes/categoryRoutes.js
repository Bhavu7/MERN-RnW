import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCategories)
  .post(protect, authorize('admin'), createCategory);

export default router;
