import { Router } from 'express';
import authRoutes from './authRoutes.js';
import itemRoutes from './itemRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);

export default router;
