import createUser from './userService';
import { getAllVehicles, getVehicleById } from './vehicleService';
import postRentalData from './rentalService';
import retrieveUsersRentals from './rentalService';

export default {
  createUser,
  getAllVehicles,
  getVehicleById,
  postRentalData,
  retrieveUsersRentals,
};
