import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories/userRepository.js';
import { errorResponse } from '../utils/apiResponse.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse({ message: 'Authentication required' }));
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await userRepository.findById(payload.sub);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse({ message: 'Invalid token' }));
    }
    req.user = user;
    next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse({ message: 'Invalid or expired token' }));
  }
};
