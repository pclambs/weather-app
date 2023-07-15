var apiKey = '94e5456c3d04b880e4753e8fde1884d6';

var btn = document.querySelector("#btn-search");

var containerPreviousSerches = document.querySelector("#previous-searches");

var containerCurrent = document.querySelector("#target-city");

var containerForecast = document.querySelector("#info-city");

function renderElements(cityName, weatherData) {
    // Clear any existing content
    containerCurrent.innerText = cityName;
    containerForecast.innerHTML = "";

    // Create an unordered list to display weather information
    var ul = document.createElement('ul');
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');
    var li5 = document.createElement('li');
    li1.innerText = "Temp: " + weatherData.main.temp + '°F';
    li2.innerText = "H: " + weatherData.main.temp_max + '°F';
    li3.innerText = "L: " + weatherData.main.temp_min + '°F';
    li4.innerText = "Wind: " + weatherData.wind.speed + 'mph';
    li5.innerText = "Humidity: " + weatherData.main.humidity + '%';

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);

    // Append the unordered list to the info-city div
    containerForecast.appendChild(ul);
    // Code to display the current date in the header of the page.
    var today = dayjs().format('MMMM D, YYYY');
    
    $('#today').text(today.format('MMMM D, YYYY'));
}

function getWeatherByCity(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        renderElements(cityName, weatherData)
        console.log(weatherData)
    })
}

// function listener on click button
var search = function(event){
    event.preventDefault();
    var inputElement = document.querySelector("#search-city");
    var textInput = inputElement.value.trim();
    if(inputElement.value === ""){
        alert("Please enter a valid city");
        return;
    }
    else{
        console.log(textInput);
        // call function for api response
        getWeatherByCity(textInput);
    }
};

// Add event listener to Searching button 
btn.addEventListener("click", search);