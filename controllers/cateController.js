//分页数据模块
const cateModule = require('../modules/cateModule')

module.exports = {
    //获取所有分类数据
    getAllCategories(req, res) {
        cateModule.getAllCategories((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '获取失败'
            })
            res.json({
                code: 0,
                des: "获取成功",
                data: data
            })
        })
    },
    //添加分类数据
    addCategory(req, res) {
        // console.log(req.body);
        cateModule.addCategory(req.body, (err) => {
            if (err) return res.json({
                code: 1,
                des: '添加失败'
            })
            res.json({
                code: 0,
                des: "添加成功"
            })
        })
    },
    //编辑分类数据
    editCategoryById(req, res) {
        // console.log(req.body);
        cateModule.editCategoryById(req.body, (err) => {
            if (err) return res.json({
                code: 1,
                des: '编辑失败'
            })
            res.json({
                code: 0,
                des: "编辑成功"
            })
        })
    },
    //删除单条分类数据
    delCategoryById(req, res) {
        //获取需要删除分类的id进行单条删除操作
        var id = req.query.id
        cateModule.delCategoryById(id, (err) => {
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            })
            res.json({
                code: 0,
                des: "删除成功"
            })
        })
    },
    //批量删除分类数据
    delsCategories(req, res) {
        // console.log(req.body);
        cateModule.delsCategories(req.body.ids, (err) => { //传入的第一个参数是req.body.ids的值
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            })
            res.json({
                code: 0,
                des: "删除成功"
            })
        })
    }
}