import RentalInformation from '../db/models/rentalInformation';
import Vehicle from '../db/models/vehicle';

const postRentalData = async (rentalData) => {
  try {
    const newRental = new RentalInformation(rentalData);
    await newRental.save();
    return newRental;
  } catch (error) {
    return { error: error.message };
  }
};

const retrieveUsersRentals = async (userId) => {
  try {
    const usersRentals = await RentalInformation.find({
      user_id: userId,
    }).exec();
    const detailedRentalInformation = await RentalInformation.populate(
      usersRentals,
      {
        path: 'car_id',
        model: Vehicle,
      }
    );
    return detailedRentalInformation;
  } catch (error) {
    return { error: error.message };
  }
};

export default { postRentalData, retrieveUsersRentals };
