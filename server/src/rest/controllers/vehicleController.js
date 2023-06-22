import { vehicleService } from '../../services';

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

export default { getAll };
