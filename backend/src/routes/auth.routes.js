import express from 'express';
import {
  handleGetMe,
  handleLogin,
  handleLogout,
  handleRefreshToken,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', handleLogin);
authRouter.post('/refresh-token', handleRefreshToken);
authRouter.post('/logout', authMiddleware, handleLogout);
authRouter.post('/me', authMiddleware, handleGetMe);

export { authRouter };
