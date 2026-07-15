import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/apiResponse.js';

export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';
  const errors = error.errors || [];
  res.status(statusCode).json(errorResponse({ message, errors }));
};
