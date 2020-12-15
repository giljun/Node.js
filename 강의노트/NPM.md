# NPM 

- Node Package Manager (NPM) 은 두가지의 주요 기능을 지니고 있습니다.
- NPMSearch에서 탐색 가능한 Node.js 패키지 / 모듈 저장소
- Node.js 패키지 설치 및 버전 / 호환성 관리를 할 수 있는 커맨드라인 유틸리티



## NPM Version

```shell
$ npm --version
```



## NPM Version Update

``` shell
$ sudo npm install npm -g
```

- NPM에서 일부 패키지를 설치할 때, Python을 요구하므로 호환성을 맞추기 위하여 파이썬 런타임도 설치



## NPM을 사용하여 모듈 설치

```shell
npm install <모듈 이름>

$ npm install express

var express = require('express');
```



## Global vs Local module Install

- 기본적으로 npm은 모듈을 로컬모드로 설치

- 로컬모드란, 패키지를 명령어를 실행한 디렉토리 안에 있는 node_modules에 설치하는 것을 의미

- 글로벌 설치는 시스템 디렉토리에 설치하는 것을 의미한다.

  - 현재 경로가 아닌 /usr/lib/node_modules에 모듈을 설치합니다.

  - 시스템에 저장하므로, 루트 계정이 아니라면 앞에 sudo를 붙여주어야 한다.

  - 글로벌 모드로 설치하였을 때는, node 어플리케이션에서 바로 require 할 수는 없다.

  - 단, 다음처럼 npm link 명령어를 입력하면, 해당 모듈을 불러올 수 있다.

    ```shell
    $ npm install -g express
    $ cd [local path]/project
    $ npm link express
    ```



## package.json

- package.json은 노드 어플리케이션 / 모듈의 경로에 위치해 있으며, 패키지의 속성을 정의

- 다음은 express로 프로젝트를 생성했을 때, 생성되는 package.json

  ```js
  {
    "name": "workspace",
    "version": "1.0.0",
    "description": "node.js project",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/giljun/Node.js.git"
    },
    "keywords": [
      "node.js"
    ],
    "author": "GilJun",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/giljun/Node.js/issues"
    },
    "homepage": "https://github.com/giljun/Node.js#readme",
    "dependencies": {
      "express": "^4.17.1"
    }
  }
  ```

- 해당 파일은 프로젝트가 의존하는 모듈과 모듈벼전의 정보를 담고 있다.

- package.json에 관한 자세한 내용은 감성 프로그래밍 블로그에서 읽어볼 수 있다.

  [감성 프로그래밍 블로그](https://programmingsummaries.tistory.com/385)



## 모듈 제거

```shell
$ npm uninstall express
```



## 모듈 업데이트

```shell
$ npm update express
```



## 모듈 검색

```shell
$ npm search express
```

- 해당 명령어는 처음 이용할 때, 메모리를 굉장히 많이 잡아먹는다.
- 클라우드 IDE를 사용하거나 서버에 램이 1G 정도라면 매우 오래걸리거나 에러가 발생
- 그럴 경우엔 NPMSearch에서 검색을 하면 된다.















