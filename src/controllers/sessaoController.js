module.exports = (app) => {
  const SessoesController = {
    paginaListarSessoes: function(req, res) {
        res.render('./sessao/listarSessoes');
    },
    paginaNovaSessao: function(req, res) {
        res.render('./sessao/novaSessao');
    }
  };
    return SessoesController;
};