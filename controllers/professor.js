module.exports = (app) => {
  const AlunoController = {
    verComoProfessor: function(req, res) {
      res.render('professor/index');
    },
  };
  return AlunoController;
};

