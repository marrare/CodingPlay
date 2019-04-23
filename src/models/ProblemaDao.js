function ProblemaDao(connection){
	this._connection = connection;
}

ProblemaDao.prototype.salvar = function(problema, callback){
	this._connection.query('insert into problema set ? ', problema, callback);
}

ProblemaDao.prototype.listaProblemasProfessor = function(callback){
    this._connection.query("select B.id,B.id_Professor,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE B.situacao = 1 order by id asc", callback);
}

ProblemaDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE'%"+nomeProfessor+"%' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE dificuldade = '"+dificuldade+"' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND dificuldade = '"+dificuldade+"' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE'%"+nomeProfessor+"%' AND dificuldade = '"+dificuldade+"' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE'%"+nomeProblema+"%' AND nome LIKE'%"+nomeProfessor+"%' AND dificuldade = '"+dificuldade+"' AND B.situacao = 1 order by id asc", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE B.situacao = 1 order by id asc", callback);
    }
    
}

ProblemaDao.prototype.deletar = function(idProblema, callback){
	this._connection.query("update problema set situacao = 0 where id = "+idProblema+"", callback);
}

module.exports = function(){
	return ProblemaDao;
}
