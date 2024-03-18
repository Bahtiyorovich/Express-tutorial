import { Router } from 'express'
import userRouter from './users.mjs';

const router = Router();

router.use('/api', userRouter)

export default router;