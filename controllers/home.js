module.exports = (app) => {
  const HomeController = {
    index: function(req, res) {
      res.render('index');
    },
    paginaLogin: function(req, res) {
      res.render('login');
    },
    paginaCadastro: function(req, res) {
      res.render('cadastrar');
    },
    
    
    login(req, res) {
        const { usuario } = req.body;
        const { email, nome} = usuario;
        if(email && nome) {
            usuario.contatos = [];
            req.session.usuario = usuario;
            res.redirect('/contatos');
        } else {
            res.redirect('/');
        }
    },
      
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
    
  };
  return HomeController;
};