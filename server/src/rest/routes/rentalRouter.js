import express from 'express';
import { rentalConroller } from '../controllers';

const rentalRouter = express.Router();

rentalRouter.post('/create-rental', rentalConroller.postRentalInformation);
rentalRouter.get('/history', rentalConroller.getRentHistory);

export default rentalRouter;
