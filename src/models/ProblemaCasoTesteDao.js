const crypto = require('crypto');

function ProblemaCasoTesteDao(connection){
	this._connection = connection;
}

ProblemaCasoTesteDao.prototype.buscarCasosPorProblema = function(idProblema, callback){
	this._connection.query("select * from problema_caso_teste where id_problema = ?", idProblema, callback);
}


module.exports = function(){
	return ProblemaCasoTesteDao;
}

