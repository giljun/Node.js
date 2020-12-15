# HTTP Module

## HTTP 서버 예제

```html
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
       	Hello World!
    </body>
</html>
```

```javascript
var http = require('http');
var fs = require('fs');
var url = require('url');

// 서버 생성
http.createServer(function (request, response) {
    // URL 뒤에 있는 디렉토리 / 파일이름 파싱
    var pathname = url.parse(request.url).pathname;

    console.log("Request for " + pathname + " received.");

    // 파일 이름이 비어있다면 index.html로 설정
    if (pathname == "/") {
        pathname = "/index.html";
    }

    // 파일을 읽기
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // 페이지를 찾을 수 없음
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            // 페이지를 찾음
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            response.writeHead(200, { 'Content-Type': 'text/html' });

            // 파일을 읽어와서 responseBody에 작성
            response.write(data.toString());
        }
        // responseBody 전송
        response.end();
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
```

```javascript
var http = require('http');

// HTTPRequest의 옵션 설정
var options = {
    host: 'localhost',
    port: '8081',
    path: '/index.html'
};

// 콜백 함수로 Response를 받아온다.
var callback = function (response) {
    // response 이벤트가 감지되면 데이터를 body에 받아온다.
    var body = '';
    response.on('data', function (data) {
        body += data;
    });

    // end 이벤트가 감지되면, 데이터 수신을 종료하고 내용을 출력한다.
    response.on('end', function () {
        // 데이터 수신 완료
        console.log(body);
    });
}

// 서버에 HTTP Request를 날린다.
var req = http.request(options, callback);
req.end();

```

