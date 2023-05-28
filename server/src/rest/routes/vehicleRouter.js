import express from 'express';
import { vehicleController } from '../controllers';

const vehicleRouter = express.Router();

vehicleRouter.get('/vehicles', vehicleController.getAll);
vehicleRouter.patch(
  '/vehicles/addRenter',
  vehicleController.updateVehicleRenter
);

export default vehicleRouter;
