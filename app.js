//引入模块
const express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')

//引入路由模块
var router = require('./router')

//创建服务器对象
const app = express()

//静态资源托管
app.use('/uploads', express.static('uploads'))
app.use('/assets', express.static('assets'))

app.set('views', './views')

//设置模板引擎
app.set('view engine', 'ejs')

//监听端口
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})

//注册bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))

//注册session中间件
app.use(session({
    name: 'baixiu',
    secret: '自己添加的字',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {

    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
        // console.log(req.session);
        next()
    } else {
        res.redirect('/admin/login')
    }
})

//注册路由中间件
app.use(router)