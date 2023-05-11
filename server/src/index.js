import express from 'express';
import { auth } from 'express-openid-connect';
import config from './rest/middleware/config.js';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(auth(config));

export default httpServer;
