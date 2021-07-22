# 정규 표현식

[정규 표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)은 문자열에 나타는 특정 문자 조합과 대응시키기 위해 사용되는 패턴입니다.

## JavaScript의 정규표현식이란 무엇인가?

JavaScript에서는 정규 표현식 또한 [RegExp](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 라는 이름의 객체입니다. 이 패턴들은 RegExp의 `exec()` 메소드와 `test()` 메소드, 그리고 String 객체의 `match()` 메서드, `replace()` 메서드, `search()` 메서드, `split()` 메서드와 함께 쓰입니다.

JavaScript에서 정규 표현식을 사용하는 방법은 리터럴 표기법(`/`)을 이용하는 방법과 RegExp 객체의 생성자 함수를 이용하는 방법이 있습니다. 

```javascript
const re1 = /\w+/
const re2 = new RegExp('\\w+')
```

## 정규표현식에서 사용할 수 있는 주요 패턴은 어떤 것이 있는가?

매칭 패턴

| 패턴 | 의미 |
| --- | --- |
| a-zA-Z | 영어 알파벳(-으로 범위 지정) |
| ㄱ-ㅎ가-힣 | 한글 문자(-으로 범위 지정) |
| 0-9 | 숫자(-으로 범위 지정) |
| .	| 모든 문자열(숫자, 한글, 영어, 특수기호, 공백 모두 가능, 줄바꿈은 불가능) |
| \d | 숫자 |
| \D | 숫자가 아닌 것 |
| \w | 영어 알파벳, 숫자, 언더스코어(_) |
| \W | \w가 아닌 것 |
| \s | space 공백 | 
| \S | space 공백이 아닌 것 |
| \특수기호 | 특수기호 |

검색 패턴

| 기호 | 의미 |
| --- | --- |
| \| | OR |
| [] | 괄호안의 문자들 중 하나 |
| [^문자] | 괄호안의 문자를 제외한 것 |
| ^문자열 | 특정 문자열로 시작(괄호 없음 주의!) |
| 문자열$ | 특정 문자열로 끝남 |
| () | 그룹 검색 및 분류(`match` 메서드에서 그룹별로 묶어줌) |
| (?: 패턴) | 그룹 검색(분류X) |
| \b | 단어의 처음/끝 |
| \B | 단어의 처음/끝이 아님 |

수량 패턴

| 기호 | 의미 |
| --- | --- |
| ? | 최대 1번(없거나 1개) |
| * | 없거나 있거나 여러 개 가능 |
| + | 최소 1개(1개~여러 개) |
| {n} | n개 |
| {Min, } | 최소 Min개 이상 |
| {Min, Max}| 최소 Min개 이상, 최대 Max개 이하 |

플래그(동시에 여러 개 사용 가능)

| 플래그 | 의미 |
| --- | --- |
| g | Global: 모든 문자 검색(안 쓰면 매칭되는 첫 문자만 검색) |
| i | Ignore Case: 대소문자 구분 안함 |
| m | Multiline: 여러 행의 문자열에 대해 검색 |

## RegExp 객체의 속성 및 메서드는 무엇이 있는가?

패턴과 함께 다음 속성 및 메서드를 사용합니다.

| 속성 | 설명 |
| --- | --- |
| `/ ... /` | 정규 표현식 리터럴 (백슬래시 `\` 아님) |
| lastIndex | 다음 매치를 시작할 지점입니다.<br>- `g` 플래그로 글로벌 탐색을 하거나, `y` 플래그로 스티키(sticky) 탐색을 할 때 설정됩니다. |
| source | `/ ... /` 안에 있는 문자열입니다. |
| 기타 속성 | **global**: 정규 표현식이 글로벌로 작동하는지 알려줍니다. `g` 플래그에 해당하며, `true` 또는 `false` 값입니다.<br>**hasIndices**: 매치된 문자열의 시작 및 끝 인덱스 저장이 설정되어 있는지 알려줍니다. `d` 플래그에 해당하며, `true` 또는 `false` 값입니다.<br>**ignoreCase**: 대소문자 무시가 설정되어 있는지 알려줍니다. `i` 플래그에 해당하며 `true` 또는 `false` 값입니다.<br>**multiline**: 여러 줄(multiline) 탐색이 설정되어 있는지 알려줍니다. `m` 플래그에 해당하며, `true` 또는 `false` 값입니다<br>**sticky**: 스티키(sticky) 탐색이 설정되어 있는지 알려줍니다. `y` 플래그에 해당하며, `true` 또는 `false` 값입니다.<br>**unicode**: 유니코드 값이 설정되어 있는지 알려줍니다. u 플래그에 해당하며, `true` 또는 `false` 값입니다. |

| 메서드 | 설명 |
| --- | --- | 
| exec(str) | 문자열이 정규 표현식의 패턴과 맞는지 테스트합니다.<br>- `array` 또는 `null` 값을 반환합니다.<br>- 여러 번 실행하여 문자열 내의 모든 매치를 찾아냅니다(`matchAll()`과 유사).<br>- 더 이상의 매치가 없을 경우 `null`을 반환하고 `lastIndex`를 0으로 초기화합니다. |
| test(str) | 문자열이 정규 표현식의 패턴과 맞는지 테스트합니다.<br>- `true` 또는 `false` 값을 반환합니다. |
| '문자열'.match(/정규 표현식/) | 문자열이 정규 표현식의 패턴과 맞을 경우 첫 매치를 반환합니다.<br>- 매치하지 않을 경우 `null`을 반환합니다. |
| '문자열'.matchAll(/정규 표현식/) | 문자열이 정규 표현식의 패턴과 맞을 경우 모든 매치를 반환합니다.<br>- 매치하지 않을 경우 `null`을 반환합니다. |
| '문자열'.split(/정규 표현식/) | 문자열을 정규 표현식의 패턴을 구분자로 한 배열로 변환합니다. |

## 정규표현식 패턴을 생성하여 데이터를 필터링하거나 포맷을 변경하는 방법은 무엇인가?

**정규 표현식을 사용해서 데이터 형식 바꾸기**

다음 JavaScript 코드에서는 [String](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String) 객체의 [replace()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 메서드를 사용하여 '이름 성씨' 형태의 이름을 '성씨, 이름' 형태로 바꿔 반환합니다.

대치 문자열에는 `$1`과 `$2`를 사용하여 정규 표현식 패턴의 각 괄호에 일치한 결과를 받아옵니다.

```javascript
let re = /(\w+)\s(\w+)/
let str = 'John Smith'
let newstr = str.replace(re, '$2, $1')
console.log(newstr)
```

실행 결과는 `"Smith, John"`입니다.

**정규 표현식을 사용해서 여러 가지 줄 바꿈 문자가 있는 문자열 나누기**

기본 줄 바꿈 문자는 플랫폼(Unix, Windows 등)마다 다릅니다. 아래의 분할 스크립트는 모든 플랫폼의 줄 바꿈을 인식합니다.

```javascript
let text = 'Some text\nAnd some more\r\nAnd yet\rThis is the end'
let lines = text.split(/\r\n|\r|\n/)
console.log(lines) // logs [ 'Some text', 'And some more', 'And yet', 'This is the end' ]
```

정규 표현식 패턴의 순서를 바꾸면 작동하지 않을 수 있습니다.

**여러 줄에서 정규 표현식 사용하기**

```javascript
let s = 'Please yes\nmake my day!'

s.match(/yes.*day/);
// Returns null

s.match(/yes[^]*day/);
// Returns ["yes\nmake my day"]
```

**접착 플래그와 함께 사용하기**

[sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) 플래그는 해당 정규 표현식이 접착 판별, 즉 [RegExp.prototype.lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)에서 시작하는 일치만 확인하도록 할 수 있습니다.

```javascript
let str = '#foo#'
let regex = /foo/y

regex.lastIndex = 1
regex.test(str)      // true
regex.lastIndex = 5
regex.test(str)      // false (lastIndex is taken into account with sticky flag)
regex.lastIndex      // 0 (reset after match failure)
```

> **접착과 전역 플래그의 차이**

접착 플래그 `y`의 일치는 정확히 `lastIndex` 위치에서만 발생할 수 있으나, 전역 플래그 `g`의 경우 `lastIndex` 또는 그 이후에서도 발생할 수 있습니다.

```javascript
re = /\d/y;
while (r = re.exec("123 456")) 
	console.log(r, "AND re.lastIndex", re.lastIndex);

// [ '1', index: 0, input: '123 456', groups: undefined ] AND re.lastIndex 1
// [ '2', index: 1, input: '123 456', groups: undefined ] AND re.lastIndex 2
// [ '3', index: 2, input: '123 456', groups: undefined ] AND re.lastIndex 3
//   ... and no more match.
```

전역 플래그 `g`를 사용했다면, 3개가 아니고 6개 숫자 모두 일치했을 것입니다.

> **정규 표현식과 Unicode 문자**

`\w`와 `\W`는 `a`부터 `z`, `A`부터 `Z`, `0`부터 `9` `_` 등의 [ASCII](https://developer.mozilla.org/ko/docs/Glossary/ASCII) 문자에만 일치합니다.

러시아어나 히브리어와 같은 다른 언어의 문자까지 일치하려면 `\uhhhh`(이때 hhhh는 해당 문자의 16진법 Unicode 값) 문법을 사용하세요. 아래 예제에서는 문자열에서 Unicode 문자를 추출합니다.

```javascript
let text = 'Образец text на русском языке'
let regex = /[\u0400-\u04FF]+/g
let match = regex.exec(text)
console.log(match[0])        // logs 'Образец'
console.log(regex.lastIndex) // logs '7'

let match2 = regex.exec(text)
console.log(match2[0])       // logs 'на' [did not log 'text']
console.log(regex.lastIndex) // logs '15'

// and so on
```

[유니코드 속성 이스케이프 (영어)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes) 기능을 사용해 `\p{scx=Cyrl}`과 같은 간단한 구문으로 이 문제를 해결할 수 있습니다.

> **URL에서 서브도메인 추출하기**

```javascript
let url = 'http://xxx.domain.com'
console.log(/[^.]+/.exec(url)[0].substr(7))
```

이 때는 정규표현식보단 [URL API (영어)](https://developer.mozilla.org/en-US/docs/Web/API/URL_API)를 통해 브라우저에 내장된 URL 구문 분석기를 사용하는 것이 좋습니다.