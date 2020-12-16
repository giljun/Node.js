var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");


app.set('views', __dirname + '/views');         // 서버가 읽을 수 있도록 HTML의 위치를 정의해준다.
app.set('view engine', 'ejs');                  // 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정한다.
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);