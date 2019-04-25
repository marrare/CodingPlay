module.exports = (app) => {
  const questionarioController = {
    
    novoQuestionario: function(req, res) {
        var questionario = req.body;
        var valor = {
            'id_sessao' : questionario.id_sessao,
            'id_participante' : req.session.usuario.id
        }
        
        //Convertendo Objeto em Array
        var questionarioArray = Object.keys(questionario).map(function(key) {
          return [Number(key), questionario[key]];
        });
        
        questionarioArray.pop();
        
        var connection = app.config.dbConnection();
        var daoQuestionario = new app.src.models.QuestionarioDao(connection);
        var daoParticipaSessao = new app.src.models.ParticipaSessaoDao(connection);
        
        
        daoParticipaSessao.buscarUsuarioParticipaSessao(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                for(i=0; i < questionarioArray.length; i++) {
                    var part = {
                        id_pergunta: questionarioArray[i][0],
                        id_participa_sessao : result[0].id,
                        resposta : questionarioArray[i][1],
                    }
                    if(part.resposta != "") {
                        daoQuestionario.salvarResposta(part, function(err) {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                }
                connection.end();
                
                res.redirect('/sessao/info?id='+valor.id_sessao);
                
            }
        });
        
        
        
        
        

    },
      
  };
    return questionarioController;
};