import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories/userRepository.js';
import { ApiError } from '../utils/ApiError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});

const generateTokens = (user) => {
  const payload = { sub: user._id.toString(), role: user.role, email: user.email };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload)
  };
};

export const authService = {
  register: async (payload) => {
    const existingUser = await userRepository.findByEmail(payload.email);
    if (existingUser) throw new ApiError(StatusCodes.CONFLICT, 'Email already exists');
    const user = await userRepository.create(payload);
    const tokens = generateTokens(user);
    await userRepository.updateRefreshToken(user._id, tokens.refreshToken);
    return { user: sanitizeUser(user), ...tokens };
  },

  login: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email, true);
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
    }
    const tokens = generateTokens(user);
    await userRepository.updateRefreshToken(user._id, tokens.refreshToken);
    return { user: sanitizeUser(user), ...tokens };
  },

  refresh: async (refreshToken) => {
    if (!refreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token is required');
    const payload = verifyRefreshToken(refreshToken);
    const user = await userRepository.findByEmail(payload.email, true);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
    }
    const tokens = generateTokens(user);
    await userRepository.updateRefreshToken(user._id, tokens.refreshToken);
    return { user: sanitizeUser(user), ...tokens };
  },

  logout: async (userId) => {
    await userRepository.updateRefreshToken(userId, null);
  }
};
