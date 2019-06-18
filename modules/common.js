var mysql = require('mysql')

//创建数据库对象
var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})

module.exports = conn