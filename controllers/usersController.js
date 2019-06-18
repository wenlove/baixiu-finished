//引入用户模块
const usersModule = require('../modules/usersModule')

module.exports = {
    login(req, res) {
        var obj = req.body
        usersModule.getUserByEmail(obj.email, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '服务器链接超时，请重试'
            })

            if (data) {
                if (data.password == obj.password) {
                    //记录登录的状态
                    req.session.isLogin = 'true';
                    req.session.currentUser = data;
                    // console.log(req.session);

                    res.json({
                        code: 0,
                        des: '登录成功'
                    })
                } else {
                    res.json({
                        code: 1,
                        des: '密码错误，请重新输入'
                    })
                }
            } else {
                res.json({
                    code: 1,
                    des: '邮箱错误，请重新输入'
                })
            }

        })

    },
    //获取所有用户数据
    getUsersList(req, res) {
        usersModule.getUsersList((err, data) => {
            if (err) return res.json({
                code: 1,
                des: '获取失败'
            });
            res.json({
                code: 0,
                des: '获取成功',
                data: data
            })
        })
    },
    //根据id获取用户信息
    getUserInfoById(req, res) {
        // console.log(req.session.currentUser.id);
        var id = req.session.currentUser.id;
        usersModule.getUserInfoById(id, (err, data) => {
            if (err) return res.json({
                code: 1,
                des: '查询失败'
            });
            res.json({
                code: 0,
                des: '查询成功',
                data: data
            })
        })
    },
    //添加用户数据
    addUsers(req, res) {
        req.body.status = 'nonactivated'
        usersModule.addUsers(req.body, (err) => {
            if (err) return res.json({
                code: 1,
                des: '添加失败'
            });
            res.json({
                code: 0,
                des: '添加成功'
            })
        })
    },
    //删除单条用户数据
    delUserById(req, res) {
        usersModule.delUserById(req.body.id, (err) => {
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            });
            res.json({
                code: 0,
                des: '删除成功'
            })
        })
    },
    //删除多条用户数据
    delsUsersById(req, res) {
        usersModule.delsUsersById(req.body.ids, (err) => {
            if (err) return res.json({
                code: 1,
                des: '删除失败'
            });
            res.json({
                code: 0,
                des: '删除成功'
            })
        })
    }
}