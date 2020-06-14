function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.salvar = function(sessao, callback){
	this._connection.query('insert into sessao set ? ', sessao, callback);
}

SessaoDao.prototype.listaSessoes = function(sessionUser,callback){
    if(sessionUser.tipo == 'professor') {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by A.situacao DESC, hora_inicio ASC", callback);
    } else {
        this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC;", sessionUser.usuario.id, callback);
    }
}

SessaoDao.prototype.filtrar = function(sessionUser, sessao, callback){
    if(sessionUser.tipo == 'professor') {
        var nomeProblema = sessao.problema != null ? sessao.problema : "";
        var nomeProfessor = sessao.professor != null ? sessao.professor : "";
        var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
        
        if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ?  order by A.situacao DESC, hora_inicio ASC", "%"+nomeProblema+"%", callback);
        } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE ? order by A.situacao DESC, hora_inicio ASC","%"+nomeProfessor+"%", callback);
        } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) order by A.situacao DESC, hora_inicio ASC", dificuldade, callback);
        } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND nome LIKE ? order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%","%"+nomeProfessor+"%"], callback);
        } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%",dificuldade], callback);
        } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProfessor+"%",dificuldade], callback);
        } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND nome LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%","%"+nomeProfessor+"%",dificuldade], callback);
        } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by A.situacao DESC, hora_inicio ASC", callback);
        }
    } else {
        var nomeProblema = sessao.problema != null ? sessao.problema : "";
        var nomeProfessor = sessao.professor != null ? sessao.professor : "";
        var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
        
        if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%",sessionUser.usuario.id], callback);
        } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE ? AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC",["%"+nomeProfessor+"%",sessionUser.usuario.id], callback);
        } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", [dificuldade,sessionUser.usuario.id], callback);
        } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND nome LIKE ? AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%","%"+nomeProfessor+"%",sessionUser.usuario.id], callback);
        } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%",dificuldade,sessionUser.usuario.id], callback);
        } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProfessor+"%",dificuldade,sessionUser.usuario.id], callback);
        } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE ? AND nome LIKE ? AND id_problema IN (SELECT id FROM problema WHERE dificuldade = ?) AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", ["%"+nomeProblema+"%","%"+nomeProfessor+"%",dificuldade,sessionUser.usuario.id], callback);
        } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
            this._connection.query("select A.tamanho_grupo,A.id,A.id_professor,A.nome_sessao,A.situacao,A.confirm_sessao_professor,A.tipo_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?))) order by A.situacao DESC, hora_inicio ASC", sessionUser.usuario.id, callback);
        }
    }
    
    
    
}

SessaoDao.prototype.buscarPorId = function(sessionUser,id_sessao, callback){
    if(sessionUser.tipo == 'professor') {
        this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.id = ?",id_sessao, callback);
    } else {
        this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.id = ? AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?)))",[id_sessao,sessionUser.usuario.id], callback);
    }
}

SessaoDao.prototype.buscarPorNomeSessao = function(sessionUser,nome_sessao, callback){
    if(sessionUser.tipo == 'professor') {
        this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.nome_sessao = ?", nome_sessao, callback);
    } else {
        this._connection.query("select A.id,A.id_professor,A.id_problema,DATE_FORMAT(hora_inicio_realizado,'%Y/%m/%d  %H:%i') AS hora_inicio_realizado,DATE_FORMAT(hora_final_realizado,'%Y/%m/%d  %H:%i') AS hora_final_realizado,A.resposta_sessao_realizada,A.resposta_correta,A.confirm_sessao_professor,A.feedback_sessao,A.situacao,A.tipo_sessao,A.nome_sessao,A.texto_colaborativo,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,C.quantidade_entradas,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.nome_sessao = ? AND A.id_Equipe IN(SELECT id FROM equipe WHERE id IN(SELECT id_Equipe FROM aluno_equipe WHERE id_Aluno IN(SELECT id FROM aluno WHERE id = ?)))", [nome_sessao,sessionUser.usuario.id], callback);
    }
}

SessaoDao.prototype.iniciar = function(sessao, callback){
	this._connection.query("update sessao set hora_inicio_realizado = ?, situacao = 2 WHERE id = ?", [sessao.horaInicio,sessao.idSessao], callback);
}

SessaoDao.prototype.finalizar = function(sessao, callback){
	this._connection.query("update sessao set hora_final_realizado = ?, resposta_sessao_realizada = ?, acerto_casos_teste = ?, situacao = 0 WHERE id = ?", [sessao.horaFinal,sessao.resposta,sessao.acertosCasoTeste,sessao.sessao_id], callback);
}

SessaoDao.prototype.deletar = function(idSessao, callback){
	this._connection.query("delete from sessao WHERE id = ?", idSessao, callback);
}

SessaoDao.prototype.feedbackSalvar = function(sessao, callback){
	this._connection.query("update sessao set resposta_correta = ?, feedback_sessao = ? WHERE id = ?", [sessao.resposta,sessao.feedback,sessao.sessao_id], callback);
}

SessaoDao.prototype.ativarSessaoProfessor = function(sessao, callback){
	this._connection.query("update sessao set confirm_sessao_professor = 1 WHERE id = ?", [sessao.idSessao], callback);
}

module.exports = function(){
	return SessaoDao;
}
