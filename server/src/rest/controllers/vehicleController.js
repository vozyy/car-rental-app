import vehicleService from '../../services';

const getAll = async (req, res) => {
  try {
    const allVehicles = await vehicleService.getAllVehicles();
    res.json(allVehicles);
  } catch (error) {
    res.status(404).json('No vehicle found');
  }
};

export default {
  getAll,
};
