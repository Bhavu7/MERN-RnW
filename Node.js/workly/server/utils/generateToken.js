import jwt from 'jsonwebtoken';

export const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
