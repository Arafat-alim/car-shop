import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const roleMiddleware = (allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden: Insufficient permissions');
    }
    next();
  });

export { roleMiddleware };
