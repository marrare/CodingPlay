function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.salvar = function(sessao, callback){
	this._connection.query('insert into sessao set ? ', sessao, callback);
}

SessaoDao.prototype.listaSessoes = function(callback){
    this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by hora_inicio asc", callback);
}

SessaoDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,A.id,A.nome_sessao,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by hora_inicio asc", callback);
    }
    
}

SessaoDao.prototype.buscarPorId = function(id_sessao, callback){
	this._connection.query("select A.id,A.nome_sessao,A.tamanho_grupo,A.tempo_rotacao,B.nome,C.nome_problema,C.desc_problema,C.dificuldade,DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final FROM sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE A.id = '" +id_sessao.id+ "'", callback);
}

module.exports = function(){
	return SessaoDao;
}
