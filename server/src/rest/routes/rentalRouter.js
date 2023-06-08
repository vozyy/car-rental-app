import express from 'express';
import { rentalConroller } from '../controllers';

const rentalRouter = express.Router();

rentalRouter.post('/create-rental', rentalConroller.postRentalInformation);

export default rentalRouter;
