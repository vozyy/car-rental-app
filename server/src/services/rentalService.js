import RentalInformation from '../db/models/rentalInformation';

const postRentalData = async (rentalData) => {
  try {
    const newRental = new RentalInformation(rentalData);
    await newRental.save();
    return newRental;
  } catch (error) {
    return { error: error.message };
  }
};

export default { postRentalData };
