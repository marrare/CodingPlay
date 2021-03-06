function ProblemaDao(connection){
	this._connection = connection;
}

ProblemaDao.prototype.salvar = function(problema, callback){
	this._connection.query("insert into problema (id_professor,nome_problema,dificuldade,desc_problema,quantidade_entradas) values(?,?,?,?,?)", [problema.id_professor,problema.nome_problema,problema.dificuldade,problema.desc_problema,problema.entrada_quantidade], callback);
}

ProblemaDao.prototype.listaProblemasProfessor = function(callback){
    this._connection.query("select B.id,B.id_Professor,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE B.situacao = 1 order by id asc", callback);
}

ProblemaDao.prototype.filtrar = function(sessao, callback){
    
    var nomeProblema = sessao.problema != null ? sessao.problema : "";
    var nomeProfessor = sessao.professor != null ? sessao.professor : "";
    var dificuldade = sessao.dificuldade != null ? sessao.dificuldade : "";
    
    if(nomeProblema != "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE ? AND B.situacao = 1 order by id asc", "%"+nomeProblema+"%", callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE ? AND B.situacao = 1 order by id asc", "%"+nomeProfessor+"%", callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE dificuldade = ? AND B.situacao = 1 order by id asc", dificuldade, callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE ? AND nome LIKE ? AND B.situacao = 1 order by id asc", ["%"+nomeProblema+"%","%"+nomeProfessor+"%"], callback);
    } else if (nomeProblema != "" && nomeProfessor == "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE ? AND dificuldade = ? AND B.situacao = 1 order by id asc", ["%"+nomeProblema+"%",dificuldade], callback);
    } else if (nomeProblema == "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome LIKE ? AND dificuldade = ? AND B.situacao = 1 order by id asc", ["%"+nomeProfessor+"%",dificuldade], callback);
    } else if (nomeProblema != "" && nomeProfessor != "" && dificuldade != "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE nome_problema LIKE ? AND nome LIKE ? AND dificuldade = ? AND B.situacao = 1 order by id asc", ["%"+nomeProblema+"%","%"+nomeProfessor+"%",dificuldade], callback);
    } else if (nomeProblema == "" && nomeProfessor == "" && dificuldade == "") {
        this._connection.query("select B.id,A.nome,B.nome_problema,B.dificuldade,B.desc_problema from professor A LEFT JOIN problema B ON A.id = B.id_professor WHERE B.situacao = 1 order by id asc", callback);
    }
    
}

ProblemaDao.prototype.deletar = function(idProblema, callback){
	this._connection.query("update problema set situacao = 0 where id = ?", idProblema, callback);
}

ProblemaDao.prototype.salvarCasoDeTeste = function(casoTeste, callback){
	this._connection.query('insert into problema_caso_teste set ? ', casoTeste, callback);
}

module.exports = function(){
	return ProblemaDao;
}
