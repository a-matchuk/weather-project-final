//Feature #1
let now = new Date();
console.log(now);

let celsiusTemperature;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentHour = String(now.getHours()).padStart(2, "0");
let currentMinute = String(now.getMinutes()).padStart(2, "0");
let date = `${currentDay}, ${currentHour}:${currentMinute}`;

let h3 = document.querySelector("h3");
h3.innerHTML = date;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function DisplayForecast(responce) {
  let forecast = responce.data.daily;

  console.log(forecast);

  let ForecastElement = document.querySelector("#forecast");

  let ForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      ForecastHTML =
        ForecastHTML +
        `<div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="50"
  /> 
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperatures-max">${Math.round(
      forecastDay.temp.max
    )}°</span> 
    <span class="weather-forecast-temperatures-min">${Math.round(
      forecastDay.temp.min
    )}°</span>
</div>
</div>`;
    }
  });
  ForecastHTML = ForecastHTML + `</div>`;
  ForecastElement.innerHTML = ForecastHTML;
}

//Feature #2
let searchInput = document.querySelector("#query");

function showCity(event) {
  event.preventDefault();
  console.log("Searchinput");
  console.log(searchInput.value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  // if (searchInput.value) {
  //   alert(`${searchInput.value}`);
  // }
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showInfo);
}
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

// Week 5 homework
let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(DisplayForecast);
}

function showInfo(responce) {
  celsiusTemperature = responce.data.main.temp;
  let CurrentTemperature = Math.round(celsiusTemperature);
  console.log(responce);
  console.log(CurrentTemperature);
  let strong = document.querySelector("strong");
  strong.innerHTML = `${CurrentTemperature}`;

  let CurrentDescription = responce.data.weather[0].main;
  console.log(CurrentDescription);
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${CurrentDescription}`;

  let CurrentHumidity = responce.data.main.humidity;
  console.log(CurrentHumidity);
  let humid = document.getElementById("humid");
  humid.innerHTML = `Humidity: ${CurrentHumidity} %`;

  let CurrentWind = Math.round(responce.data.wind.speed);
  console.log(CurrentHumidity);
  let wind = document.getElementById("wind");
  wind.innerHTML = `Wind: ${CurrentWind} km/h`;

  let ShowIcon = responce.data.weather[0].icon;
  console.log(ShowIcon);
  let icon = document.getElementById("icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );

  getForecast(responce.data.coord);
}
