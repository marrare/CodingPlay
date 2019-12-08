module.exports = (app) => {
  const problemaController = {
      
    paginaNovoProfessor: function(req, res) {
        res.render("./professor/cadastrarProfessor",{ NovoProfessor : req.flash("NovoProfessor"), valorDuplicado : req.flash("valorDuplicado")});
    },
    novoProfessor: function(req, res) {
        if(typeof(primeiraExecucao) === 'undefined') {
            var professor = req.body;
        } else {
            var professor = req.body;
            professor.codigo_pusher = Math.random().toString().substring(2);
        }
        
        var connection = app.config.dbConnection();
        var daoProfessor = new app.src.models.ProfessorDao(connection);
        
        daoProfessor.salvar(professor, function(err) {
            if (err) {
                if(err.errno == 1062 && err.code == 'ER_DUP_ENTRY') {
                    var errorEmail = err.sqlMessage.indexOf("unique_email");
                    var errorMatricula = err.sqlMessage.indexOf("unique_matricula");
                    var errorCodigoPusher = err.sqlMessage.indexOf("unique_codigo_pusher");

                    if(errorEmail > -1){
                        connection.end();
                        
                        req.flash("valorDuplicado","Email já cadastrado");
                        res.redirect('/professor/add');
                    } else if(errorMatricula > -1) {
                        connection.end();
                        
                        req.flash("valorDuplicado","Matrícula já cadastrada");
                        res.redirect('/professor/add');
                    } else if(errorCodigoPusher > -1) {
                        connection.end();

                        primeiraExecucao = true;
                        res.redirect(307,'/professor/save');
                    }
                } else {
                    throw err;   
                }
            } else {
                connection.end();
                
                req.flash("NovoProfessor","Cadastrado novo professor");
                res.redirect("/professor/add");
            }
                 
        });
    },
    paginaTrocarSenha: function(req, res) {
        
        if(req.flash("contaProfessor") == undefined){
            res.redirect('/');
        } else {
            res.render("trocarSenha", { contaProfessor : req.flash("contaProfessor")});
        }
    },
    trocarSenha: function(req, res) {
        var professor = req.body;
        
        var connection = app.config.dbConnection();
        var daoProfessor = new app.src.models.ProfessorDao(connection);
        
        daoProfessor.trocarSenha(professor, function(err) {
            if (err) {
                throw err;
            } else {
                connection.end();
                
                req.flash("SenhaAlterada","Senha Alterada");
                res.redirect("/login");
            }
                 
        });
        
    }
      
  };
    return problemaController;
};