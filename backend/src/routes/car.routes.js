import express from 'express';
import {
  handleDeleteCarById,
  handleGetAllCars,
  handleGetCarById,
  handlePostCar,
  handleUpdateCarById,
} from '../controllers/car.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const carRouter = express.Router();

carRouter.get('/cars', handleGetAllCars);
carRouter.get('/car/:id', handleGetCarById);
carRouter.post('/car', authMiddleware, roleMiddleware, handlePostCar);
carRouter.put('/car/:id', authMiddleware, roleMiddleware, handleUpdateCarById);
carRouter.delete(
  '/car/:id',
  authMiddleware,
  roleMiddleware,
  handleDeleteCarById,
);

export { carRouter };
