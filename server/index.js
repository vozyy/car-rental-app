import express from 'express';
import dotenv from 'dotenv';
import { auth } from 'express-openid-connect';
import config from './src/rest/middleware/config.js';
import connectDB from './src/db/config/config.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(auth(config));

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`The app is running on port: ${PORT}`);
  });
};

start();
