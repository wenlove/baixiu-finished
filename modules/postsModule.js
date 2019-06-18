const connection = require('./common')

module.exports = {
    // 获取所有文章数据
    getPostsList(obj, callback) {
        var sql = `select posts.id,posts.title,users.nickname,categories.name,posts.created,posts.status
                from posts 
                inner join users on posts.user_id = users.id
                inner join categories on posts.category_id = categories.id 
                where 1=1 `

        //判断是否筛选分类、状态
        if (obj.category_id) {
            sql += ` and posts.category_id ='${obj.category_id}' `
        }
        if (obj.status) {
            sql += ` and posts.status ='${obj.status}' `
        }
        sql += ` order by posts.id desc
                limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}`

        connection.query(sql, (err, results) => {
            sql = 'select count(*) total from posts where 1=1 '

            //判断是否筛选分类、状态
            if (obj.category_id) {
                sql += ` and posts.category_id ='${obj.category_id}' `
            }
            if (obj.status) {
                sql += ` and posts.status ='${obj.status}' `
            }
            if (err) return callback(err)
            connection.query(sql, (err1, results1) => {
                callback(null, { data: results, count: results1[0].total })
            })
        })
    },
    // //获取所有文章数据
    // getPosts(callback) {
    //     var sql = 'select * from posts'
    //     connection.query(sql, (err, results) => {
    //         if (err) return callback(err)
    //         callback(null, results)
    //     })
    // },
    //文章新增
    addPost(obj, callback) {
        var sql = 'insert into posts set ?'
        connection.query(sql, [obj], (err, results) => {
            // console.log(err);
            if (err) return callback(err)
            callback(null)
        })
    },
    //删除单条文章数据
    delPostsList(id, callback) {
        var sql = 'delete from posts where id=?'
        connection.query(sql, [id], (err, results) => {
            // console.log(err);
            if (err) return callback(err)
            callback(null)
        })
    },
    //删除多条文章数据
    delsPostsLists(ids, callback) {
        var sql = `delete from posts where id in (${ids})`
        connection.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    },
    //根据id查询文章数据
    getPostById(id, callback) {
        var sql = 'select * from posts where id=' + id
        connection.query(sql, (err, results) => {
            if (err) return callback(err)
            callback(null, results[0])
        })
    },
    //根据id编辑文章数据
    editPostById(obj, callback) {
        var sql = 'update posts set ? where id = ?'
        connection.query(sql, [obj, obj.id], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
    }
}