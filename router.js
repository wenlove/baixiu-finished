//引入模块
const express = require('express')

//引入控制器模块
const pagesController = require('./controllers/pagesController')
const usersController = require('./controllers/usersController')
const cateController = require('./controllers/cateController')
const postsController = require('./controllers/postsController')
const uploadController = require('./controllers/uploadController')
const optionsController = require('./controllers/optionsController')

//创建路由对象
const router = express.Router()

//前台管理页面
router.get('/', pagesController.getIndexPage)
    .get('/list', pagesController.getListPage)
    .get('/detail', pagesController.getDetailPage)
    // 后台管理页面
    .get('/admin', pagesController.getAdminIndexPage)
    .get('/admin/categories', pagesController.getCategoriesPage)
    .get('/admin/comments', pagesController.getCommentsPage)
    .get('/admin/login', pagesController.getLoginPage)
    .get('/admin/nav-menus', pagesController.getNavMenusPage)
    .get('/admin/password-reset', pagesController.getPasswordResetPage)
    .get('/admin/post-add', pagesController.getPostAddPage)
    .get('/admin/posts', pagesController.getPostsPage)
    .get('/admin/profile', pagesController.getProfilePage)
    .get('/admin/settings', pagesController.getSettingsPage)
    .get('/admin/slides', pagesController.getSlidesPage)
    .get('/admin/users', pagesController.getUsersPage)
    //登录页面
    .post('/login', usersController.login)
    //用户页面业务处理路由
    .get('/getUsersList', usersController.getUsersList)
    .get('/getUserInfoById', usersController.getUserInfoById)
    .post('/addUsers', usersController.addUsers)
    .post('/delUserById', usersController.delUserById)
    .post('/delsUsersById', usersController.delsUsersById)
    //分类页面业务处理路由
    .get('/getAllCategories', cateController.getAllCategories)
    .post('/addCategory', cateController.addCategory)
    .post('/editCategoryById', cateController.editCategoryById)
    .get('/delCategoryById', cateController.delCategoryById)
    .post('/delsCategories', cateController.delsCategories)
    //文章页面业务处理路由
    .get('/getPostsList', postsController.getPostsList)
    // .get('/getPosts', postsController.getPosts)
    .post('/delPostsList', postsController.delPostsList)
    .post('/addPost', postsController.addPost)
    .post('/delsPostsLists', postsController.delsPostsLists)
    .get('/getPostById', postsController.getPostById)
    .post('/editPostById', postsController.editPostById)
    // 下面是导航菜单项路由配置
    .get('/getMenusList', optionsController.getMenusList)
    .get('/getPosts', optionsController.getPosts)
    .post('/addMenu', optionsController.addMenu)
    .post('/delMenuByIndex', optionsController.delMenuByIndex)
    .post('/delsMenusByIndex', optionsController.delsMenusByIndex)
    //轮播图路由配置
    .get('/getSliderList', optionsController.getSliderList)
    .post('/addSliderList', optionsController.addSliderList)
    .post('/delSliderlist', optionsController.delSliderlist)
    .post('/delsSlidersByIndex', optionsController.delsSlidersByIndex)
    //评论相关路由处理
    .get('/getCommentsList', optionsController.getCommentsList)
    .post('/delCommentById', optionsController.delCommentById)
    .post('/delsCommentsById', optionsController.delsCommentsById)
    //文件上传相关处理路由
    .post('/uploadFile', uploadController.uploadFile)


module.exports = router