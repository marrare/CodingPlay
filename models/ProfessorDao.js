function ProfessorDao(connection){
	this._connection = connection;
}

ProfessorDao.prototype.buscarLogin = function(professor, callback){
	this._connection.query('select * from professor where email = "' + professor.email +'" and senha = "' + professor.senha + '"', callback);
}

module.exports = function(){
	return ProfessorDao;
}

