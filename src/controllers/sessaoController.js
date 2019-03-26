module.exports = (app) => {
  const SessoesController = {
    paginaListarSessoes: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.listaSessoes(function(err, result) {
            if (err) {
                throw err;
            } else {
                res.render('./sessao/listarSessoes',{sessoes : result, menssagem : req.flash("menssagem")});
            }
        });
    },
    
    paginaListarSessoesFiltro: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.filtrar(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                res.render('./sessao/listarSessoes',{sessoes : result});
            }
        });  
    },
      
    paginaNovaSessao: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.listaProblemasProfessor(function(err, result) {
            if (err) {
                throw err;
            } else {
                res.render('./sessao/novaSessao',{problemas : result});
            }      
        });
        
    },
      
    paginaNovaSessaoFiltro: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.filtrar(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                res.render('./sessao/novaSessao',{problemas : result});
            }
        });  
    },
    
    novaSessao: function(req, res) {
        var sessao = req.body;
        
        sessao.id_professor = req.session.usuario.id;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.salvar(sessao, function(err) {
            if(err) {
                throw err;
            } else {
                req.flash("menssagem","Sessão Criada com Sucesso");
                res.redirect('/sessoes/list');
            }
        }); 

    },
      
    paginaSessaoDetalhada: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        if (valor.id != null) {
            daoSessao.buscarPorId(valor, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    res.render('./sessao/sessaoDetalhada',{sessao : result});
                }
            });
        } else if (valor.nome_sessao != null) {
            daoSessao.buscarPorNomeSessao(valor, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    res.render('./sessao/sessaoDetalhada',{sessao : result});
                }
            });
        }
    },
    poc: function(req, res) {
        res.render('poc');
    }
  };
    return SessoesController;
};