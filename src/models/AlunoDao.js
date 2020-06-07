const crypto = require('crypto');

function AlunoDao(connection){
	this._connection = connection;
}

AlunoDao.prototype.salvar = function(aluno, callback){
    
    aluno.senha = crypto.createHash("sha256").update(aluno.senha).digest("hex");
	this._connection.query('insert into aluno set ? ', aluno, callback);
}
AlunoDao.prototype.buscarLogin = function(aluno, callback){

    let senhaCriptografada = crypto.createHash("sha256").update(aluno.senha).digest("hex");
	this._connection.query('select * from aluno where email = ? and senha = ?', [aluno.email,senhaCriptografada], callback);
}

AlunoDao.prototype.listaAlunosPendentes = function(callback){
	this._connection.query('SELECT * FROM aluno WHERE situacao = 0', callback);
}

AlunoDao.prototype.ativarContaAlunos = function(id_aluno,callback){
	this._connection.query("UPDATE aluno SET situacao = 1 WHERE id = ?", id_aluno, callback);
}

AlunoDao.prototype.trocarSenha = function(aluno, callback){
    
    let senhaCriptografada = crypto.createHash("sha256").update(aluno.senha).digest("hex");
	this._connection.query("update aluno set senha = ? where email = ? and id = ?", [senhaCriptografada,aluno.email,aluno.id], callback);
}

module.exports = function(){
	return AlunoDao;
}