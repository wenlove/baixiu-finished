const moment = require('moment')
const optionsModule = require('../modules/optionsModule')

module.exports = {
    //获取所有导航数据
    getMenusList(req, res) {
        optionsModule.getMenusList((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            });

            // console.log(data);
            res.json({
                code: 0,
                des: '查询成功',
                data: JSON.parse(data)
            })
        })
    },
    //添加导航菜单
    addMenu(req, res) {
        // console.log(req.body);
        optionsModule.addMenu(req.body, (err) => {
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
    //删除单条导航数据
    delMenuByIndex(req, res) {
        // console.log(req.body);
        optionsModule.delMenuByIndex(req.body, (err) => {
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
    //删除多条导航数据
    delsMenusByIndex(req, res) {
        var arr = req.body.indexs.split(',');
        // console.log(arr);
        optionsModule.delsMenusByIndex(arr, (err) => {
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
    //获取轮播图数据
    getSliderList(req, res) {
        optionsModule.getSliderList((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            });

            // console.log(data);
            res.json({
                code: 0,
                des: '查询成功',
                data: JSON.parse(data)
            })
        })
    },
    //添加轮播图数据
    addSliderList(req, res) {
        optionsModule.addSliderList(req.body, (err) => {
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
    //删除单条轮播图数据
    delSliderlist(req, res) {
        // var index = req.body.index
        // console.log(req.body)
        optionsModule.delSliderlist(req.body, (err) => {
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
    //删除多条轮播图数据
    delsSlidersByIndex(req, res) {
        // console.log(req.body)
        optionsModule.delsSlidersByIndex(req.body.indexs, (err) => {
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
    //获取最新评论
    getCommentsList(req, res) {
        // console.log(req.query);
        var obj = req.query;
        optionsModule.getCommentsList(obj, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            });

            // console.log(data.data[0]);
            for (var i = 0; i < data.data.length; i++) {
                data.data[i].created = moment(data.data[i].created).format('YYYY-MM-DD HH:mm')
            }
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    },
    //删除单条评论数据
    delCommentById(req, res) {
        // console.log(req.body);
        optionsModule.delCommentById(req.body.id, (err) => {
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
    //删除多条评论数据
    delsCommentsById(req, res) {
        // console.log(req.body);
        optionsModule.delsCommentsById(req.body.ids, (err) => {
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
    //获取文章数据
    getPosts(req, res) {
        optionsModule.getPosts((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            });

            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                data[i].created = moment(data[i].created).format('YYYY-MM-DD HH:mm')
            }
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    }
}