const mysql = require('mysql');
//连接mysql数据库的模块
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	passward: '',
	database: 'web1806',
	connectionLimit: 10
});
//导出连接数据库
module.exports = pool;