import express from 'express';
import baseRouter from './baseRouter';
import userRouter from './userRouter';
import vehicleRouter from './vehicleRouter';
import rentalRouter from './rentalRouter';

const router = express.Router();

router.use(baseRouter);
router.use('/api', userRouter);
router.use('/api', vehicleRouter);
router.use('/api', rentalRouter);

export default router;
