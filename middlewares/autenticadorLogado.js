module.exports = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  } else if(req.session.usuario.situacao == "1"){
    return next();
  }
  
};