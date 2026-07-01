const flashMiddleware = (req, res, next) => {
  res.locals.flash = req.cookies.flash ? JSON.parse(req.cookies.flash) : null;
  if (req.cookies.flash) {
    res.clearCookie('flash');
  }

  res.flash = (type, text) => {
    res.cookie('flash', JSON.stringify({ type, text }), {
      httpOnly: true,
      sameSite: 'lax'
    });
  };

  next();
};

module.exports = flashMiddleware;
