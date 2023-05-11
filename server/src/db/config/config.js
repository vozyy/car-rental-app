import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
