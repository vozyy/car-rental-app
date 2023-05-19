import express from 'express';
import { vehicleController } from '../controllers';

const vehicleRouter = express.Router();

vehicleRouter.get('/vehicles', vehicleController.getAll);

export default vehicleRouter;
