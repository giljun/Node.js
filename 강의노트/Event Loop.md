# Event Loop

- Node.js에선 Event를 매우 많이 사용하고, 이 때문에 다른 비슷한 기술들보다 훨씬 빠른 속도를 자랑한다.
- Node.js 기반으로 만들어진 서버가 가동되면, 변수들을 initialize 하고, 함수를 선언하고 이벤트가 일어날때까지 기다린다.
- 이벤트 위주(Event-Driven) 어플리케이션에서는, 이벤트를 대기하는 메인 루프가 있다.
- 이벤트가 감지되었을 시, Callback함수를 호출한다.
- 이벤트가 콜백과 비슷하게 보일 수 있지만, 콜백함수는 비동기식 함수에서 결과를 반환할 때 호출되지만, 이벤트핸들링은 옵저버 패턴에 의해 작동한다.



## 옵저버 패턴

- 이벤트를 대기하는(EventListeners) 함수들이 옵저버 역할을 한다.

- 옵저버들이 이벤트를 기다리다가,

- 이벤트가 실행되면, 이벤트를 처리하는 함수가 실행된다.

- Node.js 에는 events 모듈과 EventEmitter 클래스가 내장

  - 이를 사용하여, 이벤트와 이벤트핸들러를 연동 시킬 수 있다.

    ```javascript
    // events 모듈 사용
    var events = require('events');
    
    // EventEmitter 객체 생성
    var eventEmitter = new events.EventEmitter();
    ```

  - 이벤트 핸들러와 이벤트를 연동시키는건 다음과 같다.

    ```javascript
    // event와 EventHandler를 연동 (bind)
    // eventName은 임의로 설정 가능
    eventEmitter.on('eventName', eventHandler);
    ```

  - 프로그램안에서 이벤트를 발생시킬땐 다음 코드를 사용한다.

    ```javascript
    eventEmitter.emit('eventName');
    ```

    

