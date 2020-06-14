function EquipeDao(connection){
	this._connection = connection;
}

EquipeDao.prototype.listaEquipe = function(callback){
    this._connection.query("select * from equipe;", callback);
}

module.exports = function(){
	return EquipeDao;
}
