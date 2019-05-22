var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'us-cdbr-iron-east-02.cleardb.net',
		user : 'b68c33d5639188',
		password : '38223393',
		database : 'heroku_9236d8f17f82b9f',
        charset: "utf8_general_ci"
	});
}

module.exports = function () {
	return connMySQL;
}