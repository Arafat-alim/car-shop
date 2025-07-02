// Helper function to generate tokens
import jwt from 'jsonwebtoken';

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }, // Short-lived access token
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }, // Long-lived refresh token
  );

  return { accessToken, refreshToken };
};

export { generateTokens };
