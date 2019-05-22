const crypto = require('crypto');

function AlunoDao(connection){
	this._connection = connection;
}

AlunoDao.prototype.salvar = function(aluno, callback){
    
    var senhaCriptografada = crypto.createHash("sha256").update(aluno.senha).digest("hex");
    aluno.senha = senhaCriptografada;

	this._connection.query('insert into aluno set ? ', aluno, callback);
}
AlunoDao.prototype.buscarLogin = function(aluno, callback){
    
    var senhaCriptografada = crypto.createHash("sha256").update(aluno.senha).digest("hex");
    aluno.senha = senhaCriptografada;
    
	this._connection.query('select * from aluno where email = "' + aluno.email +'" and senha = "' + aluno.senha + '"', callback);
}

AlunoDao.prototype.listaAlunosPendentes = function(callback){
	this._connection.query('SELECT * FROM aluno WHERE situacao = 0', callback);
}

AlunoDao.prototype.ativarContaAlunos = function(id_aluno,callback){
	this._connection.query("UPDATE aluno SET situacao = 1 WHERE id = '"+id_aluno+"'", callback);
}

AlunoDao.prototype.trocarSenha = function(aluno, callback){
    
    var senhaCriptografada = crypto.createHash("sha256").update(aluno.senha).digest("hex");
    aluno.senha = senhaCriptografada;

	this._connection.query("update aluno set senha = '"+senhaCriptografada+"' where email = '"+aluno.email+"' and id = '"+aluno.id+"'", callback);
}

module.exports = function(){
	return AlunoDao;
}

