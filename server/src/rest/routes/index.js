import express from 'express';
import baseRouter from './baseRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use(baseRouter);
router.use('/api', userRouter);

export default router;
