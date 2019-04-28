module.exports = (app) => {
  const HomeController = {
    paginaIndex: function(req, res) {
      res.render('index');
    },
    paginaLogin: function(req, res) {
      res.render('login',{msgUsuarioCad : req.flash("msgUsuarioCad"), contaDesativada : req.flash("contaDesativada")});
    },
    
    login(req, res) {
        var dadosLogin = req.body;
        
        var connection = app.config.dbConnection();
        
        var daoAluno = new app.src.models.AlunoDao(connection);
        daoAluno.buscarLogin(dadosLogin, function(err, resultAluno){
            if (err) {
                throw err;
            } else {
                if(resultAluno[0] != undefined) {
                    if(resultAluno[0].situacao == '1'){
                        req.session.usuario = resultAluno[0];
                        req.session.tipo = 'aluno';

                        connection.end();

                        res.redirect('/');
                    } else if(resultAluno[0].situacao == '0'){
                        connection.end();
                        
                        req.flash("contaDesativada","Conta inativa, aguarde o professor ativar");
                        res.redirect('/login');
                    }

                } else {
                    
                    var daoProfessor = new app.src.models.ProfessorDao(connection);
                    
                    
                    daoProfessor.buscarLoginSemSenha(dadosLogin, function(err, resultProfSenha){
                        if (err) {
                            throw err;
                        } else {
                            if(resultProfSenha[0] != undefined){
                               if(resultProfSenha[0].senha == null){
                                   
                                    connection.end();

                                    req.flash("contaProfessor", resultProfSenha[0] );
                                    res.redirect('/professor/senha/change');
                               } else {
                                   daoProfessor.buscarLogin(dadosLogin, function(err, resultProfessor){
                                        if (err) {
                                            throw err;
                                        } else {


                                            if(resultProfessor[0] != undefined) {
                                                if(resultProfessor[0].situacao == '1'){
                                                    req.session.usuario = resultProfessor[0];
                                                    req.session.tipo = 'professor';

                                                    connection.end();

                                                    res.redirect('/');
                                                } else if(resultProfessor[0].situacao == '0'){
                                                    connection.end();

                                                    req.flash("contaDesativada","Conta desativada");
                                                    res.redirect('/login');
                                                }
                                            } else {
                                                connection.end();

                                                res.render('login', {msg:"Email ou senha invalido"});
                                            }
                                        }
                                    });
                               }
                            } else {
                                
                                daoProfessor.buscarLogin(dadosLogin, function(err, resultProfessor){
                                    if (err) {
                                        throw err;
                                    } else {


                                        if(resultProfessor[0] != undefined) {
                                            if(resultProfessor[0].situacao == '1'){
                                                req.session.usuario = resultProfessor[0];
                                                req.session.tipo = 'professor';

                                                connection.end();

                                                res.redirect('/');
                                            } else if(resultProfessor[0].situacao == '0'){
                                                connection.end();

                                                req.flash("contaDesativada","Conta desativada");
                                                res.redirect('/login');
                                            }
                                        } else {
                                            connection.end();

                                            res.render('login', {msg:"Email ou senha invalido"});
                                        }
                                    }
                                });
                                
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