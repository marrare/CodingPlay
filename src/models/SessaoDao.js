function SessaoDao(connection){
	this._connection = connection;
}

SessaoDao.prototype.listaSessoes = function(callback){
    this._connection.query("select *, DATE_FORMAT(hora_inicio,'%Y/%m/%d  %H:%i') AS hora_inicio, DATE_FORMAT(hora_final,'%Y/%m/%d  %H:%i') AS hora_final from sessao A LEFT JOIN professor B ON A.id_professor = B.id order by hora_inicio asc", callback);
}

module.exports = function(){
	return SessaoDao;
}
