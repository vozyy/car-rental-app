import express from 'express';
import http from 'http';
import cors from 'cors';
import routes from './routes';
import checkToken from './middleware/auth';
import morgan from 'morgan';

const app = express();
const httpServer = http.createServer(app);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(checkToken);
app.use(routes);

export default httpServer;
