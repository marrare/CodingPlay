function ParticipaSessaoDao(connection){
	this._connection = connection;
}

ParticipaSessaoDao.prototype.salvar = function(participaSessao, callback){
    console.log(participaSessao);
	this._connection.query("insert into participa_sessao (id_participante,id_sessao	) values((select id from aluno where codigo_pusher like '%"+participaSessao.id_participante+"%'),'"+participaSessao.id_sessao+"')", callback);
}

module.exports = function(){
	return ParticipaSessaoDao;
}

