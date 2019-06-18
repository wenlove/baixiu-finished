var express = require('express');
var querystring = require('querystring')

var app = express();
app.listen(3004, function() {
    console.log('http://127.0.0.1:3004')
});

// route
app.get('/', (req, res) => {
    // console.log(req.headers.cookie);
    var cook = querystring.parse(req.headers.cookie, '; ', '=')
    if (cook.isLogin || cook.isLogin == 'true') {

        res.end("welcome back");
    } else {

        res.writeHead(200, {
            'Set-Cookie': 'isLogin=true'
        })
        res.end("first");
    }
});