const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.showRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

exports.showLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.flash('error', 'Email already registered.');
      return res.redirect('/register');
    }

    await User.create({ username, email, password, role });
    res.flash('success', 'Registration successful. Please sign in.');
    res.redirect('/login');
  } catch (error) {
    res.flash('error', 'Registration failed.');
    res.redirect('/register');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }

    const token = createToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.flash('success', 'Welcome back.');
    res.redirect('/tasks');
  } catch (error) {
    res.flash('error', 'Login failed.');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.flash('success', 'Signed out successfully.');
  res.redirect('/login');
};
