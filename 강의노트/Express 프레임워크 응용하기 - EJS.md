# Express 프레임워크 응용하기 - EJS

## 0. 디렉토리 구조

```javascript
express_tutorial/
├── data
│   └── user.json
├── node_modules
├── package.json
├── public
│   └── css
│       └── style.css
├── router
│   └── main.js
├── server.js
└── views
    ├── body.ejs
    ├── header.ejs
    └── index.ejs
```

- 이번 강좌에선 data/user.json이 추가되었고 views/ 내부 파일들이 변경되었습니다.



## 1. 의존 모듈 추가

- 지난 강좌에선 그저 페이지 라우팅만 다뤘지만,

- EJS엔진과 추가적으로 RESTful API, 그리고 세션을 다룰 것이므로 넣어줘야 할 의존 모듈들이 있다.

  - body-parser - POST 데이터 처리
  - express-session - 세션 관리

- 전 강좌에서 작성했던 package.json을 업데이트

  ```javascript
  {
    "name": "express-tutorial",
    "version": "1.0.0",
    "dependencies":
    {
      "express": "~4.13.1",
      "ejs": "~2.4.1"    ,
      "body-parser": "~1.14.2",
      "express-session": "~1.13.0"
    }
  }
  ```

- 그 후 다음 명령어를 입력해 모듈을 설치한다.

  ```shell
  $ npm install
  ```

- 추가한 모듈들을 server.js에서 불러온다.

  ```javascript
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var fs = require("fs")
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  
  
  var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000")
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
  ```

  - Express의 이전 버전에서는 cookie-parser 모듈도 불러와야했지만, 이젠 express-session 모듈이 직접 쿠키에 접근하므로 cookie-parser를 더이상 사용 할 필요가 없다.
  - 추가적으로, Node.js에 내장되어 있는 fs 모듈도 불러왔는데, 이는 나중에 파일을 열기 위함이다.
  - 그리고 원래 상단에 있던 router 코드를 아래로 내려주셔야 한다.
    - 해당 코드가 bodyParser 설정 아래부분에 있다면 제대로 작동하지 않는다.
    - 그리고 router에서 fs 모듈을 사용 할 수 있도록 인자로 추가해준다.



- session 부분에서의 값에 대해서 알아보자
  - secret - 쿠키를 임의로 변조하는 것을 방지하기 위한 sign 값이다. 원하는 값을 넣으면 된다.
  - resave - 세션을 언제나 저장할 지 (변경하지 않아도) 정하는 값이다. express-session documentation에서는 이 값을 false로 하는 것을 권장하고 필요에 따라 true로 설정한다.
  - saveUninitialized - uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미한다. Documentation에서 이 값을 true로 설정하는 것을 권장한다.



# 2. EJS 템플릿 엔진

- 템플릿 엔진이란, 템플릿을 읽어 엔진의 문법과 설정에 따라서 파일을 HTML 형식으로 변환시키는 모듈이다.
- Express에서 사용하는 인기있는 Jade 템플릿 엔진은 기존의 HTML에 비해 작성법이 완전 다른데, 그에 비해 EJS는 똑같은 HTML에서 <%%>를 사용하여 서버의 데이터를 사용하거나 코드를 실행 할 수 있다.
  - EJS에서는 두가지만 알면 된다.
  - <% 자바스크립트 %>
  - <% 출력 할 자바스크립트 객체 %>
- 2번에서는 자바스크립트 객체를 router에서 받아 올 수도 있다.



### VIEW로 데이터 넘기기

- 우선, 전 강좌에서 작성하였던 views/index.html 과 views/about.html을 삭제하시고,

- router/main.js를 다음과 같이 수정한다.

  ```javascript
  module.exports = function(app, fs)
  {
       app.get('/',function(req,res){
           res.render('index', {
               title: "MY HOMEPAGE",
               length: 5
           })
       });
  }
  ```

  - JSON 데이터를 render 메소드의 두번째 인자로 전달함으로써 페이지에서 데이터를 사용 가능하게 됩니다.

