import express from 'express';
import { handleLogin } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', handleLogin);

export { authRouter };
