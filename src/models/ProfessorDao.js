const crypto = require('crypto');

function ProfessorDao(connection){
	this._connection = connection;
}

ProfessorDao.prototype.buscarLogin = function(professor, callback){
	
	let senhaCriptografada = crypto.createHash("sha256").update(professor.senha).digest("hex");
	this._connection.query('select * from professor where email = ? and senha = ?', [professor.email,senhaCriptografada], callback);
}

ProfessorDao.prototype.buscarLoginSemSenha = function(professor, callback){
	this._connection.query('select * from professor where email = ?', professor.email, callback);
}

ProfessorDao.prototype.BuscarPorId = function(id_professor, callback){
	this._connection.query("select * from professor where id = ?", id_professor, callback);
}

ProfessorDao.prototype.salvar = function(professor, callback){
	this._connection.query("insert into professor(codigo_pusher,matricula,nome,email) values(?,?,?,?)", [professor.codigo_pusher,professor.matricula,professor.nome,professor.email], callback);
}

ProfessorDao.prototype.trocarSenha = function(professor, callback){
    
    let senhaCriptografada = crypto.createHash("sha256").update(professor.senha).digest("hex");
	this._connection.query("update professor set senha = ? where email = ? and id = ?", [senhaCriptografada,professor.email,professor.id], callback);
}

module.exports = function(){
	return ProfessorDao;
}

