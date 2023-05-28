import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';
import checkToken from './middleware/auth';

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(checkToken);
app.use(cors());
app.use(routes);

export default httpServer;
