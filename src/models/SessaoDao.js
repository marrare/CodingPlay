function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.listaSessoes = function(callback){
    this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by hora_inicio asc", callback);
}

SessaoDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select A.tamanho_grupo,B.nome,C.nome_problema, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A INNER JOIN professor B INNER JOIN problema C ON A.id_professor = B.id AND A.id_problema = C.id order by hora_inicio asc", callback);
    }
    
}

module.exports = function(){
	return SessaoDao;
}
