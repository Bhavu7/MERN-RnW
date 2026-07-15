import { User } from '../models/User.js';

export const userRepository = {
  create: (payload) => User.create(payload),
  findByEmail: (email, includePassword = false) => User.findOne({ email }).select(includePassword ? '+password +refreshToken' : ''),
  findById: (id) => User.findById(id).select('-password -refreshToken'),
  updateRefreshToken: (id, refreshToken) => User.findByIdAndUpdate(id, { refreshToken }, { new: true })
};
