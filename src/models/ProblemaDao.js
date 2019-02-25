function ProblemaDao(connection){
	this._connection = connection;
}

ProblemaDao.prototype.listaProblemasProfessor = function(callback){
    this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor order by nome_problema asc", callback);
}

ProblemaDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' order by nome_problema asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE'%"+nomeProfessor+"%' order by nome_problema asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE dificuldade = '"+dificuldade+"' order by nome_problema asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' order by nome_problema asc", callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND dificuldade = '"+dificuldade+"' order by nome_problema asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE'%"+nomeProfessor+"%' AND dificuldade = '"+dificuldade+"' order by nome_problema asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND dificuldade = '"+dificuldade+"' order by nome_problema asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade from professor A LEFT JOIN problema B ON A.id = B.id_professor order by nome_problema asc", callback);
    }
    
}

module.exports = function(){
	return ProblemaDao;
}
