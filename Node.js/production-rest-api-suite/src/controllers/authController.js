import { StatusCodes } from 'http-status-codes';
import { refreshCookieOptions } from '../helpers/cookie.js';
import { authService } from '../services/authService.js';
import { successResponse } from '../utils/apiResponse.js';

export const authController = {
  register: async (req, res) => {
    const result = await authService.register(req.body);
    res.cookie('refreshToken', result.refreshToken, refreshCookieOptions);
    res.status(StatusCodes.CREATED).json(successResponse({
      message: 'User registered successfully',
      data: result
    }));
  },

  login: async (req, res) => {
    const result = await authService.login(req.body);
    res.cookie('refreshToken', result.refreshToken, refreshCookieOptions);
    res.status(StatusCodes.OK).json(successResponse({
      message: 'Login successful',
      data: result
    }));
  },

  profile: async (req, res) => {
    res.status(StatusCodes.OK).json(successResponse({
      message: 'Profile fetched successfully',
      data: req.user
    }));
  },

  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const result = await authService.refresh(refreshToken);
    res.cookie('refreshToken', result.refreshToken, refreshCookieOptions);
    res.status(StatusCodes.OK).json(successResponse({
      message: 'Token refreshed successfully',
      data: result
    }));
  },

  logout: async (req, res) => {
    await authService.logout(req.user._id);
    res.clearCookie('refreshToken');
    res.status(StatusCodes.OK).json(successResponse({ message: 'Logout successful' }));
  }
};
