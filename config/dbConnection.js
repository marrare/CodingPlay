var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'us-cdbr-iron-east-02.cleardb.net',
		user : 'be7258b02a5e94',
		password : '97f99d4d',
		database : 'heroku_63ededd1d9adf97',
        charset: "utf8_general_ci"
	});
}

module.exports = function () {
	return connMySQL;
}