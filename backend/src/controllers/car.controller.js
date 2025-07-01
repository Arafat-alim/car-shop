import { asyncHandler } from '../utils/asyncHandler.js';
import * as carService from '../services/car.services.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { carSchema, updateCarSchema } from '../utils/zodSchemas.js';

const handleGetAllCars = asyncHandler(async (req, res) => {
  const cars = await carService.getAllCars();
  return res
    .status(200)
    .json(new ApiResponse(200, cars, 'Cars fetched successfully'));
});

const handleGetCarById = asyncHandler(async (req, res) => {
  const carId = req.params.id;
  const car = await carService.getCarById(carId);
  if (!car) {
    throw new ApiError(404, 'Car not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, car, 'Car fetched successfully'));
});

const handlePostCar = asyncHandler(async (req, res) => {
  const result = carSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, 'Invalid input', result.error.errors);
  }

  const carData = { ...result.data, createdBy: req.user.userId };
  const car = await carService.createCar(carData);
  return res
    .status(201)
    .json(new ApiResponse(201, car, 'Car created Successfully'));
});

const handleUpdateCarById = asyncHandler(async (req, res) => {
  const carId = req.params.id;
  const result = updateCarSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, 'Invalid input', result.error.errors);
  }

  const car = await carService.updateCar(carId, result.data);
  if (!car) {
    throw new ApiError(404, 'Car not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, car, 'Car updated successfully'));
});
const handleDeleteCarById = asyncHandler(async (req, res) => {
  const carId = req.params.id;
  const car = await carService.deleteCar(carId);
  if (!car) {
    throw new ApiError(404, 'Car not found');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Car deleted successfully'));
});

export {
  handleDeleteCarById,
  handleGetAllCars,
  handleGetCarById,
  handlePostCar,
  handleUpdateCarById,
};
