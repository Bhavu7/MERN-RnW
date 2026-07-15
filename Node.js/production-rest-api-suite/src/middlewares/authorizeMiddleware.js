import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/apiResponse.js';

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json(errorResponse({ message: 'You are not allowed to access this resource' }));
  }
  next();
};
