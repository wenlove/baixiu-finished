var conn = require('./common')

//链接数据库请求数据
// conn.connect()

module.exports = {
    //获取所有分类数据
    getAllCategories(callback) {
        var sql = 'select * from categories'
        conn.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null, results)
        })
    },
    //添加分类数据
    addCategory(obj, callback) {
        var sql = 'insert categories values(null,?,?)'
        conn.query(sql, [obj.slug, obj.name], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    //编辑分类数据
    editCategoryById(obj, callback) {
        var { id } = obj
        delete obj.id
        var sql = 'update categories set ? where id=?'
        conn.query(sql, [obj, id], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    //删除单条分类数据
    delCategoryById(id, callback) {
        var sql = 'delete from categories where id=?'
        conn.query(sql, [id], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    //批量删除分类数据
    delsCategories(ids, callback) {
        // console.log(ids);
        var sql = `delete from categories where id in (${ids})`
        conn.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    }
}