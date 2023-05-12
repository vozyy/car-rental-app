import express from 'express';
import { baseController } from '../controllers';

const baseRouter = express.Router();

baseRouter.get('/', baseController.get);

export default baseRouter;
