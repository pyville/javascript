# 날짜와 시간

[돌아가기](/../javascript/)

JavaScript에 내장된 [Date 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)를 통해 날짜와 시간을 다룰 수 있습니다.

## Date 객체란 무엇인가?

Date 객체는 시간의 한 시점을 플랫폼에 종속되지 않는 형태로 나타내는 내장 객체입니다. Date 객체는 1970년 1월 1일 UTC(협정 세계시) 자정과의 시간 차이를 밀리초로 나타내는 정수 값을 담습니다.

JavaScript 날짜의 기반은 1970년 1월 1일 UTC 자정과의 시간 차이를 밀리초 단위로 나타낸 것으로, 날짜와 시간의 컴퓨터 기록물을 대부분 차지하고 있는 UNIX 시간(UNIX epoch, 1970년 1월 1일 자정과의 시간 차이를 초 단위로 나타냄)과는 다릅니다.

날짜를 얻거나 시간대끼리 변환하는 메서드가 다수 존재하며, 그 중 특히 유용한 함수는 날짜 및 시간을 국제 표준 시간인 협정 세계시(UTC)로 반환하는 함수입니다(UTC는 그리니치 시간대라고도 불리는데, 기준 시간대가 영국의 런던 인근인 그리니치를 지나는 경선이기 때문입니다). 사용자의 장치는 현지 시간을 제공합니다.

`getDay()`와 `setHours()`처럼 구성 요소를 현지 시간 기준으로 읽고 쓰는 메서드에는 `getUTCDay()`와 `setUTCHours()`처럼 UTC를 기준으로 하는 읽기/쓰기 메서드도 존재합니다.

## Date 객체엔 어떤 속성/메서드가 있는가?

Date 객체의 주요 속성/메서드는 다음과 같습니다.

```javascript
const birthday1 = new Date('December 17, 1995 03:24:00')
const birthday2 = new Date('1995-12-17T03:24:00')
const birthday3 = new Date(1995, 11, 17) // 월은 0부터 시작
const birthday4 = new Date(1995, 11, 17, 3, 24, 0)
```

| 속성/메서드 | 설명 |
| --- | --- |
| new Date() | 현재 시각을 기준으로 한 (또는 날짜, 시각 정보를 받아) 새로운 Date 객체를 반환합니다. |
| Date.parse(dateString) | 날짜를 나타내는 문자열을 분석한 후, 해당 날짜와 1970년 1월 1일 00:00:00 UTC의 시간 차이를 밀리초 단위의 숫자 값으로 반환합니다. |
| getTime() | 1970년 1월 1일 00:00:00 UTC와 주어진 날짜 사이의 경과 시간(밀리초)를 반환합니다. |
| getFullYear() | 현지 시간 기준 연도(네 자리 연도면 네 자리로)를 반환합니다. |
| getMonth() | 현지 시간 기준 월(0–11)을 반환합니다.<br>- 월은 1월(0)부터 시작합니다. |
| getDate() | 현지 시간 기준 일(1–31)을 반환합니다. |
| getDay() | 현지 시간 기준 요일(0–6)을 반환합니다.<br>- 요일은 일요일(0)부터 시작합니다. |
| getHours() | 현지 시간 기준 시(0–23)를 반환합니다. |
| getMinutes() | 현지 시간 기준 분(0–59)을 반환합니다. |
| getSeconds() | 현지 시간 기준 초(0–59)를 반환합니다. |
| getMilliseconds() | 현지 시간 기준 밀리초(0–999)를 반환합니다. |
| setFullYear(yearValue, monthValue, dateValue) | 현지 시간 기준 연도(네 자리 연도면 네 자리로)를 설정합니다. |
| setMonth(monthValue, dayValue) | 현지 시간 기준 월(0–11)을 설정합니다.<br>- 월은 1월(0)부터 시작합니다. |
| setDate(dayValue) | 현지 시간 기준 일(1–31)을 설정합니다. |
| setHours(hoursValue, minutesValue, secondsValue, msValue) | 현지 시간 기준 시(0–23)를 설정합니다. |
| setMinutes(minutesValue, secondsValue, msValue) | 현지 시간 기준 분(0–59)을 설정합니다. |
| setSeconds(secondsValue, msValue) | 현지 시간 기준 초(0–59)를 설정합니다. |
| setMilliseconds(msValue) | 현지 시간 기준 밀리초(0–999)를 설정합니다. |
| toDateString() | 날짜 부분을 나타내는 문자열을 반환합니다. |
| toLocaleDateString() | 날짜 부분을 나타내는 문자열을 시스템에 설정된 현재 지역의 형식으로 반환합니다. |
| toString() | Date를 나타내는 문자열을 반환합니다. |
| toLocaleString() | Date를 나타내는 문자열을 시스템에 설정된 현재 지역의 형식으로 반환합니다. |

## Date 객체를 통해 오늘 날짜를 가져오는 방법은 무엇인가?

아무런 인수 없이 생성자를 호출합니다.

```javascript
const today = new Date()
```

## 임의의 날짜를 Date 객체로 바꾸는 방법은 무엇인가?

년, 월(0부터 시작), 일을 인수로 넣어 생성자를 호출합니다.

```javascript
const birthday = new Date(1996, 0, 9)
```

## Date 객체를 통해 두 날짜가 며칠 차이인지 비교하는 방법은 무엇인가?

비교할 두 날짜를 `getTime()` 메서드를 이용해 밀리초 기준의 [유닉스 시간](https://ko.wikipedia.org/wiki/유닉스_시간) 값으로 변환합니다. 이후에 하루를 밀리초 기준으로 환산한 값인 `24 * 60 * 60 * 1000`로 나누어 주면 일 단위 간격을 알 수 있습니다.

```javascript
const day1 = new Date(2012, 2, 2)
const day2 = new Date(2015, 2, 2)
const elapsedDays = (day2.getTime() - day1.getTime()) / (24 * 60 * 60 * 1000)
```