import mongoose from 'mongoose';

const start = async (app, port) => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    app.listen(port, () => {
      console.log(`My app is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default start;
