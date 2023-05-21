import vehicleService from '../../services';

const getAll = async (req, res) => {
  try {
    const result = await vehicleService.getAllVehicles();

    if (!result.length) {
      return res.status(404).json({ error: 'No vehicles found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVehicleRenter = async (req, res) => {
  const { renterId, vehicleId } = req.body;

  if (!renterId || !vehicleId) {
    return res
      .status(422)
      .json({ error: 'renterId and vehicleId are required' });
  }

  try {
    const result = await vehicleService.addRenterToVehicle(renterId, vehicleId);
    res.json({ message: 'Vehicle updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAll,
  updateVehicleRenter,
};
