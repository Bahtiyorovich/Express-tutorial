import { Router } from 'express';
import userRouter from './users.mjs';
import productsRouter from './products.mjs';

const router = Router();

router.use('/api', userRouter);
router.use('/api', productsRouter);

export default router;