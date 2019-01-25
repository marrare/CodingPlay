function TestDao(connection){
	this._connection = connection;
}

TestDao.prototype.listaAlunos = function(callback){
	this._connection.query('select * from aluno', callback);
}

TestDao.prototype.salvarAluno = function(aluno, callback){
	console.log(aluno.id, aluno.nome, aluno.turno);
	this._connection.query('insert into aluno set ?',
		aluno, callback);
}

TestDao.prototype.Sessao = function(id_aluno, callback){
	console.log(id_noticia.id_noticia);
	this._connection.query('select * from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
}

TestDao.prototype.salvarNoticia = function(noticia, callback){
	this._connection.query('insert into noticias set ? ', noticia, callback)
}

module.exports = function(){
	return TestDao;
}

