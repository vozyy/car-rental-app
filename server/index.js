import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { auth } from 'express-openid-connect';
import config from './src/rest/middleware/config.js';
import start from './src/db/config/config.js';

dotenv.config();

const PORT = process.env.PORT;

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
app.use(auth(config));

start(app, PORT);
