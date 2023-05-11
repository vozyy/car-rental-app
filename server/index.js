import dotenv from 'dotenv';
import connectDB from './src/db/config/config.js';
import server from './src/index.js';

dotenv.config();
const PORT = process.env.PORT;

const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`The backend is running on port: ${PORT}`);
  });
};

start();
