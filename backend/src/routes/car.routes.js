import express from 'express';
import {
  handleDeleteCarById,
  handleGetAllCars,
  handleGetCarById,
  handlePostCar,
  handleUpdateCarById,
} from '../controllers/car.controller.js';

const carRouter = express.Router();

carRouter.get('/cars', handleGetAllCars);
carRouter.get('/car/:id', handleGetCarById);
carRouter.post('/car', handlePostCar);
carRouter.put('/car/:id', handleUpdateCarById);
carRouter.delete('/car/:id', handleDeleteCarById);

export { carRouter };
