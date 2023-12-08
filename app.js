const BASE_URL = " https://api.openweathermap.org/data/2.5";
const API_KEY = "422e21bdd1d866deee3cf5b15241194c";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");

// get current weathers data url
const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// show weather data in site (current weather)
const renderCurrentWeather = (data) => {
console.log(data)

    // if (!data) return;
    const weatherJSX = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div id="main">
            <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °C</p>
        </div>
        <div id="info"> 
            <p>Humidity: <span>${data.main.humidity}</span></p>
            <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
        </div>
    `;

    weatherContainer.innerHTML = weatherJSX; 
};

// get data by city name
const searchHandler = async () => {
    const cityName = searchInput.value;
    searchInput.value = "";
    if (!cityName) {
        alert("please enter city name");
    }
    
    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData)
};

searchButton.addEventListener("click", searchHandler);
