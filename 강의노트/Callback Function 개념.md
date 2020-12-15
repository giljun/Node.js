# Callback Function 개념

## Callback Function이란

- 자바스크립트에서 함수는 일급 객체입니다.

- 즉, 함수는 Object 타입이며, 다른 일급객체와 똑같이 사용 될 수 있다.

  - String, Array, Number, 등등 ...

- function 자체가 객체이므로 변수 안에 담을 수도 있다.

- 인수로서 다른 함수에 전달 해 줄수도 있다.

- 함수에서 만들어질 수도 있고, 반환 될 수도 있다.

- Callback function은, 특정 함수에 매개변수로서 전달된 함수를 지칭한다.

- Callback function은 그 함수를 전달받은 함수 안에서 호출하게 된다.

- 이해를 돕기 위한 jQuery에서 사용된 callback function 예제

  ```js
  // click 메소드의 인수가 변수가 아닌 함수
  // click 메소드의 인수가 바로 callback 함수
  $ ("#btn_1").click(fucntion(){
  	alert("Btn 1 Clicked");
  });
  ```

  - 설명 : Click 메소드에 이름이 없는 callback function을 인수로 전달
  - jQuery 안의 click 메소드에서는, 마우스 클릭이 있으면 callback function을 호출하게 설정



## Callback function을 쓰는 이유

- Node.js에선 Callback 함수가 매우 많이 사용

- 콜백의 개념이 어느정도 이해가 됐다면, Node.js 에서의 예제를 살펴본다.

- 비동기 처리를 위해서 사용하기 떄문이다.

  - 병렬적 실행을 의미

  ```javascript
  function getData() {
      var tableData;
      $.get('http://domain.com/products/1', function(response){
          tableData = response;
      });
      return tableData;
  }
  
  console.log(getData()); // undefined
  ```

  - undefined가 찍히는 이유
    - ajax로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 return tableData;를 실행했기 때문이다.
  - 이러한 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것을 **비동기 처리**라고 한다.
  - 비동기 처리 문제 해결 방안

  ```javascript
  function getData(callbackFunc){
      $.get('http://domain.com/products/1', function(response){
          callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 전달함.
      });
  }
  
  getData(function (tableData){
      console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
  });
  ```



## Callback Hell

- 콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때, 발생하는 문제

  ```javascript
  $.get('url', function (response){
      parseValue(response, function (id) {
          auth(id, function (result){
              display(result, function (text)}{
                      console.log(text);
              });
          });
      });
  });
  ```

  - 웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있다.
  - 만약 이 모든 과정을 비동기로 처리해야 한다고 하면, 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 된다.
  - 이러한 코드 구조는 가독성이 떨어지고, 로직을 변경하기도 어렵다.
  - 이러한 구조를 콜백 지옥이라고 한다.

- 일반적으로 콜백 지옥을 해결하는 방법은 Promise나 Async를 사용하는 방법이 있다.

  - 만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해주면 된다.

    ```javascript
    function parseValueDone(id){
        auth(id, authDone);
    }
    function authDone(result){
        display(result, displayDone);
    }
    function displayDone(text){
        console.log(text);
    }
    $.get('url', function(response){
        parseValue(response, parseValueDone);
    })
    ```



## Blocking Code

- Callback 함수가 사용되지 않은, Blocking Code 예제
- 어떤 작업을 실행하고 기다리면서 코드가 막히게 된다.



## Non-Blocking Code

- 위 예제와는 반대로 함수가 실행될 때, 프로그램이 함수가 끝날 때까지 기다리지 않고, 바로 그 아래에 있는 코드들을 실행하게 된다.
- 모든 Node 어플리케이션의 비동기식 함수에서는 첫번째 매개변수로는 error를, 마지막 매개변수로는 callback 함수를 받는다.
- fs.readFile() 함수는 비동기식으로 파일을 읽는 함수이고, 도중에 에러가 밯생하면 err 객체에 에러 내용을 담고 그렇지 않을 시에는 파일 내용을 다 읽고 출력한다.
- readFile() 메소드가 실행 된 후, 프로그램이 메소드가 끝날 때까지 대기하지 않고, 곧바로 다음 명령어로 진행하였기 때문에, 프로그램이 끝났다는 메세지를 출력한 후에, 텍스트 내용을 출력한다.
  - 실제로 프로그램이 끝나는 것은 아니다.
  - 프로그램이 실질적으로 끝난건 텍스트가 출력된 후입니다.
  - 만약에 readFile() 다음에 실행되는 코드가 그냥 console.out()이 아니라 readFile() 보다 작업시간이 오래걸리는 코드 였다면 텍스트 출력을 먼저 하게 될 것이다.



## callback 함수를 사용하여 프로그램의 흐름을 끊지 않음으로써, Non-Blocking 코드를 사용하는 서버는 Blocking 코드를 사용하는 서버보다 더 많은 양의 요청을 빠르게 처리 할 수 있게 된다.







