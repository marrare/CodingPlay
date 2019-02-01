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
        var dadosLogin = req.body;
        
        var connection = app.config.dbConnection();
        
        var AlunoModel = new app.models.AlunoDao(connection);
        AlunoModel.buscarLogin(dadosLogin, function(err, resultAluno){
            if (err) {
                throw err;
            } else {
                if(resultAluno[0] != undefined) {
                    req.session.usuario = resultAluno[0];
                    req.session.usuario.tipo = 'aluno';
                    res.redirect('/');
                } else   {
                    
                    var ProfessorModel = new app.models.ProfessorDao(connection);
                    ProfessorModel.buscarLogin(dadosLogin, function(err, resultProfessor){
                        if (err) {
                            throw err;
                        } else {
                            if(resultProfessor[0] != undefined) {
                                req.session.usuario = resultProfessor[0];
                                req.session.usuario.tipo = 'professor';
                                res.redirect('/');
                            } else {
                                res.render('login', {msg:"Email ou senha invalido"});
                            }
                        }
                    });
                    
                }
            }
        });
        
        
    },
      
    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
    
  };
  return HomeController;
};