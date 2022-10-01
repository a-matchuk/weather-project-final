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
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = String(now.getHours()).padStart(2, "0");
let currentMinute = String(now.getMinutes()).padStart(2, "0");
let date = `${currentDay}, ${currentHour}:${currentMinute}`;

let h3 = document.querySelector("h3");
h3.innerHTML = date;

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
}

function ShowFahrenheitTemperature(event) {
  event.preventDefault();
  let CurrentTemperature = Math.round(celsiusTemperature);
  let FahrenheitTemperature = (CurrentTemperature * 9) / 5 + 32;
  let strong = document.querySelector("#temperature");
  strong.innerHTML = Math.round(FahrenheitTemperature);
}
function ShowCelsiusTemperature(event) {
  event.preventDefault();
  let strong = document.querySelector("#temperature");
  strong.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ShowFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ShowCelsiusTemperature);
