import { fetchData } from './modules/network';
import HSLData from './modules/hsl-data';

/**
 * Fetching HSL data
 */
fetchData(HSLData.apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/graphql' },
  body: HSLData.getQueryForNextRidesByStopId(2132226)
}).then(response => {
  // TODO: create separate render HSL data functions (in HSLData module maybe?)
  console.log('hsl data', response.data.stop.stoptimesWithoutPatterns[0]);
  const stop = response.data.stop;

  document.querySelector('#hsl-data').innerHTML = `<p>
    ${stop.name}<br> ${stop.stoptimesWithoutPatterns[0].trip.routeShortName} ${stop.stoptimesWithoutPatterns[0].headsign}
  </p>`;
});

/**
 * WEATHER
 */

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const weatherForecast = document.getElementById('weather-today');
const futureForecast = document.getElementById('forecast');

const daysFI = ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai'];
// const daysEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const apiKey = 'c042c0bcea83f22bde97ce234ae8c4f7';


//  Time and date
setInterval(() => {
  const time = new Date();
  const date = time.getDate();
  const month = time.getMonth()+1;
  const year = time.getFullYear();
  const day = time.getDay();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  timeEl.innerHTML = hours + ':' + minutes;
  dateEl.innerHTML = date + '.' + month + '.' + year;

}, 1000);


/**
 * Weather based of location
 */
const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((success) => {

    let {latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
    .then(res => res.json()).then(data => {

    console.log('weather-data', data);
    showWeatherData(data);
    });
  });
};
getWeatherData();

const showWeatherData = (data) => {
  let nextDayForecast = '';

  data.daily.forEach((day, id) => {

    if(id === 0) {
      weatherForecast.innerHTML = `
      <div class="weather-today" id="weather-today">
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-now">
        <div class="temp">${day.temp.day}</div>
        <div class="description"></div>
      </div>
      `;

    } else {
      nextDayForecast += `
      <div class="future-forecast-item">
        <div class="day"></div>
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
        <div class="temp">${day.temp.day}</div>
      </div>
      `;
    }
  });

  futureForecast.innerHTML = nextDayForecast;

};



// let otherDayForecast = '';
// data.current.forEach ((day, idx) => {
//   if(idx == 0) {
//     weatherNow.innerHTML = `
//     <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-now">
//             <div class="temp">${day.current.temp}&#176;C</div>
//             <div class="description">${day.weather[0].description}</div>
//     `;
//   } else {
//     otherDayForecast += `
//     <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
//               <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="sää-kuvaus" class="icon-future">
//               <div class="temp">${day.current.temp}&#176 C</div>
//     `;
//   };
// });
// }
// weatherFuture.innerHTML = otherDayForecast;
