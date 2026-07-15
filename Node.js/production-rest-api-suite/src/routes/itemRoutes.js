import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import {
  createItemValidator,
  itemIdValidator,
  listItemsValidator,
  updateItemValidator
} from '../validators/itemValidator.js';

const router = Router();

router.get('/', listItemsValidator, validate, asyncHandler(itemController.list));
router.get('/:id', itemIdValidator, validate, asyncHandler(itemController.getById));
router.post('/', authenticate, createItemValidator, validate, asyncHandler(itemController.create));
router.put('/:id', authenticate, [...itemIdValidator, ...updateItemValidator], validate, asyncHandler(itemController.update));
router.delete('/:id', authenticate, itemIdValidator, validate, asyncHandler(itemController.remove));

export default router;