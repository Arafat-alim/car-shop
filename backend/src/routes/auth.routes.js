import express from 'express';
import {
  handleGetMe,
  handleLogin,
  handleLogout,
} from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', handleLogin);
authRouter.post('/refresh-token', handleLogin);
authRouter.post('/logout', handleLogout);
authRouter.post('/me', handleGetMe);

export { authRouter };
