import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/apiResponse.js';

export const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(errorResponse({ message: `Route not found: ${req.originalUrl}` }));
};
