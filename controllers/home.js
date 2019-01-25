module.exports = (app) => {
  const HomeController = {
    index: function(req, res) {
      res.render('index');
    },
    paginaLogin: function(req, res) {
      res.render('login');
    },
    cadastro: function(req, res) {
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
    },
    
    test: function(req, res) {
        var connection = app.config.dbConnection();
        var AlunoModel = new app.models.TestDao(connection);
        AlunoModel.listaAlunos(function(err, result){
            if (err) {
                throw err;
            } else {
                res.render("test", {alunos : result});
            }
        }); 
    }
  };
  return HomeController;
};