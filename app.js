const BASE_URL = " https://api.openweathermap.org/data/2.5";
const API_KEY = "422e21bdd1d866deee3cf5b15241194c";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

// get current weathers data url
const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// get weather data by coordinate
const getCurrentWeatherByCoordinates = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// get forecast weather data
const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// get forecast weather data by coordinate
const getForecastWeatherByCoordinates = async (lat, lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// show weather data in site (current weather)
const renderCurrentWeather = (data) => {
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

// show forecast weather
const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
};

const renderForecastWeather = (data) => {
    forecastContainer.innerHTML = "";
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
    data.forEach((i) => {
        const forecastJSX = `
            <div>
                <img alt="weather icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png" />
                <h3>${getWeekDay(i.dt)}</h3>
                <p>${Math.round(i.main.temp)} °C</p>
                <span>${i.weather[0].main}</span>
            </div>
        `;
        forecastContainer.innerHTML += forecastJSX;
    });
};

// get data by city name
const searchHandler = async () => {
    const cityName = searchInput.value;
    searchInput.value = "";
    if (!cityName) {
        alert("please enter city name");
    }

    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByName(cityName);
    renderForecastWeather(forecastData);
};

// user weather by them location
const positionCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByCoordinates(latitude, longitude);
    renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
    console.log(error.message);
};

const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
    } else {
        alert("your browser dose not support geolocation");
    }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
