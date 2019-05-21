var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'codingplay',
        charset: "utf8_general_ci"
	});
}

module.exports = function () {
	return connMySQL;
}