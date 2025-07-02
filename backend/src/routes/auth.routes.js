import express from 'express';
import {
  handleGetMe,
  handleLogin,
  handleLogout,
  handleRefreshToken,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', handleLogin);
authRouter.post('/refresh-token', handleRefreshToken);
authRouter.post('/logout', handleLogout);
authRouter.post('/me', handleGetMe);

export { authRouter };
