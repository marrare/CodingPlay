module.exports = (app) => {
  const SessoesController = {
    paginaListarSessoes: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.listaSessoes(function(err, result) {
            if (err) {
                throw err;
            } else {
                res.render('./sessao/listarSessoes',{sessoes : result});
            }
        });
    },
      
    paginaNovaSessao: function(req, res) {
        res.render('./sessao/novaSessao');
    },
    
    filtro: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.filtrar(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                res.render('./sessao/listarSessoes',{sessoes : result});
            }
        });  
    }  
      
  };
    return SessoesController;
};