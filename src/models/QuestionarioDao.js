function QuestionarioDao(connection){
	this._connection = connection;
}

QuestionarioDao.prototype.listarPerguntas = function(callback){
	this._connection.query("select * from perguntas_questionario", callback);
}

QuestionarioDao.prototype.buscarRespostaUsuario = function(valor,callback){
	this._connection.query("SELECT COUNT(resposta) AS qtd_resposta FROM respostas_questionario WHERE id_participa_sessao IN(SELECT id from participa_sessao WHERE id_participante = ? AND id_sessao = ?)", [valor.id_participante,valor.id_sessao], callback);
}

QuestionarioDao.prototype.salvarResposta = function(valor,callback){
	this._connection.query("INSERT INTO respostas_questionario(id_pergunta,id_participa_sessao,resposta) VALUE(?,?,?)", [valor.id_pergunta,valor.id_participa_sessao,valor.resposta], callback);
}

module.exports = function(){
	return QuestionarioDao;
}

