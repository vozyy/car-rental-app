import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  manufacturer_name: { type: String, required: true },
  model_name: { type: String, required: true },
  year: { type: Number, required: true },
  transmittion: { type: String, required: true },
  engine_type: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Vehicle = mongoose.model('vehicle', vehicleSchema);

export default Vehicle;
