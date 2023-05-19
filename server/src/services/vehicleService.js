import Vehicle from '../db/models/vehicle';

const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.find();
    return vehicles;
  } catch (error) {
    return { error: error.message };
  }
};

export default getAllVehicles;
