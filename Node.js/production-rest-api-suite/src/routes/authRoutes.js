import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { loginValidator, registerValidator } from '../validators/authValidator.js';

const router = Router();

router.post('/register', registerValidator, validate, asyncHandler(authController.register));
router.post('/login', loginValidator, validate, asyncHandler(authController.login));
router.post('/refresh', asyncHandler(authController.refresh));
router.post('/logout', authenticate, asyncHandler(authController.logout));
router.get('/profile', authenticate, asyncHandler(authController.profile));

export default router;
