import vehicleService from '../../services';
import rentalService from '../../services/rentalService';
import userService from '../../services/userService';

const postRentalInformation = async (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Rental information required' });
  }

  try {
    const vehicle = await vehicleService.getVehicleById(carId);
    console.log(vehicle);
    if (!vehicle) {
      return res.stauts(404).json({ error: 'Vehicle not found' });
    }

    const user = await userService.getUserById(userId);
    console.log(user);
    if (!user) {
      return res.stauts(404).json({ error: 'User not found' });
    }

    const { price } = vehicle;
    const numberOfDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = price * numberOfDays;

    const rentalData = {
      user_id: user._id,
      car_id: vehicle._id,
      model_name: vehicle.model_name,
      manufacturer_name: vehicle.manufacturer_name,
      model_name: vehicle.model_name,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    };

    const result = await rentalService.postRentalData(rentalData);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { postRentalInformation };