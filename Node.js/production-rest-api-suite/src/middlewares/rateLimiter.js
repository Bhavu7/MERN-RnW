import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';
import { errorResponse } from '../utils/apiResponse.js';

export const apiRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  limit: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorResponse({ message: 'Too many requests, please try again later.' })
});
