function ParticipaSessaoDao(connection){
	this._connection = connection;
}

ParticipaSessaoDao.prototype.salvar = function(participaSessao, callback){
	this._connection.query("insert into participa_sessao (id_participante,id_sessao) values((select id from aluno where codigo_pusher like ?),?)", ["%"+participaSessao.id_participante+"%",participaSessao.id_sessao], callback);
}

ParticipaSessaoDao.prototype.buscarPorIdSessao = function(id_sessao, callback){
	this._connection.query("select nome,id from aluno where id IN(select id_participante from participa_sessao where id_sessao = ?)", id_sessao, callback);
}

ParticipaSessaoDao.prototype.buscarUsuarioParticipaSessao = function(valor, callback){
	this._connection.query("select id from participa_sessao where id_sessao = ? AND id_participante = ?", [valor.id_sessao,valor.id_participante], callback);
}

module.exports = function(){
	return ParticipaSessaoDao;
}

