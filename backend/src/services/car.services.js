import { Car } from '../models/car.models.js';
import { ApiError } from '../utils/ApiError.js';

const getAllCars = async (filters = {}) => {
  return await Car.find(filters).populate('createdBy', 'email');
};

const getCarById = async (id) => {
  return await Car.findOne({ _id: id }).populate('createdBy', 'email');
};

const createCar = async (carData) => {
  const slug = `${carData.make.toLowerCase().replace(/\s+/g, '-')}-${carData.year}`;
  return await Car.create({ ...carData, slug });
};

const updateCar = async (id, carData) => {
  const car = await Car.findById(id);
  if (!car) throw new ApiError(404, 'Car not found');
  const slug = carData.make
    ? `${carData.make.toLowerCase().replace(/\s+/g, '-')}-${carData.year || (await Car.findById(id)).year}`
    : undefined;

  return await Car.findByIdAndUpdate(id, { ...carData, slug }, { new: true });
};

const deleteCar = async (id) => {
  const car = await Car.findByIdAndDelete(id);
  if (!car) throw new ApiError(404, 'Car not found');
  return car;
};

export { getCarById, getAllCars, createCar, updateCar, deleteCar };
