/*
여기에 JavaScript 코드를 작성합니다.
*/

const APP_KEY = "YOUR_APP_KEY"

const textBox = document.getElementById('text-input')
const infoDiv = document.getElementById('info-div')

const createElem = (type, text) => {
    const elem = document.createElement(type)
    elem.innerText = text
    return elem
}

const searchMovie = (movieName) => {
    const reqURL = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${APP_KEY}&movieNm=${movieName}`
    const req = new Request(reqURL)
    return fetch(req)
        .then((res)=>res.json())
        .then((obj) => {
            return obj.movieListResult.totCnt === 0
                ? []
                : obj.movieListResult.movieList
        })
        .catch((error) => console.error(error))
    }

const renderMovie = (arr) => {
    // 테이블 헤더 추가
    const tbl = document.createElement('table')
    const tblHead = document.createElement('thead')
    const tblHeadLine = document.createElement('tr')
    const tblHeadContents = ['제목', '개봉년도', '장르', '감독']
    tblHeadContents.forEach((value) => {
        const tblHeadCell = document.createElement('th')
        tblHeadCell.innerText = value
        tblHeadLine.appendChild(tblHeadCell)
    })
    tblHead.appendChild(tblHeadLine)
    tbl.appendChild(tblHead)

    // 테이블 본문 추가
    const tblBody = document.createElement('tbody')
    arr.forEach((obj) => {
        const tblBodyLine = document.createElement('tr')
        const {movieNm, movieNmEn, prdtYear, genreAlt, directors} = obj
        // 패키지 상영 제외
        if (movieNmEn.indexOf("Package Screening") !== -1) 
            return
        const tblBodyLineContents = [
            `${movieNm.trim()}\n(${movieNmEn.trim()})`, `${prdtYear}`, genreAlt.replaceAll(',', '\n'), directors.length === 0
                ? `미상`
                : directors[0].peopleNm
        ]
        tblBodyLineContents.forEach((value) => {
            const tblBodyCell = document.createElement('td')
            tblBodyCell.innerText = value
            tblBodyLine.appendChild(tblBodyCell)
        })
        tblBody.appendChild(tblBodyLine)
    })
    tbl.appendChild(tblBody)
    return tbl
}

textBox.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (e.target.value === '') {
            alert("검색어를 입력해 주세요!")
            return
        }
        const keyword = e.target.value
        e.target.value = ''
        infoDiv.innerHTML = ''
        infoDiv.appendChild(createElem('h2', `"${keyword}"의 검색 결과`))
        searchMovie(keyword)
            .then((arr) => arr.length === 0 ? alert("검색 결과가 없습니다.") : infoDiv.appendChild(renderMovie(arr)))
    }
})