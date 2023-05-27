import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(routes);

export default httpServer;
