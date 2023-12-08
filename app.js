const BASE_URL = " https://api.openweathermap.org/data/2.5";
const API_KEY = "422e21bdd1d866deee3cf5b15241194c";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

// get current weathers data url
const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

// get data by city name
const searchHandler = async () => {
    const cityName = searchInput.value;
    searchInput.value = "";
    if (!cityName) {
        alert("please enter city name");
    }
    
    const currentData = await getCurrentWeatherByName(cityName);
    console.log(currentData)
};

searchButton.addEventListener("click", searchHandler);
