import express from 'express';
import { auth } from 'express-openid-connect';
import config from './middleware/config.js';
import http from 'http';
import routes from './routes';

const app = express();
const httpServer = http.createServer(app);

app.use(auth(config));
app.use(express.json());
app.use(routes);

export default httpServer;
