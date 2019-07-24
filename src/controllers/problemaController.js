module.exports = (app) => {
  const problemaController = {
      
    paginaListarProblemas: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.listaProblemasProfessor(function(err, result) {
            if (err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./problema/listarProblemas',{problemas : result, menssagemCriar : req.flash("menssagemCriar"), menssagemRemover : req.flash("menssagemRemover")});
            }      
        });
    },
    
    paginaNovoProblema: function(req, res) {
        res.render('./problema/novoProblema');
    },
    
    NovoProblema: function(req, res) {
        var problema = req.body;
        
        problema.id_professor = req.session.usuario.id;
        problema.nome_problema = problema.nome_problema.toUpperCase();
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.salvar(problema, function(err,result) {
            if(err) {
                throw err;
            } else {
                var quantidadeEntradas = parseInt(problema.entrada_quantidade);
                var countSaida = 0;
                
                if(problema.entrada != undefined) {
                    for(i=quantidadeEntradas; i<=problema.entrada.length; i = i+quantidadeEntradas) {
                        if(Array.isArray(problema.entrada)) {
                            var entradaArray = problema.entrada.slice((i-quantidadeEntradas),i);
                            entradaArray = entradaArray.join(";");
                        } else {
                            var entradaArray = problema.entrada;
                        }

                        var casoTesteAtual = {
                            id_Problema : result.insertId,
                            entrada : entradaArray,
                            saida : problema.saida[countSaida]
                        }
                        daoProblema.salvarCasoDeTeste(casoTesteAtual, function(err) {
                            if(err) {
                                throw err;
                            }
                        });                           
                        countSaida++;
                    }
                }
                
                connection.end();
                
                req.flash("menssagemCriar","Problema Criado com Sucesso");
                res.redirect('/problema/list');
                
            }
        });

    },
    
    deletarProblema: function(req, res) {
        var problema = req.query;
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.deletar(problema.id, function(err) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                req.flash("menssagemRemover","Problema Removido com Sucesso");
                res.redirect('/problema/list');
            }
        }); 

    }
      
  };
    return problemaController;
};