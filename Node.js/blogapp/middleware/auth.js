// middleware/auth.js
// Middleware to protect routes and manage logged-in user state

// Allow access only if user is logged in (session has userId)
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) return next();
  req.flash('error', 'Please log in to continue');
  return res.redirect('/login');
};

// Allow access only if user is NOT logged in (for login/register pages)
exports.isLoggedOut = (req, res, next) => {
  if (!req.session.userId) return next();
  return res.redirect('/blog');
};

// Make current user info available to all views (e.g. for navbar)
exports.setLocals = (req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.userName = req.session.userName || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
};
