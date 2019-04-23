module.exports = (app) => {
  const problemaController = {
      
    paginaListarProblemas: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.listaProblemasProfessor(function(err, result) {
            if (err) {
                throw err;
            } else {
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
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.salvar(problema, function(err) {
            if(err) {
                throw err;
            } else {
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
                req.flash("menssagemRemover","Problema Removido com Sucesso");
                res.redirect('/problema/list');
            }
        }); 

    }
      
  };
    return problemaController;
};