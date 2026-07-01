import Category from '../models/Category.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Category name is required');
  }

  const category = await Category.create({
    name,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, message: 'Category created', category });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate('createdBy', 'username role').sort({ createdAt: -1 });
  res.json({ success: true, categories });
});
