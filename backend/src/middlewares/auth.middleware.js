import Jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Try to get token from cookies
    let token = req.cookies?.accessToken;

    // If not in cookie, try Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!token && authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied',
      });
    }

    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Authentication failed',
        errMsg: err.message,
      });
    }
  }
};

export { authMiddleware };
