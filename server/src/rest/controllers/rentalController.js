import vehicleService from '../../services';
import rentalService from '../../services/rentalService';
import userService from '../../services/userService';
import moment from 'moment';

const postRentalInformation = async (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;
  const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

  if (!userId || !carId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ error: 'Rental information not complete or missing' });
  }

  if (
    !moment(startDate, dateFormat, true).isValid() ||
    !moment(endDate, dateFormat, true).isValid()
  ) {
    return res.status(400).json({
      error: 'Invalid date format',
    });
  }

  try {
    const vehicle = await vehicleService.getVehicleById(carId);
    if (!vehicle) {
      return res.stauts(404).json({ error: 'Vehicle not found' });
    }

    const user = await userService.getUserById(userId);
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
      start_date: startDate,
      end_date: endDate,
    };

    const result = await rentalService.postRentalData(rentalData);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { postRentalInformation };
