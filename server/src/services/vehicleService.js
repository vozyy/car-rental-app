import Vehicle from '../db/models/vehicle';

const getAllVehicles = () => {
  try {
    const vehicles = Vehicle.find();
    return vehicles;
  } catch (error) {
    throw new Error('Failed to retrieve vehicles');
  }
};

export default getAllVehicles;
