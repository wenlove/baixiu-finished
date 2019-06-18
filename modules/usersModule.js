var conn = require('./common')

conn.connect()

module.exports = {
    getUserByEmail(email, callback) {
        var sql = 'select * from users where email=?'
        conn.query(sql, [email], (err, results) => {
            // console.log(results);
            if (err) return callback(err)
            callback(null, results[0])
        })
    },
    //获取所有用户数据
    getUsersList(callback) {
        var sql = 'select * from users'
        conn.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results)
        })
    },
    //根据id查询用户数据
    getUserInfoById(id, callback) {
        var sql = `select * from users where id =${id}`
        conn.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results)
        })
    },
    //添加用户数据
    addUsers(obj, callback) {
        console.log(obj);
        var sql = 'insert into users set ?';
        // var sql = 'insert into posts set ?'
        conn.query(sql, obj, (err, results) => {
            if (err) return callback(err);
            callback(null)
        })
    },
    //删除单条用户数据
    delUserById(id, callback) {
        var sql = `delete from users where id = ${id}`
        conn.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null)
        })
    },
    //删除多条用户数据
    delsUsersById(ids, callback) {
        var sql = `delete from users where id in (${ids})`
        conn.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null);
        })
    }

}