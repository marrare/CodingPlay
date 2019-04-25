module.exports = (app) => {
  const AlunoController = {
      
    paginaCadastro: function(req, res) {
      res.render('cadastrar',{valorDuplicado : req.flash("valorDuplicado")});
    },
      
    novoAluno: function(req, res) {
        var aluno = req.body;
        
        delete aluno.confirSenha;
        
        var connection = app.config.dbConnection();
        var daoAluno = new app.src.models.AlunoDao(connection);


        daoAluno.salvar(aluno, function(err, result){
            if (err) {
                if(err.errno == 1062 && err.code == 'ER_DUP_ENTRY') {
                    var errorEmail = err.sqlMessage.indexOf("unique_email");
                    var errorMatricula = err.sqlMessage.indexOf("unique_matricula");

                    if(errorEmail > -1){
                        req.flash("valorDuplicado","Email já cadastrado");
                        res.redirect('/aluno/add');
                    } else if(errorMatricula > -1) {
                        req.flash("valorDuplicado","Matrícula já cadastrada");
                        res.redirect('/aluno/add');
                    }
                } else {
                    throw err;   
                }
            } else {
                connection.end();
                
                req.flash("msgUsuarioCad","Usuario Cadastrado com Sucesso");
                res.redirect('/login');
            }
        }); 
    }
  };
    return AlunoController;
};