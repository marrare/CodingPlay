function ProfessorDao(connection){
	this._connection = connection;
}

ProfessorDao.prototype.buscarLogin = function(professor, callback){
	this._connection.query('select * from professor where email = "' + professor.email +'" and senha = "' + professor.senha + '"', callback);
}

ProfessorDao.prototype.BuscarPorId = function(id_professor, callback){
    console.log(id_professor);
	this._connection.query("select * from professor where id = '"+ id_professor +"'", callback);
}

module.exports = function(){
	return ProfessorDao;
}

