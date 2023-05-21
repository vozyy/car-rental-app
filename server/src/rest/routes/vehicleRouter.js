import express from 'express';
import checkToken from '../middleware/auth';
import { vehicleController } from '../controllers';

const vehicleRouter = express.Router();

vehicleRouter.get('/vehicles', checkToken, vehicleController.getAll);
vehicleRouter.patch(
  '/vehicles/addRenter',
  checkToken,
  vehicleController.updateVehicleRenter
);

export default vehicleRouter;
