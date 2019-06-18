module.exports = {
    //前台页面
    getIndexPage(req, res) {
        res.render('index')
    },
    getListPage(req, res) {
        res.render('list')
    },
    getDetailPage(req, res) {
        res.render('detail')
    },
    //后台管理页面
    getAdminIndexPage(req, res) {
        if (req.session.isLogin || req.session.isLogin == 'true') {
            res.render('admin/index')
        } else {
            //redirect: 重定向
            res.redirect('admin/login')
        }

    },
    getCategoriesPage(req, res) {
        res.render('admin/categories')
    },
    getCommentsPage(req, res) {
        res.render('admin/comments')
    },
    getLoginPage(req, res) {
        res.render('admin/login')
    },
    getNavMenusPage(req, res) {
        res.render('admin/nav-menus')
    },
    getPasswordResetPage(req, res) {
        res.render('admin/password-reset')
    },
    getPostAddPage(req, res) {
        res.render('admin/post-add')
    },
    getPostsPage(req, res) {
        res.render('admin/posts')
    },
    getProfilePage(req, res) {
        res.render('admin/profile')
    },
    getSettingsPage(req, res) {
        res.render('admin/settings')
    },
    getSlidesPage(req, res) {
        res.render('admin/slides')
    },
    getUsersPage(req, res) {
        res.render('admin/users')
    }
}