/*
여기에 JavaScript 코드를 작성합니다.
*/
const getPosition = () => {
    return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
    )
}
const link = document.createElement('a')
link.innerText = "현재 위치"
link.target = "_blank"

getPosition()
    .then((pos) => {
        const {latitude, longitude} = pos.coords
        return `https://www.google.com/maps/@${latitude},${longitude}`
    })
    .then((url) => {
        link.href = url
        document.body.appendChild(link)
    })
    .catch((error) => console.error(error))