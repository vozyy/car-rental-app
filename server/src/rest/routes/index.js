import express from 'express';
import baseRouter from './baseRouter';

const router = express.Router();

router.use(baseRouter);

export default router;
