var express = require('express');
var session = require('express-session');

var app = express();

// session
app.use(session({
    // name: 'session-name', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

// route
app.get('/', function(req, res, next) {
    console.log(req.session);
    if (req.session.isFirst || req.session.isFirst == 'true') {

        res.send("欢迎再一次访问");
    } else {
        req.session.isFirst = 'true';
        // res.cookie('isFirst', 'true', { maxAge: 60 * 1000, singed: true });
        res.send("欢迎第一次访问。");
    }
});

app.listen(3030, function() {
    console.log('http://127.0.0.1:3030')
});