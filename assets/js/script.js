var apiKey = '94e5456c3d04b880e4753e8fde1884d6';

var btn = document.querySelector("#btn-search");

var containerPreviousSerches = document.querySelector("#previous-searches");

var containerCity = document.querySelector("#target-city");

var containerDate = document.querySelector('#current-date')

var containerForecast = document.querySelector("#info-city");

var searchHistoryList = document.querySelector("#search-history");

var searchHistory = [];

var forecastCardsContainer = document.querySelector('#five-day-forecast .row')

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
    icon.classList.add('img-fluid')

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

// getWeatherByCity("Milwaukee")

function getWeatherByCity(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        renderElements(cityName, weatherData);
        console.log(weatherData);

        weatherForecast(cityName); // Call the weather forecast function here
    });
}

function weatherForecast(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey + '&cnt=40')
    .then(function(response) {
        return response.json()
    })
    .then(function(weatherData) {
        console.log(JSON.stringify(weatherData))
        forecastCardsContainer.innerHTML = ''; // Clear existing forecast cards

        var forecasts = weatherData.list;
        var count = 0;

        for (var i = 0; i < forecasts.length; i++) {
            var forecast = forecasts[i];

            // Check if the forecast time is 12:00 pm
            if (forecast.dt_txt.includes('12:00:00')) {
                if (count >= 5) {
                    break; // Exit the loop after 5 forecasts
                }

                var card = document.createElement('div');
                card.classList.add('card', 'bg-light', 'col-2', 'mx-1');
                card.style.width = '7rem';

                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'bg-light', 'px-0', 'py-2');

                var title = document.createElement('h5');
                title.classList.add('card-title');
                title.innerText = forecast.dt_txt.substr(0, 10); // Extract only the date

                var temperature = document.createElement('p');
                temperature.classList.add('card-text', 'mb-2');
                temperature.innerText = 'Temp: ' + forecast.main.temp + '°F';

                var wind = document.createElement('p');
                wind.classList.add('card-text', 'mb-2');
                wind.innerText = 'Wind: ' + forecast.wind.speed + 'mph';

                var humidity = document.createElement('p');
                humidity.classList.add('card-text', 'mb-2');
                humidity.innerText = 'Humidity: ' + forecast.main.humidity + '%';

                cardBody.appendChild(title);
                cardBody.appendChild(temperature);
                cardBody.appendChild(wind);
                cardBody.appendChild(humidity);

                card.appendChild(cardBody);

                forecastCardsContainer.appendChild(card);
                count++;
            }
        }
    })
    .catch(function() {
        console.error('Error fetching data');
    });
}


// Function to handle search
var search = function(event) {
    event.preventDefault();
    var inputElement = document.querySelector("#search-city");
    var textInput = inputElement.value.trim();
    if (textInput === "") {
        alert("Please enter a valid city");
        return;
    } else {
        console.log(textInput);
        // Call function for API response
        getWeatherByCity(textInput);
        
        // Add the searched city to the search history array
        searchHistory.push(textInput);
        
        // Limit the search history to a maximum of 5 entries
        if (searchHistory.length > 5) {
            searchHistory = searchHistory.slice(-5); // Get the last 5 entries
        }
        // Reverse the search history array
        searchHistory.reverse();
        // Store the search history array in local storage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory.reverse()));

        // Clear and repopulate the search history list
        searchHistoryList.innerHTML = "";
        searchHistory.reverse().forEach(function(city) {
            var listItem = document.createElement("li");
            listItem.textContent = city;
        listItem.classList.add("btn", "btn-secondary", "mt-3", "mb-0");
        searchHistoryList.appendChild(listItem);
        
        listItem.addEventListener("click", function() {
            getWeatherByCity(city);
            });
        });
        
        if (searchHistory.length > 0) {
            clearHistoryButton.style.display = "block"; // Display the clear history button
        } else {
            clearHistoryButton.style.display = "none"; // Hide the clear history button
        }
}
};




var clearHistoryButton = document.querySelector("#clear-history")

// // Retrieve search history from local storage
var storedSearchHistory = localStorage.getItem("searchHistory");
if (storedSearchHistory) {
    searchHistory = JSON.parse(storedSearchHistory);

    // Reverse the search history array
    searchHistory.reverse();

    // Populate the search history list
    searchHistory.forEach(function (city) {
        var listItem = document.createElement("li");
        listItem.textContent = city;
        listItem.classList.add("btn", "btn-secondary", "mt-3", "mb-0");
        searchHistoryList.appendChild(listItem);

        listItem.addEventListener("click", function () {
            getWeatherByCity(city);
        });
    });

    // Display the clear history button
    clearHistoryButton.style.display = "block";
} else {
    // Hide the clear history button
    clearHistoryButton.style.display = "none";
}

// Function to handle clearing of search history
var clearHistory = function() {
    searchHistory = []; // Clear the search history array
    localStorage.removeItem("searchHistory"); // Remove the search history from local storage
    searchHistoryList.innerHTML = ""; // Clear the search history list
    clearHistoryButton.style.display = "none"; // Hide the clear history button
}

// Check if there is search history in local storage
if (localStorage.getItem("searchHistory")) {
    clearHistoryButton.style.display = "block";
    // Display the clear history button
} else {
    clearHistoryButton.style.display = "none"; // Hide the clear history button
}

// event listener to clear history button
clearHistoryButton.addEventListener("click", clearHistory);

// event listener to search button
btn.addEventListener("click", search);