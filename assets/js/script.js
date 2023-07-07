var apiKey = '94e5456c3d04b880e4753e8fde1884d6'

function renderElements(cityName, weatherData) {
    // create a title with city name
    var h2 = document.createElement('h2')
    h2.innerTesxt = cityName
    var ul = document.createElement('ul')
    var li1 = document.createElement('ul')
    var li2 = document.createElement('ul')
    var li3 = document.createElement('ul')
    li1.innerText = "Temp: " + weatherData.main.temp
    li2.innerText = "Humidity: " + weatherData.main.humidity
    li3.innerText = "Hum: " + weatherData.main.humidity
    ul.appendChild(li1)
    ul.appendChild(li2)
    ul.appendChild(li3)
    document.body.appendChild(h2)
    document.body.appendChild(ul)
}

function getWeatherByCity(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        renderElements(cityName, weatherData)
    })
}

getWeatherByCity('Milwaukee')