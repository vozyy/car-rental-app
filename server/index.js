import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        
        app.listen(PORT, () => {
            console.log(`My app is running on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error.message)
    }
}

start();
