function AlunoDao(connection){
	this._connection = connection;
}
/*
AlunoDao.prototype.listaAlunos = function(callback){
	this._connection.query('select * from aluno', callback);
}

AlunoDao.prototype.salvarAluno = function(aluno, callback){
	this._connection.query('insert into aluno set ?',
		aluno, callback);
}

AlunoDao.prototype.Sessao = function(id_aluno, callback){
	console.log(id_noticia.id_noticia);
	this._connection.query('select * from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
}
*/
AlunoDao.prototype.salvar = function(aluno, callback){
	this._connection.query('insert into aluno set ? ', aluno, callback)
}

module.exports = function(){
	return AlunoDao;
}

