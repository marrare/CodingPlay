module.exports = (app) => {
  const AlunoController = {
    novoAluno: function(req, res) {
        var aluno = req.body;
        
        delete aluno.confirSenha;
        
        var connection = app.config.dbConnection();
        var AlunoModel = new app.models.AlunoDao(connection);


        AlunoModel.salvar(aluno, function(err, result){
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