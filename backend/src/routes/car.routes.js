import express from 'express';
import {
  handleDeleteCarById,
  handleGetAllCars,
  handleGetCarById,
  handleGetCarsBySearch,
  handlePostCar,
  handleUpdateCarById,
} from '../controllers/car.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { ROLES } from '../constants.js';

const carRouter = express.Router();

carRouter.get('/cars', handleGetAllCars);
carRouter.get('/cars/search', handleGetCarsBySearch);
carRouter.get('/car/:id', handleGetCarById);
carRouter.post(
  '/car',
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  handlePostCar,
);
carRouter.put(
  '/car/:id',
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  handleUpdateCarById,
);
carRouter.delete(
  '/car/:id',
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  handleDeleteCarById,
);

export { carRouter };
