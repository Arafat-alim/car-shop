import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { loginSchema } from '../utils/zodSchemas.js';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const handleLogin = asyncHandler(async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, 'Invalid input', result.error.errors);
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { token, role: user.role }, 'Login successful'));
});

export { handleLogin };
