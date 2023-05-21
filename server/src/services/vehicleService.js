import Vehicle from '../db/models/vehicle';

const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.find();
    return vehicles;
  } catch (error) {
    throw new Error('Failed to retrieve vehicles');
  }
};

const updateVehicleWithRenter = async (renterId, vehicleId) => {
  try {
    const updateVehicle = await Vehicle.findOneAndUpdate(
      { _id: vehicleId },
      { $set: { rented_by: renterId } },
      { new: true }
    );
    return updateVehicle;
  } catch (error) {
    throw new Error(`Failed to update vehicle in the database`);
  }
};

export { getAllVehicles, updateVehicleWithRenter };
