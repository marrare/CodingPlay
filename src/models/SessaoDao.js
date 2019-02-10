function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.listaSessoes = function(callback){
    this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id order by hora_inicio asc", callback);
}

SessaoDao.prototype.filtrar = function(sessao, callback){
    
    var nomeSessao = sessao.sessao != null ? sessao.sessao : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeSessao != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome_sessao LIKE'%"+nomeSessao+"%' order by hora_inicio asc", callback);
    } else if (nomeSessao == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeSessao == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeSessao != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome_sessao LIKE'%"+nomeSessao+"%' AND nome LIKE'%"+nomeProfessor+"%' order by hora_inicio asc", callback);
    } else if (nomeSessao != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome_sessao LIKE'%"+nomeSessao+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeSessao == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeSessao != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id WHERE nome_sessao LIKE'%"+nomeSessao+"%' AND nome LIKE'%"+nomeProfessor+"%' AND id_problema IN (SELECT id FROM problema WHERE dificuldade = '"+dificuldade+"') order by hora_inicio asc", callback);
    } else if (nomeSessao == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id order by hora_inicio asc", callback);
    }
    
}

module.exports = function(){
	return SessaoDao;
}
