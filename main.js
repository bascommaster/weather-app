import Clock from "./clock.js";

const timer = document.querySelector(".top-row__clock");
const btnVisited = document.querySelector(".top-row__button");
const city = document.querySelector(".top-row__city");
const writeCity = document.querySelector(".form__find-city");
const btnSerchCity = document.querySelector(".form__serch");

const temperature = document.querySelector("#temperature");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");
const clouds = document.querySelector("#clouds");
const conditions = document.querySelector("#conditions");
const wind = document.querySelector("#wind");

const visitedSection = document.querySelector(".visited");
const visitedCity = document.querySelector(".visited__city");

const KEY = "06cec974212a23a263130f5389db9b81";

const clockElem = new Clock(timer);

let names = [];

setInterval(() => clockElem.displayTime(), 100);

function createVisitedElement() {
    names = JSON.parse(localStorage.getItem("cityList"));

    if (names === null) {
        const visitedInfo = document.createElement("h2");
        visitedInfo.classList.add("visited__info");
        visitedSection.appendChild(visitedInfo).innerHTML = "lista jest pusta";
    } else {
        for (const name of names) {
            const city = document.createElement("p");
            city.classList.add("visited__city-p");
            visitedCity.appendChild(city).innerHTML = `${name}`;
            city.addEventListener("click", getCityFromVisited);
        }
    }
}

function getVisited() {
    createVisitedElement();
    if (window.screen.width >= 640) {
        visitedSection.style.left = "60%";
        visitedSection.style.transform = "translateX(0)";
    } else {
        visitedSection.style.left = "0";
        visitedSection.style.transform = "translateX(0)";
    }
}

function hideVisitedSection() {
    if (window.screen.width >= 640) {
        visitedSection.style.left = "60%";
        visitedSection.style.transform = "translateX(100%)";
    } else {
        visitedSection.style.left = "0";
        visitedSection.style.transform = "translateX(100%)";
    }
}

function deleteVisitedList() {
    let visitedP = document.querySelectorAll(".visited__city-p");
    const visitedDiv = document.querySelector(".visited__city");
    for (const visitedItem of visitedP) {
        visitedDiv.removeChild(visitedItem);
    }
}

visitedSection.addEventListener("click", () => {
    deleteVisitedList();

    hideVisitedSection();
});

const getCityFromVisited = (e) => {
    getCity(String(e.target.textContent));
};

window.addEventListener("orientationchange", () => {
    deleteVisitedList();
    hideVisitedSection();
});

function getCity(town) {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${KEY}&units=metric&lang=pl`;

    fetch(API)
        .then((responce) => responce.json())
        .then((data) => {
            temperature.innerHTML = `${data.main.temp} &#176C`;
            wind.innerHTML = `${data.wind.speed} m/s`;
            humidity.innerHTML = `${data.main.humidity} %`;
            pressure.innerHTML = `${data.main.pressure} hPa`;
            clouds.innerHTML = `${data.clouds.all} %`;
            conditions.innerHTML = `${data.weather[0].description}`;
            city.innerHTML = `${data.name}`;
            //------------
            if (names.length <= 6) {
                names.unshift(`${data.name}`);
                const dataSet = new Set(...[names]);
                names = [...dataSet];
                localStorage.setItem("cityList", JSON.stringify(names));
            } else {
                names.pop();
                names.unshift(`${data.name}`);
                const dataSet = new Set(...[names]);
                names = [...dataSet];
                localStorage.setItem("cityList", JSON.stringify(names));
            }

            //------------
            // weatherData.add(`${data.name}`);
            // names = [...weatherData];
            // localStorage.setItem("cityList", JSON.stringify(names));
        })
        .catch((err) => {
            console.log("coś jest nie tak:/", err);
        });
}

function searchCity(e) {
    e.preventDefault();
    getCity(writeCity.value);
    writeCity.value = null;
}

btnSerchCity.addEventListener("click", searchCity);

btnVisited.addEventListener("click", getVisited);
