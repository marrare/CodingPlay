function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.salvar = function(sessao, callback){
	this._connection.query('insert into sessao set ? ', sessao, callback);
}

SessaoDao.prototype.listaSessoes = function(callback){
    this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by A.situacao DESC, hora_inicio ASC", callback);
}

SessaoDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by A.situacao DESC, hora_inicio ASC", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by A.situacao DESC, hora_inicio ASC", callback);
    }
    
}

SessaoDao.prototype.buscarPorId = function(id_sessao, callback){
	this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.id = '" +id_sessao+ "'", callback);
}

SessaoDao.prototype.buscarPorNomeSessao = function(nome_sessao, callback){
	this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.nome_sessao = '" +nome_sessao+ "'", callback);
}

SessaoDao.prototype.iniciar = function(sessao, callback){
	this._connection.query("update sessao set hora_inicio_realizado = '"+sessao.horaInicio+"', situacao = 2 WHERE id = '"+sessao.idSessao+"' ", sessao, callback);
}

SessaoDao.prototype.finalizar = function(sessao, callback){
	this._connection.query("update sessao set hora_final_realizado = '"+sessao.horaFinal+"', resposta_sessao_realizada = '"+sessao.resposta+"', acerto_casos_teste = '"+sessao.acertosCasoTeste+"', situacao = 0 WHERE id = '"+sessao.sessao_id+"' ", sessao, callback);
}

SessaoDao.prototype.deletar = function(idSessao, callback){
	this._connection.query("delete from sessao WHERE id = "+idSessao+"", callback);
}

SessaoDao.prototype.feedbackSalvar = function(sessao, callback){
	this._connection.query("update sessao set resposta_correta = '"+sessao.resposta+"', feedback_sessao = '"+sessao.feedback+"' WHERE id = '"+sessao.sessao_id+"' ", callback);
}

SessaoDao.prototype.ativarSessaoProfessor = function(sessao, callback){
	this._connection.query("update sessao set confirm_sessao_professor = 1 WHERE id = '"+sessao.idSessao+"' ", callback);
}

module.exports = function(){
	return SessaoDao;
}
