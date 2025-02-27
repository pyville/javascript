# Promise

[Promise 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다. 

기본적으로 Promise는 함수에 Callback을 전달하는 대신에, Callback을 첨부하는 방식의 객체입니다.

## 비동기 함수란 무엇이며, 왜 필요한가?

일반적으로 프로그램의 코드는 순차적으로 진행됩니다. 한 번에 한 가지 사건만 발생하면서 말입니다. 만약 어떤 함수의 결과가 다른 함수에 영향을 받는다면, 그 함수는 다른 함수가 끝나고 값을 산출할 때까지 기다려야 합니다. 그리고 그 과정이 끝날 때 까지, 유저의 입장에서 보자면, 전체 프로그램이 모두 멈춘 것처럼 보입니다.

이것은 당황스러운 경험이며, 특히 요즘과 같이 컴퓨터가 여러 프로세서를 돌리는 시대에는 컴퓨터 성능을 효율적으로 쓰지 못하는 처사입니다. 당신이 다른 코어 프로세서에 다른 작업들을 움직이게 하고 작업이 완료되면 알려줄 수 있을 때, 무언가를 기다리는 것은 의미가 없습니다. 그 동안 다른 작업을 수행할 수 있고, 이것이 비동기 프로그래밍의 기본입니다. 이러한 작업을 비동기적으로 실행할 수 있는 API를 제공하는 것은 당신이 사용하고 있는 프로그래밍 환경(웹 개발의 경우 웹브라우저)에 달려 있습니다.

동기 함수와 비동기 함수의 차이는 시점으로 비유할 수 있습니다. 기존에 우리가 작성해 왔던 JavaScript 연습 코드에서는 반드시 이전 줄이 끝남과 동시에 다음 줄이 시작되었을 것입니다. 비동기 함수는 이렇게 작동하지 않습니다.

| 종류 | 설명 |
| --- | --- |
| 동기 함수 | 이전 작업(줄)의 끝과 다음 작업(줄)의 시작이 맞춰짐 |
| 비동기 함수 | 이전 작업(줄)의 끝과 다음 작업(줄)의 시작이 맞춰지지 않음 |

## 블로킹(blocking) 코드와 논블로킹(non-blocking) 코드는 각각 어떻게 동작하는가?

웹 앱이 브라우저에서 특정 코드를 실행하느라 브라우저에게 제어권을 돌려주지 않으면 브라우저는 마치 정지된 것처럼 보일 수 있습니다. 이러한 현상을 블로킹(blocking)이라고 부릅니다. 자세히 정의하자면, 사용자의 입력을 처리하느라 웹 앱이 프로세서에 대한 제어권을 브라우저에게 반환하지 않는 현상입니다. 함수의 호출 스택(Call Stack) 구조를 생각해 보면, 제일 마지막에 들어온 함수가 실행을 마치기 이전에 다른 함수에게 제어권이 돌아오지 않는 것과 같습니다. 

그에 반해, 논블로킹(non-blocking)일 때는 제어권이 넘겨지지 않기 때문에 특정 함수가 호출된 이후 값이 반환되지 않아도 코드의 다음 줄로 계속 진행할 수 있습니다.

## ES6부터 추가된 Promise를 이용해 비동기 함수를 다루는 방법은 무엇인가?

먼저 콜백 함수를 전달해주는 고전적인 방식과는 달리, Promise는 아래와 같은 특징을 보장합니다.

* 콜백은 JavaScript Event Loop가 [현재 실행중인 콜 스택을 완료](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#run-to-completion)하기 이전에는 절대 호출되지 않습니다.
* 비동기 작업이 성공하거나 실패한 뒤에 `then()` 을 이용하여 추가한 콜백의 경우에도 위와 같습니다.
* `then()`을 여러 번 사용하여 여러개의 콜백을 추가할 수 있습니다. 그리고 각각의 콜백은 주어진 순서대로 하나 하나 실행되게 됩니다.

Promise는 다음 중 하나의 상태를 가집니다.

![Promise의 작업 흐름](https://user-images.githubusercontent.com/52960121/126061518-413f8376-d66d-4013-ab6a-ae56b526eb72.png)

| 상태 | 설명 | 
| --- | --- | 
| 대기(pending) | 이행하거나 거부되지 않은 초기 상태 | 
| 이행(fulfilled) | 연산이 성공적으로 완료됨 | 
| 거부(rejected) | 연산이 실패함 | 

대기 중인 Promise는 값과 함께 이행할 수도, 어떤 이유(오류)로 인해 거부될 수 있습니다. 이행이나 거부될 때, Promise에 연결한 처리기는 그 Promise의 `.then` 메서드에 의해 대기열에 오릅니다. 이미 이행했거나 거부된 Promise에 연결한 처리기도 호출하므로, 비동기 연산과 처리기 연결 사이에 경합 조건(race condition)은 없습니다.

`.then` 메서드에 별도의 에러 핸들링 함수를 넣지 않은 상태에서 거부가 발생하면, Promise는 그 이후에 나오는 `.error` 메서드의 에러 핸들링 함수를 실행합니다.

## Promise Chain이란 무엇인가?

Promise의 가장 뛰어난 장점 중의 하나는 **체이닝**(chaining)입니다.보통 하나나 두 개 이상의 비동기 작업을 순차적으로 실행해야 하는 상황이 흔히 있는데, 이는 순차적으로 각각의 작업이 이전 단계 비동기 작업이 성공하고 나서 그 결과값을 이용하여 다음 비동기 작업을 실행해야 하는 경우를 의미합니다. 우리는 이런 상황에서 **Promise Chain**을 이용하여 해결하기도 합니다.

예전에는 여러 비동기 작업을 연속적으로 수행하면 고전적인 '지옥의 콜백 피라미드'(콜백 지옥, Callback Hell)가 만들어졌습니다.

```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

최신 JavaScript로 접근한다면, 우리는 콜백 함수들을 반환된 Promise에 Promise Chain을 형성하도록 추가할 수 있습니다.

```javascript
doSomething().then((result) => doSomethingElse(result))
.then((newResult) => doThirdThing(newResult))
.then((finalResult) => console.log('Got the final result: ' + finalResult))
.catch(failureCallback);
```