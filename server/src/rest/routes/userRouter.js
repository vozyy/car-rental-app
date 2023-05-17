import express from 'express';
import { userController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/api/register', userController.register);

export default userRouter;
