const postsModule = require('../modules/postsModule')
const moment = require('moment')

module.exports = {
    //获取所有文章数据、带分页、筛选判断
    getPostsList(req, res) {
        // console.log(req.query);
        postsModule.getPostsList(req.query, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            })

            for (var i = 0; i < data.data.length; i++) {
                data.data[i].created = moment(data.data[i].created).format('YYYY-MM-DD HH:mm:ss')
            }
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    },
    // //获取所有文章数据
    // getPosts(req, res) {
    //     postsModule.getPosts((err, data) => {
    //         if (err) return res.json({
    //             code: 1,
    //             des: '查询失败'
    //         })
    //         res.json({
    //             code: 0,
    //             des: '查询成功',
    //             data: data
    //         })
    //     })
    // },
    // 删除单条文章数据
    delPostsList(req, res) {
        // console.log(req.body);
        postsModule.delPostsList(req.body.id, (err) => {
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            })
            res.json({
                code: 0,
                des: '删除成功'
            })
        })
    },
    //批量删除文章数据
    delsPostsLists(req, res) {
        // console.log(req.body);
        postsModule.delsPostsLists(req.body.ids, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            })
            res.json({
                code: 0,
                des: '删除成功'
            })
        })
    },
    //文章新增
    addPost(req, res) {
        var obj = req.body;
        // console.log(req.body);
        obj.id = null;
        //用户浏览数量
        obj.views = 0;
        //用户点赞数量
        obj.likes = 0;
        //用户id
        obj.user_id = req.session.currentUser.id
        postsModule.addPost(obj, (err) => {
            if (err) return res.json({
                code: 1,
                des: '添加失败'
            })
            res.json({
                code: 0,
                des: '添加成功'
            })
        })
    },
    //根据id查询文章数据
    getPostById(req, res) {
        var id = req.query.id
        postsModule.getPostById(id, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            })
            data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    },
    // 根据id编辑文章数据
    editPostById(req, res) {
        postsModule.editPostById(req.body, (err) => {
            if (err) return res.json({
                code: 1,
                des: '编辑失败'
            })
            res.json({
                code: 0,
                des: '编辑成功'
            })
        })
    }
}