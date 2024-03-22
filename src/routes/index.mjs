import { Router } from 'express';
import mentorRouter from './mentor.mjs';
import authRouter from './auth.mjs';

const router = Router();

router.use('/api', mentorRouter);
router.use('/api', authRouter);

export default router;