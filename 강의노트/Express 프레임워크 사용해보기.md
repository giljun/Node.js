# Express 프레임워크 사용해보기

- NodeJS의 웹프레임워크를 사용하면 간편하게 웹서버를 구축할 수 있다.
- 웹프레임워크 종류는 대표적으로 Express, Koa, Hapi 등이 있다.



## 1. 디렉토리 구조 이해하기

```javascript
express_tutorial/
├── package.json
├── public
│   └── css
│   └── style.css
├── router
│   └── main.js
├── server.js
└── views
 ├── about.html
 └── index.html
```



## 2. package.json 파일 생성

```json
{
  "name": "express-tutorial",
  "version": "1.0.0",
  "dependencies": 
  {
    "express": "~4.13.1",
    "ejs": "~2.4.1"    
  }
}
```



## 2.1. NPM으로 Dependency (의존 패키지) 설치

- package.json을 생성하였다면, 다음 명령어로 의존패키지들을 설치

  ```shell
  $ npm install
  ```



## 3. Express 서버 생성

- 저희는 package.json 파일을 생성했고, 의존 패키지들도 모두 설치

  ```javascript
  const { request } = require("express");
  
  var express = require('express');
  var app = express();
  var server = app.listen(3000, function () {
      console.log("Express server has started on port 3000")
  })
  ```

  - 아무것도 하지 않는 웹서버이다.
  - 실행시키면, 포트 3000으로 웹서버를 열고, 페이지에 들어가면 Cannot GET / 이라는 텍스트가 나타난다.
    - Router를 아직 정의하지 않았음



## 4. Router로 Request 처리하기

- 서버를 돌리기에 필요한 모든 것들은 갖추었음.

- 브라우저에서 Request가 왔을때, 서버에서 어떤 작업을 할 지 Router를 통하여 설정

  ```javascript
  app.get('/', function(req, res){
      res.send("Hello World");
  })
  ```

  



## 정적 파일 (Static files) 다루기

- 정적 파일이란? HTML에서 사용되는 .js 파일, css 파일, image 파일 등을 가르킵니다.

- 서버에서 정적파일을 다루기 위해선, express.static() 메소드를 사용하면 된다.

- public/css 디렉토리를 만드시고, 그 안에 style.css 파일을 생성한다.

  ```css
  body{
  	background-color: black;
  	color: white;
  }
  ```

- 

