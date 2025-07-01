import { Car } from '../models/car.models';

const getAllCars = async () => {
  return await Car.find({}).populate('createdBy', 'email');
};

const getCarById = async (id) => {
  return await Car.find(id).populate('createdBy', 'email');
};

const createCar = async (carData) => {
  const slug = `${carData.make.toLowerCase().replace(/\s+/g, '-')}-${carData.year}`;
  return await Car.create({ ...carData, slug });
};

const updateCar = async (id, carData) => {
  const slug = carData.make
    ? `${carData.make.toLowerCase().replace(/\s+/g, '-')}-${carData.year || (await Car.findById(id)).year}`
    : undefined;

  return await Car.findByIdAndUpdate(id, { ...carData, slug }, { new: true });
};

const deleteCar = async (id) => {
  return await Car.findByIdAndDelete(id);
};

export { getCarById, getAllCars, getAllCars, createCar, updateCar, deleteCar };
