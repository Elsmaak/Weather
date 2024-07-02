const nav = document.querySelectorAll("nav li a")
const locaSearch = document.querySelector("#locaSearch");
const findLoca = document.querySelector("#findLoca");

const currentDay = document.querySelector("#currentDay");
const currentDate = document.querySelector("#currentDate");

const currentCountry = document.querySelector("#currentCountry");
const currentTemp = document.querySelector("#currentTemp");
const currentIcon = document.querySelector("#currentIcon");
const currentWeather = document.querySelector("#currentWeather");
const currentHumidity = document.querySelector("#currentHumidity");
const currentWind = document.querySelector("#currentWind");
const currentDir = document.querySelector("#currentDir");
let localWeather;

(function () {
    for (let i = 0; i < nav.length; i++) {
        nav[i].addEventListener("click", (e) => {
            clear()
            e.target.classList.add("active")
        })
    }
})();

function clear() {
    for (let i = 0; i < nav.length; i++) {
        nav[i].classList.remove("active")

    }
}
async function getWeather() {
    let city = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=debc678c8f74470d80e01830240207&q=${locaSearch.value ? locaSearch.value : 'Cairo'}&days=3`)
    let data = await city.json()
    localWeather = data
    displayWeather();
    displayNextDay();
}
getWeather();

function displayWeather() {
    const date = new Date(localWeather.location.localtime);
    const locaCurrent = localWeather.current
    currentDay.innerHTML = date.toLocaleString('default', { weekday: 'long' });
    currentDate.innerHTML = date.toLocaleString('default', { day: '2-digit', month: 'long' });

    currentCountry.innerHTML = localWeather.location.name;
    currentTemp.innerHTML = locaCurrent.temp_c + "°C";
    currentIcon.setAttribute("src", 'https://' + locaCurrent.condition.icon);
    currentWeather.innerHTML = locaCurrent.condition.text;
    currentHumidity.innerHTML = locaCurrent.humidity + "%"
    currentWind.innerHTML = locaCurrent.wind_mph + "/h"
    currentDir.innerHTML = locaCurrent.wind_dir
}
findLoca.addEventListener("click", () => {
    getWeather()
})
locaSearch.addEventListener("input", () => {
    if (locaSearch.value.length >= 3) {
        getWeather()
    }
})


const secondDay = document.querySelectorAll(".secondDay");
const secondDate = document.querySelectorAll(".secondDate");
const secondDayWeather = document.querySelectorAll(".secondDayWeather");
const secondTemp = document.querySelectorAll(".secondTemp");
const repeatTemp = document.querySelectorAll(".repeatTemp");
const secondWeather = document.querySelectorAll(".secondWeather");


function displayNextDay() {
    let cartoona = localWeather.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let date = new Date(cartoona[i + 1].date);
        secondDay[i].innerHTML = date.toLocaleString('default', { weekday: 'long' });
        secondDate[i].innerHTML = date.toLocaleString('default', { day: '2-digit', month: 'long' });

        secondDayWeather[i].setAttribute("src", 'https://' + cartoona[i].day.condition.icon)
        secondDayWeather[i].setAttribute("alt", cartoona[i].day.condition.text)
        secondTemp[i].innerHTML = cartoona[i].day.maxtemp_c + "°C";
        repeatTemp[i].innerHTML = secondTemp[i].innerHTML
        secondWeather[i].innerHTML = cartoona[i].day.condition.text

    }
}


