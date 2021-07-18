/*
여기에 JavaScript 코드를 작성합니다.
*/
const yearSelectBox = document.getElementById("year-select")
const monthSelectBox = document.getElementById("month-select")
const daySelectBox = document.getElementById("day-select")
const setBtn = document.getElementById("set-button")
const infoDiv = document.getElementById("info-div")
// 요일 변환
const weekDays = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토"
}
const isLeapYear = (year) => new Date(year, 1, 29).getDate() === 29
// const isLeapYear = (year) => ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) 
// 날짜 검증 함수
const isValidDate = (year, month, day) => {
    switch (month + 1) {
        case 2:
            return isLeapYear(year)
                ? day < 30
                : day < 29
        case 4:
        case 6:
        case 9:
        case 11:
            return day < 31
        default:
            return true
    }
}
// 날짜 포매팅 함수
const formatDate = (date) => {
    const year = `${date.getFullYear()}`
    const month = date.getMonth() > 8
        ? `${date.getMonth() + 1}`
        : `0${date.getMonth() + 1}`
    const day = date.getDate() > 9
        ? `${date.getDate()}`
        : `0${date.getDate()}`
    return `${year}년 ${month}월 ${day}일`
}
// 날짜 비교 함수
const compareDate = (year, month, day) => {
    const anniversary = new Date(year, month, day)
    const hundredDaysLater = new Date(year, month, day + 100)
    const now = new Date()
    anniversary.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)
    hundredDaysLater.setHours(0, 0, 0, 0)
    const elapsedDays = (now.getTime() - anniversary.getTime()) / (
        24 * 60 * 60 * 1000
    )
    let message = `기준일은 ${weekDays[anniversary.getDay()]}요일입니다.`
    message += '\n'
    message += elapsedDays > 0
        ? `기준일로부터 ${elapsedDays}일 지났습니다.`
        : `기준일로부터 ${ - elapsedDays}일 남았습니다.`
    message += '\n'
    message += `기준일로부터 100일 후는 ${formatDate(hundredDaysLater)}입니다.`
    return message
}
// 년, 월, 일 선택 상자 만들기
for (let i = 1970; i < 2031; i++) {
    const opt = document.createElement('option')
    opt.innerText = `${i}년`
    opt.value = `${i}`
    yearSelectBox.appendChild(opt)
}

for (let j = 0; j < 12; j++) {
    const opt = document.createElement('option')
    opt.innerText = `${j + 1}월`
    opt.value = `${j}`
    monthSelectBox.appendChild(opt)
}

for (let k = 0; k < 31; k++) {
    const opt = document.createElement('option')
    opt.innerText = `${k + 1}일`
    opt.value = `${k + 1}`
    daySelectBox.appendChild(opt)
}
// 기본값을 오늘 날짜로 설정하기
const today = new Date()
yearSelectBox.value = today.getFullYear()
monthSelectBox.value = today.getMonth()
daySelectBox.value = today.getDate()
// 버튼 동작 설정하기
setBtn.addEventListener('click', () => {
    const [year, month, day] = [
        Number(yearSelectBox.value),
        Number(monthSelectBox.value),
        Number(daySelectBox.value)
    ]
    if (!isValidDate(year, month, day)) {
        alert("올바른 날짜 형식이 아닙니다!")
        infoDiv.innerText = ''
        return
    }
    infoDiv.innerText = compareDate(year, month, day)
})