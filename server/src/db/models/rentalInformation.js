import mongoose from 'mongoose';

const rentalInformationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  manufacturer_name: {
    type: String,
    required: true,
  },
  model_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
});

const RentalInformation = mongoose.model(
  'rental_information',
  rentalInformationSchema
);

export default RentalInformation;
