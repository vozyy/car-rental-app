import express from 'express';
import baseRouter from './baseRouter';
import userRouter from './userRouter';
import vehicleRouter from './vehicleRouter';

const router = express.Router();

router.use(baseRouter);
router.use('/api', userRouter);
router.use('/api', vehicleRouter);

export default router;
