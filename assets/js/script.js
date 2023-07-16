var apiKey = '94e5456c3d04b880e4753e8fde1884d6';

var btn = document.querySelector("#btn-search");

var containerPreviousSerches = document.querySelector("#previous-searches");

var containerCity = document.querySelector("#target-city");

var containerDate = document.querySelector('#current-date')

var containerForecast = document.querySelector("#info-city");

var searchHistoryList = document.querySelector("#search-history");

function renderElements(cityName, weatherData) {
    // Clear any existing content
    containerCity.innerHTML = "";
    containerDate.innerHTML = "";
    containerForecast.innerHTML = "";

        // Create a container for the city name and icon
    var container = document.createElement('div');
    container.id = 'city-info';

    // Create a title with city name
    var h2 = document.createElement('h2');
    h2.innerText = cityName;

    // Create an image element for the weather icon
    var icon = document.createElement('img');
    icon.src = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    icon.alt = weatherData.weather[0].description;

    // Create a paragraph for the date
    var dateParagraph = document.createElement('p');
    var date = new Date(weatherData.dt * 1000).toLocaleDateString();
    dateParagraph.innerText = date;

    // Create an unordered list to display weather information
    var ul = document.createElement('ul');
    var li1 = document.createElement('li');
    var li4 = document.createElement('li');
    var li5 = document.createElement('li');
    li1.innerText = "Temperature: " + weatherData.main.temp + '°F';
    li4.innerText = "Wind: " + weatherData.wind.speed + 'mph';
    li5.innerText = "Humidity: " + weatherData.main.humidity + '%';

    ul.appendChild(li1);
    ul.appendChild(li4);
    ul.appendChild(li5);

    // Append the elements to the container
    container.appendChild(h2);
    container.appendChild(icon);

    // Append the elements to the DOM
    containerCity.appendChild(container);
    containerDate.appendChild(dateParagraph);
    containerForecast.appendChild(ul);
}

getWeatherByCity("Milwaukee")

function getWeatherByCity(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        renderElements(cityName, weatherData)
        console.log(weatherData)
        var fiveDayForcast = ""

        for (var i = 0; i < weatherData.list.length; i++)
            console.log(weatherData.list[i].dt_txt)
    })
}

function weatherForecast(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey + '&cnt=5')
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        console.log(JSON.stringify(weatherData))
        // renderWeather(data)
    })
    .catch(function() {
        console.error('Error fetching data')
    })
}



// function listener on click button
var search = function(event){
    event.preventDefault()
    var inputElement = document.querySelector("#search-city")
    var textInput = inputElement.value.trim()
    if(inputElement.value === ""){
        alert("Please enter a valid city")
        return
    }
    else{
        console.log(textInput)
        // call function for api response
        getWeatherByCity(textInput)

        // Create a new list item
        var listItem = document.createElement('li')
        listItem.textContent = textInput
        listItem.classList.add('btn', 'btn-secondary', 'mx-3','mt-3','mb-0')
        searchHistoryList.appendChild(listItem)

        listItem.addEventListener('click', function() {
            getWeatherByCity(textInput)
        })
    }
};

// Add event listener to Searching button 
btn.addEventListener("click", search)
