module.exports = (req, res, next) => {
  if (req.session.tipo != 'professor') {
    return res.redirect('/');
  }
  return next();
};