import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken, setTokenCookie } from '../utils/generateToken.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All required fields must be provided');
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ username, email, password, role: role || 'user' });
  const token = generateToken(user);
  setTokenCookie(res, token);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: { id: user._id, username: user.username, email: user.email, role: user.role },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user);
  setTokenCookie(res, token);

  res.json({
    success: true,
    message: 'Login successful',
    user: { id: user._id, username: user.username, email: user.email, role: user.role },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
