import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/apiResponse.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json(errorResponse({
    message: 'Validation Failed',
    errors: errors.array().map((error) => ({ field: error.path, message: error.msg }))
  }));
};
