module.exports = (app) => {
  const AlunoController = {
    verComoAluno: function(req, res) {
      res.render('aluno/index');
    },
  };
  return AlunoController;
};

