module.exports = (app) => {
  const SessoesController = {
    paginaListarSessoes: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.listaSessoes(function(err, result) {
            if (err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./sessao/listarSessoes',{sessoes : result, menssagemCriar : req.flash("menssagemCriar"), menssagemRemover : req.flash("menssagemRemover")});
            }
        });
    },
    
    paginaListarSessoesFiltro: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.filtrar(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./sessao/listarSessoes',{sessoes : result});
            }
        });  
    },
      
    paginaNovaSessao: function(req, res) {
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.listaProblemasProfessor(function(err, result) {
            if (err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./sessao/novaSessao',{problemas : result});
            }      
        });
        
    },
      
    paginaNovaSessaoFiltro: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoProblema = new app.src.models.ProblemaDao(connection);
        
        daoProblema.filtrar(valor, function(err, result) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                res.render('./sessao/novaSessao',{problemas : result});
            }
        });  
    },
    
    novaSessao: function(req, res) {
        var sessao = req.body;
        
        sessao.id_professor = req.session.usuario.id;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.salvar(sessao, function(err) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                req.flash("menssagemCriar","Sessão Criada com Sucesso");
                res.redirect('/sessoes/list');
            }
        }); 

    },
      
    paginaSessaoDetalhada: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        var ParticipaSessaoDao = new app.src.models.ParticipaSessaoDao(connection);
        var QuestionarioDao = new app.src.models.QuestionarioDao(connection);
        
        if (valor.id != null) {
            // Buscar Sessão
            daoSessao.buscarPorId(valor.id, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    // Buscar Participantes
                    ParticipaSessaoDao.buscarPorIdSessao(valor.id, function(err2, result2) {
                        if (err2) {
                            throw err2;
                        } else {
                            // Buscar Verificar se usuario logado foi um dos participantes
                            var ifUsuarioLogadoParticipante = 0;
                            for(i=0; i < result2.length; i++){
                                if(result2[i].id == req.session.usuario.id && req.session.tipo == 'aluno') {
                                    ifUsuarioLogadoParticipante = 1;
                                }
                            }
                            
                            switch(ifUsuarioLogadoParticipante) {
                                // Se usuario não foi participante carrega página normalmente
                                case 0: 
                                    connection.end();
                                    
                                    res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});
                                break;
                                    
                                // Se usuario foi participante, então verificar se já respondeu o questionário
                                case 1: 
                                    var part = {
                                        id_participante : req.session.usuario.id,
                                        id_sessao : valor.id
                                    }
                                    
                                    QuestionarioDao.buscarRespostaUsuario(part, function(err3, result3) {
                                            if (err3) {
                                                throw err3;
                                            } else {
                                                
                                                // Se respondeu o questionário carrega página normalmente
                                                if(result3[0].qtd_resposta > 0) {
                                                    connection.end();
                                                    
                                                    res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});
                                                    
                                                // Se não respondeu o questionário, então buscar perguntas do questionário para serem respondidas
                                                } else if(result3[0].qtd_resposta == 0) {
                                                    QuestionarioDao.listarPerguntas(function(err4, result4) {
                                                        if (err4) {
                                                            throw err4;
                                                        } else {
                                                            connection.end();
                                                            
                                                            res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, perguntas : result4, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});
                                                        }
                                                    });
                                                }
                                                
                                            }
                                        });
                                break;
                            }
                        }
                    });
                }
            });
        } else if (valor.nome_sessao != null) {
            daoSessao.buscarPorNomeSessao(valor.nome_sessao, function(err, result) {
                if (err) {
                    throw err;
                } else {
                    if(result.length == 0){
                        connection.end();

                        res.redirect('/');
                    }else {
                        ParticipaSessaoDao.buscarPorIdSessao(result[0].id, function(err2, result2) {
                            if (err2) {
                                throw err;
                            } else {
                                // Buscar Verificar se usuario logado foi um dos participantes
                                var ifUsuarioLogadoParticipante = 0;
                                for(i=0; i < result2.length; i++){
                                    if(result2[i].id == req.session.usuario.id && req.session.tipo == 'aluno') {
                                        ifUsuarioLogadoParticipante = 1;
                                    }
                                }

                                switch(ifUsuarioLogadoParticipante) {
                                    // Se usuario não foi participante carrega página normalmente
                                    case 0: 
                                        connection.end();

                                        res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});
                                    break;

                                    // Se usuario foi participante, então verificar se já respondeu o questionário
                                    case 1: 
                                        var part = {
                                            id_participante : req.session.usuario.id,
                                            id_sessao : result[0].id
                                        }

                                        QuestionarioDao.buscarRespostaUsuario(part, function(err3, result3) {
                                                if (err3) {
                                                    throw err3;
                                                } else {

                                                    // Se respondeu o questionário carrega página normalmente
                                                    if(result3[0].qtd_resposta > 0) {
                                                        connection.end();

                                                        res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});

                                                    // Se não respondeu o questionário, então buscar perguntas do questionário para serem respondidas
                                                    } else if(result3[0].qtd_resposta == 0) {
                                                        QuestionarioDao.listarPerguntas(function(err4, result4) {
                                                            if (err4) {
                                                                throw err4;
                                                            } else {
                                                                connection.end();

                                                                res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, perguntas : result4, menssagem : req.flash("menssagem"), menssagemFeedbackSalvo : req.flash("menssagemFeedbackSalvo")});
                                                            }
                                                        });
                                                    }

                                                }
                                            });
                                    break;
                                }
                            }
                        });
                    }   
                }
            });
        }
    },
    paginaSessaoAtiva: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        var ParticipaSessaoDao = new app.src.models.ParticipaSessaoDao(connection);
        
        daoSessao.buscarPorId(valor.idSessao, function(err, result) {
            if (err) {
                throw err;
            } else {
                if(result[0].situacao == 1 || result[0].situacao == 2) {
                    result[0].participante = valor.participante;
                    
                    connection.end();
                    
                    if(result[0].tipo_sessao == 'blocos') {
                        res.render('./sessao/sessaoAtivaBlockly',{sessao : result});
                    } else if(result[0].tipo_sessao == 'codigo') {
                        res.render('./sessao/sessaoAtiva',{sessao : result});
                    }
                    
                    
                } else {
                    ParticipaSessaoDao.buscarPorIdSessao(valor.idSessao, function(err2, result2) {
                        if (err2) {
                            throw err;
                        } else {
                            connection.end();
                            
                            res.render('./sessao/sessaoDetalhada',{sessao : result, participantes : result2, menssagem : req.flash("menssagem")});
                        }
                    });
                }
                
            }
        });
    },
    iniciarSessao: function(req, res) {
        var valor = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.iniciar(valor, function(err) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                res.redirect('/sessao/active?idSessao='+valor.idSessao+'&participante=0&id='+valor.id);
            }
        }); 

    },
    finalizarSessao: function(req, res) {
        var valor = req.query;
        valor.resposta = decodeURIComponent(valor.resposta);
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        var ParticipaSessaoDao = new app.src.models.ParticipaSessaoDao(connection);
        
        daoSessao.finalizar(valor, function(err) {
            if(err) {
                throw err;
            } else {
                
                var participantes = valor.participantes.split("/");
                participantes.pop();
                
                for(i=0; i < participantes.length; i++) {
                    var part = {
                        id_participante : participantes[i],
                        id_sessao : valor.sessao_id
                    }
                    
                    ParticipaSessaoDao.salvar(part, function(err) {
                        if(err) {
                            throw err;
                        }
                    });
                }
                connection.end();
                
                req.flash("menssagem","Sessão Finalizada com Sucesso");
                res.redirect('/sessao/info?id='+valor.sessao_id);
                
            }
        });

    },
    
    deletarSessao: function(req, res) {
        var sessao = req.query;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.deletar(sessao.id, function(err) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                req.flash("menssagemRemover","Sessao Removida com Sucesso");
                res.redirect('/sessoes/list');
            }
        }); 

    },
    
    feedbackSave: function(req, res) {
        var valor = req.body;
        
        var connection = app.config.dbConnection();
        var daoSessao = new app.src.models.SessaoDao(connection);
        
        daoSessao.feedbackSalvar(valor, function(err) {
            if(err) {
                throw err;
            } else {
                connection.end();
                
                req.flash("menssagemFeedbackSalvo","Feedback Salvo com Sucesso");
                res.redirect('/sessao/info?id='+valor.sessao_id);
            }
        }); 

    }
  };
    return SessoesController;
};