module.exports = (req, res, next) => {
  if (req.session.tipo != 'professor') {
    return res.redirect('/');
  } else if(req.session.usuario.situacao == "1"){
    return next();
  }
};