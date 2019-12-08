module.exports = (app) => {
  const AlunoController = {
      
    paginaCadastro: function(req, res) {
      res.render('cadastrar',{valorDuplicado : req.flash("valorDuplicado")});
    },
      
    novoAluno: function(req, res) {
        if(typeof(primeiraExecucao) === 'undefined') {
            var aluno = req.body;
            delete aluno.confirSenha;
        } else {
            var aluno = req.body;
            aluno.codigo_pusher = Math.random().toString().substring(2);
            delete aluno.confirSenha;
        }
        
        var connection = app.config.dbConnection();
        var daoAluno = new app.src.models.AlunoDao(connection);


        daoAluno.salvar(aluno, function(err, result){
            if (err) {
                if(err.errno == 1062 && err.code == 'ER_DUP_ENTRY') {
                    var errorEmail = err.sqlMessage.indexOf("unique_email");
                    var errorMatricula = err.sqlMessage.indexOf("unique_matricula");
                    var errorCodigoPusher = err.sqlMessage.indexOf("unique_codigo_pusher");

                    if(errorEmail > -1){
                        connection.end();

                        req.flash("valorDuplicado","Email já cadastrado");
                        res.redirect('/aluno/add');
                    } else if(errorMatricula > -1) {
                        connection.end();

                        req.flash("valorDuplicado","Matrícula já cadastrada");
                        res.redirect('/aluno/add');
                    } else if(errorCodigoPusher > -1) {
                        connection.end();

                        primeiraExecucao = true;
                        res.redirect(307,'/aluno/save');
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
    },
    paginaAlunosPendentes: function(req, res) {
    
      var connection = app.config.dbConnection();
      var daoAluno = new app.src.models.AlunoDao(connection);
        
      daoAluno.listaAlunosPendentes(function(err, result){
            if (err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./aluno/alunosEmEspera',{alunos : result, alunosAtivados : req.flash("alunosAtivados")});
            }
        });
    },
    confirmAlunos: function(req, res) {
      var idAlunos = req.body;
        
      //Convertendo Objeto em Array
      var idAlunosArray = Object.keys(idAlunos).map(function(key) {
        return [Number(key), idAlunos[key]];
      });
    
      var connection = app.config.dbConnection();
      var daoAluno = new app.src.models.AlunoDao(connection);
    
      for(i=0; i < idAlunosArray.length; i++) {
        var id_aluno = idAlunosArray[i][1];
        
        daoAluno.ativarContaAlunos(id_aluno, function(err) {
            if(err) {
                throw err;
            }
        });
      }
        
      connection.end();
                
      req.flash("alunosAtivados","Alunos ativados com sucesso");
      res.redirect('/aluno/active');
        
    }
      
  };
    return AlunoController;
};