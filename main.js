import { token } from './token.js';

const weather = document.querySelector('.weather--js');
const icon = document.querySelector('.icon--js');

let lat;
let lon;

function geo() {
    if (navigator.geolocation) {
        console.log('hello');
        navigator.geolocation.getCurrentPosition(function showPosition(position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            lat = position.coords.latitude
            lon = position.coords.longitude
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${token}`)
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    icon.innerHTML = `<img class="icon-weather" src="http://openweathermap.org/img/w/${resp.weather[0].icon}.png" alt="symbol pogody" />`;
                    weather.innerHTML = `<b>Miasto:</b> ${resp.name} <br/> <b>Temperatura:</b> ${resp.main.temp}°C <br/> <b>Wilgotność:</b> ${resp.main.humidity}% </br> <b>Ciśnienie:</b> ${resp.main.pressure}hPA <br/> <b>Wiatr:</b> ${resp.wind.speed}km/h <br/>`;
                })
                .catch(err => {
                    console.log(err);
                })
        })
    } else
        console.log('error');

}
geo();