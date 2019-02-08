module.exports = (app) => {
  const AlunoController = {
      
    paginaCadastro: function(req, res) {
      res.render('cadastrar');
    },
      
    novoAluno: function(req, res) {
        var aluno = req.body;
        
        delete aluno.confirSenha;
        
        var connection = app.config.dbConnection();
        var daoAluno = new app.src.models.AlunoDao(connection);


        daoAluno.salvar(aluno, function(err, result){
            if (err) {
                throw err;
            } else {
                res.redirect('/login');
            }
        }); 
    }
  };
    return AlunoController;
};