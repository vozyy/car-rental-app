import Vehicle from '../db/models/vehicle';

const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.find();
    return vehicles;
  } catch (error) {
    throw new Error('Failed to retrieve vehicles');
  }
};

const getVehicleById = async (vehicleId) => {
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    return vehicle;
  } catch (error) {
    throw new Error('Failed to retrieve vehicle');
  }
};

export default { getAllVehicles, getVehicleById };
